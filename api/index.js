// create an api router
const apiRouter = express.Router()
// attach other routers from files in this api directory (users, activities...)
usersRouter = require('./users')
activitiesRouter = require('./activities')
routinesRouter = require('./routines')
RARouter = require('./routine_activities')

// export the api router
module.exports = apiRouter;
