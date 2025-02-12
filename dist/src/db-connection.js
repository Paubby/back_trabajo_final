"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
var pg_1 = require("pg");
// const pool = new Pool({
//     user: 'postgres',
//     password: 'ppauu004',
//     host: 'localhost',
//     port: 5432,
//     database: 'blackjack'
// });
var connectionString = 'postgresql://blackjack_final_proyecto_user:PeLRKoDlW6JsIDbYSMImizKcXfEnVOnm@dpg-cum6509opnds73d845t0-a.frankfurt-postgres.render.com/blackjack_final_proyecto';
var pool = new pg_1.Pool({
    connectionString: connectionString,
});
function query(text) {
    return pool.query(text);
}
exports.query = query;
;
