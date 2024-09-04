import express from "express";
import indexRouter from "./routers/indexRouter.mjs";
import path from "node:path";
import "dotenv/config";
import usersRouter from "./routers/usersRouter.mjs";

const app = express();

const __dirname = import.meta.dirname;

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRouter);
app.use("/", indexRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})
