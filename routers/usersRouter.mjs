import { Router } from "express";
import * as usersController from "../controllers/usersController.mjs";

const usersRouter = Router();

usersRouter.get("/", usersController.usersListGet);
usersRouter.get("/create", usersController.usersCreateGet);
usersRouter.post("/create", usersController.usersCreatePost);

export default usersRouter;