import "reflect-metadata";
import { createConnection , Connection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import router from "./routes/index";


createConnection().then(async connection => {
    // create express app
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    app.use('/api', router)

    app.listen(5000, () => {
        console.log("Express server has started on port 5000. Open http://localhost:5000/ to see results");
    });
}).catch(error => console.log(error));






