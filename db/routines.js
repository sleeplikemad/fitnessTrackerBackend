const { attachActivitiesToRoutines } = require("./activities");
const client = require("./client");

async function getRoutineById(id) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
        SELECT * FROM routines
        WHERE id = $1
        `,
      [id]
    );

    return routine;
  } catch (error) {
    throw error;
  }
}

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
    INSERT INTO routines("creatorId", "isPublic", name, goal)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`,
      [creatorId, isPublic, name, goal]
    );

    return routine;
  } catch (error) {
    throw error;
  }
}

async function getRoutinesWithoutActivities() {
  try {
    const { rows: routines } = await client.query(`
      SELECT * FROM routines
      `);
    return routines;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutines(){
    try{
      const {rows: allRoutines} = await client.query(`
      SELECT routines.*, users.username AS "creatorName" 
      FROM routines
      JOIN users ON routines."creatorId" = user.id
      `, )
  
      return attachActivitiesToRoutines(allRoutines);
  
    }catch(error){
      throw error;
    }
  }

module.exports = {
  getRoutineById,
  createRoutine,
  getRoutinesWithoutActivities,
  getAllRoutines,
};
