import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.MONGO_DB_URL).then((response) => {
    console.log(`DB conection ok 🚀`);
  });
} catch (err) {
  console.log(err);
}
