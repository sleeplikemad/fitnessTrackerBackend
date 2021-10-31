// build and export your unconnected client here
const { Client } = require('pg');
// Create a constant, CONNECTION_STRING, from either process.env.DATABASE_URL or postgres://localhost:5432/phenomena-dev
const CONNECTION_STRING = 'postgres://localhost:5432/fitness-dev'

const client = new Client({
  connectionString: CONNECTION_STRING,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = client;
