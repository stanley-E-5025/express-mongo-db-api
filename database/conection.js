import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.MONGO_DB_URL);
  console.log("conected");
} catch (err) {
  console.log(err);
}
