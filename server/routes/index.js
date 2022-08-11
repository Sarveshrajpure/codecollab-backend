const express = require("express");
const authRoute = require("./auth.route");
const compilerRoute = require("./compiler.route");
const workspaceRoute = require("./workspace.route");
const documentRoute = require("./document.route");
const router = express.Router();

const routesIndex = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/compiler",
    route: compilerRoute,
  },
  {
    path: "/workspace",
    route: workspaceRoute,
  },
  {
    path: "/document",
    route: documentRoute,
  },
];

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
