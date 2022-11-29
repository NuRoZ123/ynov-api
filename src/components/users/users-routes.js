import Router from "@koa/router";
import * as UsersCtrl from "#components/users/users-controller.js";

const UsersRouter = new Router();

UsersRouter.post("/register", UsersCtrl.register);
UsersRouter.post("/login", UsersCtrl.login);

export default UsersRouter;