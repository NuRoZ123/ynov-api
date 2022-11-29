import Router from "@koa/router";
import * as listeCtrl from "#components/list/listes-controller.js"

const listesRouter = new Router();

listesRouter.get("/", listeCtrl.getAll);

listesRouter.get("/:id", listeCtrl.getOne);

listesRouter.post("/", listeCtrl.create);

listesRouter.put("/:id", listeCtrl.edit);

listesRouter.delete("/:id", listeCtrl.remove);

export default listesRouter;