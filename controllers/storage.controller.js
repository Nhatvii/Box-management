const Storage = require("../models/storage.model");

exports.GetStorage = async (req, res) => {
  try {
    const storage = await Storage.find();
    res.json(storage);
  } catch (error) {
    res.send("ERR" + error);
  }
};

exports.GetStorageById = async (req, res) => {
  try {
    const storage = await Storage.findOne({ id: req.params.id });
    if (storage != null) {
      res.json(storage);
    }
  } catch (error) {
    res.send("ERR" + error);
  }
};

exports.CreateStorage = async (req, res) => {
  const tmpStorage = await Storage.findOne({ id: req.body.id });
  if (tmpStorage != null) {
    res.status(400).send("Duplicate ID");
  } else {
    const storage = new Storage({
      id: req.body.id,
      address: req.body.address,
      storageName: req.body.storageName,
      startCount: req.body.startCount,
      status: req.body.status,
      price: req.body.price,
      description: req.body.description,
      storageSize: req.body.storageSize,
      ownerName: req.body.ownerName,
      expriredDate: req.body.expriredDate,
      month: req.body.month,
    });
    try {
      await storage.save();
      res.status(200).send("Create success");
    } catch (error) {
      res.send("ERR" + error);
    }
  }
};

exports.UpdateStorage = async (req, res) => {
  try {
    const storage = await Storage.findOne({ id: req.params.id });
    const {
      address,
      storageName,
      startCount,
      status,
      price,
      description,
      storageSize,
      ownerName,
      expriredDate,
      month,
    } = req.body;
    if (storage != null) {
      if (address) storage.address = address;
      if (storageName) storage.storageName = storageName;
      if (startCount) storage.startCount = startCount;
      if (status) storage.status = status;
      if (price) storage.price = price;
      if (description) storage.description = description;
      if (storageSize) storage.storageSize = storageSize;
      if (ownerName) storage.ownerName = ownerName;
      if (expriredDate) storage.expriredDate = expriredDate;
      if (month) storage.month = month;
      await storage.save();
      res.status(200).send("Update success");
    } else {
      res.status(400);
    }
  } catch (error) {
    res.send("ERR" + error);
  }
};

exports.DeleteStorage = async (req, res) => {
  try {
    Storage.deleteOne({ id: req.params.id}, (err, result) => {
        if(err) throw err
        if(result) res.status(200).send("Delete success");
    });
    
  } catch (error) {
    res.send("ERR" + error);
  }
};
