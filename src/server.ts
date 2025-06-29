import config from "./app/utils/config";
import app from "./app";
import mongoose from "mongoose";

const bootstrap = async () => {
  try {
    const { connection } = await mongoose.connect(config.dbUrl);
    console.log("Connected to MongoDB:", connection.name);
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.log("Error starting server:", error);
  }
};

bootstrap();
