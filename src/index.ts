import mongoose from "mongoose";
import app from "./app";
import {CacheManager} from './caching/cache-manager'



const start = async () => {
  await CacheManager.init();
  await mongoose.connect("mongodb://localhost:27017");
  app.listen(6000, () => { console.log("app start") })
}

start();