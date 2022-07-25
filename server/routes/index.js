const express = require("express");
const authRoute = require("./auth.route");
const compilerRoute = require("./compiler.route");
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
];

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
