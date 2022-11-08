import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";

const app = new Koa();
const router = new Router();

let products = [
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
   ctx.body = products;
});

router.get("/api/todos/:id", (ctx, next) => {
    ctx.body = products.find(p => parseInt(ctx.params.id) === p.id);
});

router.post("/api/todos/:id/:name", (ctx, next) => {
    products.push(
        {
            id: parseInt(ctx.params.id),
            name: ctx.params.name
        });

    ctx.response.status = 201;
})

router.put("/api/todos/:id/:name", (ctx, next) => {
    let product = products.find(p => parseInt(ctx.params.id) === p.id);
    product.name = ctx.params.name;

    ctx.response.status = 200;
});

router.delete("/api/todos/:id", (ctx, next) => {
    let productIndex = products.findIndex(p => parseInt(ctx.params.id) === p.id);
    products.splice(productIndex, 1);

    ctx.response.status = 200;
});

app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(process.env.PORT, () => console.log(`server running on http://localhost:${process.env.PORT}`))