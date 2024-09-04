import { Router } from "express";
import * as usersController from "../controllers/usersController.mjs";

const usersRouter = Router();

usersRouter.get("/", usersController.usersListGet);
usersRouter.get("/create", usersController.usersCreateGet);
usersRouter.post("/create", usersController.usersCreatePost);

usersRouter.get("/:id/update", usersController.usersUpdateGet);
usersRouter.post("/:id/update", usersController.usersUpdatePost);

usersRouter.post("/:id/delete", usersController.usersDeletePost);

usersRouter.get("/search", usersController.usersSearchGet);

export default usersRouter;