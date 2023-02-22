const mongoose = require("mongoose");
const validatedMongoDbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error("MongoDb id is not valid");
};
module.exports = validatedMongoDbId;
