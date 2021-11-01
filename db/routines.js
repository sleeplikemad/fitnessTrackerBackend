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

async function getAllRoutines() {
  console.log("start getallroutines");
  try {
    const { rows: allRoutines } = await client.query(`
    SELECT routines.*, users.username AS "creatorName" 
    FROM routines
    INNER JOIN users ON routines."creatorId" = users.id
    `);

    const routinesAndActivities = await attachActivitiesToRoutines(allRoutines);
    return routinesAndActivities;
  } catch (error) {
    throw error;
  }
}

async function destroyRoutine(id) {
  try {
    const {
      rows: [rActivity],
    } = await client.query(
      `
          DELETE FROM routines
          WHERE id=$1
          RETURNING *;`,
      [id]
    );

    await client.query(
      `
          DELETE FROM routine_activities
          WHERE "routineId"=$1;`,
      [id]
    );

    return rActivity;
  } catch (error) {
    throw error;
  }
}

async function updateRoutine({id, isPublic, name, goal}) {
  try {
    let fields = []
    let vals = []
    if(id){
      fields.push('id')
      vals.push(id)
    }
    if(isPublic != null) {
      fields.push('"isPublic"')
      vals.push(isPublic)
    }
    if(name != null){
      fields.push('name')
      vals.push(name)
    }
    if(goal != null){
      fields.push('goal')
      vals.push(goal)
    }

    
    const binds = fields.map((e, index) => `${e}=$${index + 1}`).join(', ');
    console.log("binds: ", binds)
    const {
      rows: [routine],
    } = await client.query(`
    UPDATE routines
          SET ${binds} 
          WHERE id=$1 
          RETURNING *;
    `, vals);
    return routine;
  } catch (error) {
    throw error;
  }
}

async function getAllPublicRoutines() {
  console.log("start getallroutines");
  try {
    const { rows: allRoutines } = await client.query(`
    SELECT routines.*, users.username AS "creatorName" 
    FROM routines
    INNER JOIN users ON routines."creatorId" = users.id
    WHERE routines."isPublic"=true;
    `);

    const routinesAndActivities = await attachActivitiesToRoutines(allRoutines);
    return routinesAndActivities;
  } catch (error) {
    throw error;
  }
}

  async function getPublicRoutinesByUser({ username }) {
    try {
      const { rows: routines } = await client.query(
        `
      SELECT routines.*, users.username AS "creatorName"
      FROM routines
      JOIN users ON routines."creatorId" = users.id
      WHERE users.username = $1
      AND "isPublic" = true;
      `,
        [username]
      );
  
      return attachActivitiesToRoutines(routines);
    } catch (error) {
      console.error(error);
    }
  }

  
module.exports = {
  getRoutineById,
  createRoutine,
  getRoutinesWithoutActivities,
  getAllRoutines,
  destroyRoutine,
  updateRoutine,
  getAllPublicRoutines,
  // getAllRoutinesByUser,
  // getPublicRoutinesByUser,
  // getPublicRoutinesByActivity

};
