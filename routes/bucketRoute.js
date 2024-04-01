import express from "express";
import { createbucket,
     getbucket,
     listbucket,
     deleteBucket,
     updateBucket
     } from "../controller/bucketController.js";
const bucketRoute = express.Router();

bucketRoute.route("/createbucket").post(createbucket);
bucketRoute.route("/getbucket/:id").get(getbucket);
bucketRoute.route("/listbucket").get(listbucket);
bucketRoute.route("/deleteBucket/:id").delete(deleteBucket);
bucketRoute.route("/updateBucket/:id").put(updateBucket);

export default bucketRoute;