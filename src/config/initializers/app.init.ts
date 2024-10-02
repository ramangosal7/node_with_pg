import express, { Application, NextFunction, Request, Response } from 'express';
// import path from "path";
import routes from '../../app/routes';

export default async (): Promise<Application> => {
  const app: Application = express();
  app.use(express.json({ limit: "5mb" }));
  app.use(express.urlencoded({ extended: true }));
  // app.use(express.static(__dirname + 'public/'));
  // Set the 'views' directory for your EJS files
  // app.set("view engine", "ejs");
  // app.set("views", path.join(__dirname, "..", "..", "app", "views"));

  app.use("/", [], routes);
  app.use("**/**", (req: Request, res: Response, next: NextFunction) => {
    // res.json({
    //   error: {
    //     'name': 'Error',
    //     'status': 404,
    //     'message': 'Invalid Request',
    //     'statusCode': 404,
    //     'stack': 'app.host'
    //   },
    //   message: 'Testing!'
    // });
    res.status(404);
    res.json({ status: 404, title: "Not Found", msg: "Route not found" });
    next();
  });
  return app;
};