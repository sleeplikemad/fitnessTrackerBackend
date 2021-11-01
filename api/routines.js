const express = require("express");
const routinesRouter = express.Router();

const {
  createRoutine,
  getRoutineById,
  updateRoutine,
  destroyRoutine,
  getAllPublicRoutines,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
} = require("../db");
const requireUser = require("./utilities");

// POST, POST /routines/:routineId/activities, PATCH /routine_activities/:routineActivityIdm, DELETE /routine_activities/:routineActivityId 
//(**) check creatorId === req.user.id userId

routinesRouter.get("/", async (req, res, next) => {
  try {
    const allPublicRoutines = await getAllPublicRoutines();

    res.send(allPublicRoutines);
  } catch (error) {
    next(error);
  }
});

routinesRouter.post("/", requireUser, async (req, res, next) => {
  const { isPublic, name, goal } = req.body;
  const { id: creatorId } = req.user;

  try {
    const newRoutine = await createRoutine({ creatorId, isPublic, name, goal });

    res.send(newRoutine);
  } catch (error) {
    next(error);
  }
});



module.exports = routinesRouter