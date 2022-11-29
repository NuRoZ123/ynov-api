import Router from "@koa/router";
import * as tasksCtrl from "#components/tasks/tasks-controller.js"
import {isAuthentificatedWithUser} from "../../middlewares/jwt-handler.js";

const tasksRouter = new Router();

tasksRouter.get("/", tasksCtrl.getAll);

tasksRouter.get("/protected", isAuthentificatedWithUser,(ctx) => {
    ctx.ok({message:"this route is protected", user: ctx.state.user})
});

tasksRouter.get("/:id", tasksCtrl.getOne);

tasksRouter.get('/lists/:listId', tasksCtrl.getAllByListId)

tasksRouter.post("/", tasksCtrl.create);

tasksRouter.put("/:id", tasksCtrl.edit);

tasksRouter.delete("/:id", tasksCtrl.remove);

export default tasksRouter;