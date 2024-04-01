import express from "express";
import { createObject, 
    getObject,
    getallObject,
    listobject,
    deleteobject,
    updateObject
 } from "../controller/objectController.js";

const objectRoute = express.Router();

objectRoute.route("/createObject").put(createObject);
objectRoute.route("/getObject/:id").get(getObject);
objectRoute.route("/getallObject").get(getallObject);
objectRoute.route("/listobject/:bucketId").get(listobject);
objectRoute.route("/deleteobject/:id").delete(deleteobject);
objectRoute.route("/updateObject/:id").put(updateObject);


export default objectRoute;