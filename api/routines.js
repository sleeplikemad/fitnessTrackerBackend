const express = require("express");
const userRouter = express.Router();

const {
    getRoutineById,
  createRoutine,
  getRoutinesWithoutActivities,
  getAllRoutines,
  addActivityToRoutine,
  getRoutineActivityByRoutine,
  destroyRoutineActivity,
  updateRoutineActivity,
  getRoutineActivityById,
  getPublicRoutinesByUser,
} = require("../db");
const requireUser = require("./utilities");

// POST, POST /routines/:routineId/activities, PATCH /routine_activities/:routineActivityIdm, DELETE /routine_activities/:routineActivityId 
//(**) check creatorId === req.user.id userId


