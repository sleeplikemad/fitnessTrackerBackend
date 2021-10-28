const client = require("./client");

async function addActivityToRoutine ({ routineId, activityId, count, duration }){
    try{
        const {rows: [routineActivity]} = await client.query(`
        INSERT INTO routine_activities ("routineId", "activityId", count, duration)
        VALUES ($1, $2, $3, $4 )
        ON CONFLICT ("activityId", "routineId") DO NOTHING
        RETURNING *
        
        `, [routineId, activityId, count, duration]);

        return routineActivity;

    }catch (error){
        throw error;
    }
}

module.exports = {
    addActivityToRoutine,

}