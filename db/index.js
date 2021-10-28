// require and re-export all files in this db directory (users, activities...)
module.exports = {
    ...require('./client', './users', './routines', './activities', './routine_activities')
}