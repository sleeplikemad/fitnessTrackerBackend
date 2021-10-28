async function getRoutineActivityById(id) {
    try {
        const { rows : rActivities } = await client.query(`
          SELECT * 
          FROM routine_activities 
          WHERE id=$1;`, [id])
    
        return rActivities
    } catch(error) {
        next(error)
    }
}

async function addActivityToRoutine({ routineId, activityId, count, duration }) {
    try {
        const {rows : [rActivity] } = await client.query(`
          INSERT INTO routine_activities("routineId", "activityId", count, duration) 
          VALUES ($1, $2, $3, $4)
          RETURNING *;`, [routineId, activityId, count, duration])
    
        return rActivity
    } catch(error) {
        next(error)
    }
}

async function updateRoutineActivity({id, count, duration}) {
    try {
        const rActivity = await client.query(`
          UPDATE routine_activities
          SET count=$2, duration=$3 
          WHERE "routineId"=$1 *;`, [id, count, duration])
    
        return rActivity
    } catch(error) {
        next(error)
    }
}

async function destroyRoutineActivity({id}) {
    try {
        await client.query(`
          DELETE FROM routine_activities
          WHERE id=$1;`, [id]) 
    } catch(error) {
        next(error)
    }
}

async function getRoutineActivityByRoutine({id}) {
    try {
        const { rows : rActivities } = await client.query(`
          SELECT * 
          FROM routine_activities 
          WHERE 'routineId'=$1;`, [id])
    
        return rActivities
    } catch(error) {
        next(error)
    }
}

module.exports = {
    getRoutineActivityById,
    addActivityToRoutine,
    updateRoutineActivity,
    destroyRoutineActivity,
    getRoutineActivityByRoutine
}