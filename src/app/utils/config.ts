import "dotenv/config";
import path from "path";

const config = {
  port: process.env.PORT || 3000,
  dbUrl: process.env.MONGO_URL || "",
  jwtSecret: process.env.JWT_SECRET || "",
  publicIndexHtmlPath: path.join(__dirname, "../../../public/index.html"),
  publicFaviconPath: path.join(__dirname, "../../../public/favicon.svg"),
};

export default config;
