import "dotenv/config";

const config = {
  port: process.env.PORT || 3000,
  dbUrl: process.env.MONGO_URL || "",
  jwtSecret: process.env.JWT_SECRET || "",
};

export default config;
