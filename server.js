const express = require("express");
const jsonServer = require("json-server");
const auth = require("json-server-auth");
const bodyParser = require("body-parser");
const server = express();
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

const router = jsonServer.router("data/db.json");
const middlewares = jsonServer.defaults();

server.db = router.db;

server.use(auth);
server.use(middlewares);
router.use(bodyParser.json());
server.use(jsonServer.bodyParser);
server.use(router);

server.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
