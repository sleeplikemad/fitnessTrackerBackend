async function getActivityById(id) {
    try {
        const { rows : activities } = await client.query(`
          SELECT * 
          FROM activities 
          WHERE id=$1;`, [id])
    
        return activities
    } catch(error) {
        next(error)
    }
}

async function getAllActivities() {
    try {
        const { rows : activities } = await client.query(`
          SELECT * 
          FROM activities;`)
        return activities
    } catch(error) {
        next(error)
    }
}

async function createActivity({name, description}) {
    try {
        const activity = await client.query(`
          INSERT INTO activities(name, description)
          VALUES {$1, $2} 
          RETURNING *;`, [name, description])
    
        return activity
    } catch(error) {
        next(error)
    }
}

async function updateActivity({id, name, description}) {
    try {
        const activity = await client.query(`
          UPDATE activities
          SET name=$2, description=$3
          WHERE id=$1;`, [id,name, description])
    
        return activity
    } catch(error) {
        next(error)
    }
}

module.exports = {
    getActivityById,
    getAllActivities,
    createActivity,
    updateActivity
}