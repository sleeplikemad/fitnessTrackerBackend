const express = require("express");
const routineActivitiesRouter = express.Router();
const {
    getRoutineActivityById,
    destroyRoutineActivity,
    updateRoutineActivity,
    getRoutineById

} = require('../db');

const requireUser = require("./utilities");




module.exports = routineActivitiesRouter;