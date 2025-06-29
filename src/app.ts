import express from "express";
import path from "path";
import { usersRouter, loginRouter, productsRouter } from "./app/controllers";
import { errorHandler, logger, unknownEndpoint } from "./app/middlewares";

const app: express.Application = express();
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/products", productsRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
