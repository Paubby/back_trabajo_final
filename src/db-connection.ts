import { Pool } from 'pg';

// const pool = new Pool({
//     user: 'postgres',
//     password: 'ppauu004',
//     host: 'localhost',
//     port: 5432,
//     database: 'blackjack'
// });

const connectionString = 
'postgresql://blackjack_final_proyecto_user:PeLRKoDlW6JsIDbYSMImizKcXfEnVOnm@dpg-cum6509opnds73d845t0-a.frankfurt-postgres.render.com/blackjack_final_proyecto'

const pool = new Pool({
    connectionString,
})

export function query(text: any): any {
    return pool.query(text);
};