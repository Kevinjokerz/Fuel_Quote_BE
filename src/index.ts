import mongoose from "mongoose";
import app from "./app";



const start = async () => {
  await mongoose.connect("mongodb://localhost:27017");
  app.listen(3000, () => { console.log("app start") })
}

start();