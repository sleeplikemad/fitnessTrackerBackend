const express = require("express");
const activitiesRouter = express.Router();

//copied routines, haven't done anything to it yet: sunday eod
const {
    getAllActivities,
    createActivity,
    updateActivity,
    getPublicRoutinesByActivity,
} = require("../db");
const requireUser = require("./utilities");

// POST, POST /routines/:routineId/activities, PATCH /routine_activities/:routineActivityIdm, DELETE /routine_activities/:routineActivityId 
//(**) check creatorId === req.user.id userId

activitiesRouter.get("/", async (req, res, next) => {
  try {
    const allActivities = await getAllActivities();

    res.send(allActivities);
  } catch (error) {
    next(error);
  }
});

activitiesRouter.post("/", requireUser, async (req, res, next) => {
  const { name, description } = req.body;

  try {
    const newActivity = await createActivity({ name, description });
    res.send(newActivity);
  } catch (error) {
    next(error);
  }
});


//NOT DONE
activitiesRouter.patch("/:activityId", requireUser, async (req, res, next) => {
    const { name, description } = req.body;
    const id  = req.params.activityId

    try {
      const newActivity = await updateActivity({ id , name, description });
      res.send(newActivity);
    } catch (error) {
      next(error);
    }
})

activitiesRouter.get("/:activityId/routines", async (req, res, next) => {
    const id  = req.params.activityId
    
    try {
      const newActivity = await getPublicRoutinesByActivity({ id });
      res.send(newActivity);
    } catch (error) {
      next(error);
    }
})


module.exports = activitiesRouter