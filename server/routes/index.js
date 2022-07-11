const express = require("express");
const authRoute = require("./auth.route");
const router = express.Router();

const routesIndex = [
  {
    path: "/auth",
    route: authRoute,
  },
  //   {
  //     path: "/user",
  //     route: userRoute,
  //   },

];

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
