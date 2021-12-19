const express = require('express');
// const { route } = require('./routes/users.routes');
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');
var cors = require('cors');

const auth = require('./middlewares/auth');
const errors = require('./middlewares/errors');

const unless = require('express-unless');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const router = require('./routes/users.routes');

const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.1",
        info: {
            title: 'This is my API page',
            version: '1.0.0'
        },
        servers: [
            {
                url: "http://localhost:4000",
            },
        ],
        // components: {
        //     securitySchemas: {
        //         bearerAuth: {
        //             type: "http",
        //             schema: "bearer",
        //             bearerFormat: "JWT",
        //         },
        //     },
        // },
        // security: [
        //     {
        //         bearerAuth: {
        //             type: "http",
        //             scheme: "bearer",
        //         },
        //     },
        // ],
        components: {
            securitySchemes: {
              bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
              }
            }
          },
          security: [{
            bearerAuth: []
          }]
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use('/api', router);

mongoose.Promise = global.Promise;
mongoose.connect( dbConfig.db, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
}).then (
    () => {
        console.log("Database connected");
    },
    (error) => {
        console.log("Database can't be connected: " + error);
    }
);

auth.authenticateToken.unless = unless;

app.use(
    auth.authenticateToken.unless({
        path: [
            { url: "/users/login", method: ["POST"] },
            { url: "/users/register", method: ["POST"] },
        ],
    })
);
// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });
app.use(express.json());
app.use(cors());

app.use("/users", require("./routes/users.routes"));

// app.use(errors.errorHandler);

app.listen(process.env.port || 4000, () => {
    console.log("Server Started");
})