const express = require("express");
// const { route } = require('./routes/users.routes');
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config");
var cors = require("cors");

const auth = require("./middlewares/auth");
const errors = require("./middlewares/errors");

const unless = require("express-unless");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const router = require("./routes/users.routes");

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "This is my API page",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use("/api", router);

mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
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

app.use(express.json());
app.use(cors());

app.use("/users", require("./routes/users.routes"));
app.use("/storage", require("./routes/storage.routes"));
// app.use(errors.errorHandler);

app.listen(process.env.port || 4000, () => {
  console.log("Server Started");
});

const storage = [
  {
    id: "10",
    address: "",
    name: "",
    startCount: 0,
    status: true,
    price: 1000,
    description: "adadadad",
    storageSize: "50m x 30m x 10m",
    ownerName: "mnk",
    expriredDate: "12/10/2021",
    month: 1,
    // sheft: [
    //   {
    //     box: { 
    //         sheftID: "112",
    //         status: true,
    //         boxType: true,
    //         tang:"",
    //         vitritang:"",
    //         order: {
    //             orderId: "122",
    //             checkoutTime: '122',
    //             boxType: "",
                
    //         }
    //     },
    //   },
    // ],
  },
];
