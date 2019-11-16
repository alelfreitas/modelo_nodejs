const mysql = require('mysql')

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || '3306';
const user = process.env.DB_USER || 'guest';
const password = process.env.DB_PASS || 'guest';
const database = process.env.DB_DATABASE || 'test';
const connectionLimit = process.env.DB_POOL_LIMIT || 25;

const pool = mysql.createPool({
    host,
    port,
    user,
    password,
    database,
    connectionLimit
});

process.on('SIGINT', () =>
    pool.end(err => {
        if(err) return logger.error(err);
        console.log('pool => fechado');
        process.exit(0);
    })
);

module.exports = pool;