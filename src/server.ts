import config from "./config/env";
import server from "./config/initializers/app.init";
import { Application } from 'express';

server().then((app: Application) => {
  app.listen(config.PORT, () => {
    console.log(`Express is listening at http://localhost:${config.PORT}`);
  });
  app.on("error", () => {
    console.log("error while starting server");
  })
})