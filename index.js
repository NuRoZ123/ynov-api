import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";

const app = new Koa();
const router = new Router();

let todos = [
    {
        id: 1,
        name: "Iphone"
    },
    {
        id: 2,
        name: "Oppo"
    },
    {
        id: 3,
        name: "Samsung"
    }
]

router.get("/api/todos", (ctx, next) => {
   ctx.body = todos;
});

router.get("/api/todos/:id", (ctx, next) => {
    ctx.body = todos.find(p => parseInt(ctx.params.id) === p.id);
});

router.post("/api/todos", (ctx, next) => {
    todos.push(
        {
            id: todos.length+1,
            name: ctx.request.body.name
        });

    ctx.response.status = 201;
});

router.put("/api/todos/:id", (ctx, next) => {
    let product = todos.find(p => parseInt(ctx.params.id) === p.id);
    product.name = ctx.request.body.name;

    ctx.response.status = 200;
});

router.delete("/api/todos/:id", (ctx, next) => {
    let productIndex = todos.findIndex(p => parseInt(ctx.params.id) === p.id);
    todos.splice(productIndex, 1);

    ctx.response.status = 200;
});

app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(process.env.PORT, () => console.log(`server running on http://localhost:${process.env.PORT}`))