require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("BD connected"))
  .catch((error) => console.error(error));
