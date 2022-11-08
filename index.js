import http from 'http';

const server = http.createServer(((req, res) => {

    if(req.url === "/api/products" && req.method === "GET") {
        res.writeHead(200, {"Content-type": "application/json"});
        res.end(JSON.stringify({
                id: 1,
                name: "OPPO Reno 6 5G",
                color: "Black"
        }));
    } else {
        res.end(JSON.stringify({
                    message: "Route not found error 404."
        }));
    }
}));

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`server run: http://localhost:${PORT}`))