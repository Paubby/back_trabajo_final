import express from "express";
import cors from 'cors';
const app = express();
app.use(cors());

import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();

import * as db from './db-connection';

app.get('/jugadores/:email', jsonParser, async (req, res) => {

    console.log(`Petición recibida al endpoint GET /jugadores/:${req.params.email}. 
        Body: ${JSON.stringify(req.body)}`);

    try {
        
        let query = `SELECT * FROM jugadores where email = '${req.params.email}'`; 
        let db_response = await db.query(query);

        console.log(db_response.rowCount);
        console.log(db_response);

        if(db_response.rows.length > 0){
            console.log(`User encontrado: ${db_response.rows}`)
            res.json(db_response.rows);
        } else {
            console.log("El registro NO ha sido encontrado")
            res.json("El registro NO ha sido encontrado")
        }
    
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error, no se pudo cojer el email correctamente');
    }
});


app.post('/crear', jsonParser, async (req, res) => {

    console.log(`Petición recibida al endpoint POST /crear. 
        Body: ${JSON.stringify(req.body.email)}`);

    try {
        
        let query = `INSERT INTO jugadores (email, nombre, dinero)
        VALUES ('${req.body.email}', '${req.body.name}', 1000);`; 
        let db_response = await db.query(query);

        console.log(db_response.rowCount);
        console.log(db_response);

        if(db_response.rowCount == 1){
            res.json(`El registro ha sido creado correctamente.`);
        } else{
            res.json(`El registro NO ha sido creado`);
        }
    
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error, no se pudo cojer el email correctamente');
    }
});


app.post('/dinero', jsonParser, async (req, res) => {
    console.log(`Petición recibida al endpoint POST /dinero/:${req.body.email}.`);
    try {
        // Obtener el dinero actual del jugador
        let query_suma = `SELECT dinero FROM jugadores WHERE email = '${req.body.email}'`;
        let db_response_suma = await db.query(query_suma);

        if (db_response_suma.rows.length == 0) {
            console.log("El registro NO ha sido encontrado");
            return res.status(404).json("El registro NO ha sido encontrado");
        }

        let dinero_actual = parseFloat(db_response_suma.rows[0].dinero);
        let dinero_nuevo = parseFloat(req.body.money);

        // Sumar del dinero
        let dinero_total = dinero_actual + dinero_nuevo;

        // UPDATE al dinero total
        let query_update = `UPDATE jugadores SET dinero = ${dinero_total} WHERE email = '${req.body.email}'`;
        let db_response_update = await db.query(query_update);

        console.log(req.body.money);
        console.log(db_response_update.rowCount);
        console.log(db_response_suma);

        if (db_response_update.rowCount > 0) {
            console.log(`El usuario ${req.body.email} tiene ahora ${dinero_total}`);
            res.json({ dinero_total });
        } else {
            console.log("El registro NO ha sido actualizado");
            res.status(500).json("El registro NO ha sido actualizado");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error, no se pudo procesar la solicitud');
    }
});


// Esto va ha ser un order by, con la parte DINERO para el RANKING

app.get('/ordenar', async (req, res) => {
    console.log(`Petición recibida al endpoint GET /ordenar.`);

    try {
        let query = `SELECT * FROM jugadores ORDER BY dinero DESC LIMIT 3;`; 
        let db_response = await db.query(query);

        console.log(`Usuarios encontrados: ${db_response.rows.length}`);
        console.log(db_response.rows);

        if (db_response.rows.length > 0) {
            res.json(db_response.rows);
            console.log(db_response)
        } else {
            console.log("No se encontraron registros.");
            res.json("No se encontraron registros.");
        }
    
    } catch (err) {
        console.error(err);
        res.status(500).send('Error interno del servidor, no se pudo obtener los datos.');
    }
});

app.post('/perder', jsonParser, async (req, res) => {
    console.log(`Petición recibida al endpoint POST /dinero/:${req.body.email}.`);
    try {
        // Obtener el dinero actual del jugador
        let query_suma = `SELECT dinero FROM jugadores WHERE email = '${req.body.email}'`;
        let db_response_suma = await db.query(query_suma);

        if (db_response_suma.rows.length == 0) {
            console.log("El registro NO ha sido encontrado");
            return res.status(404).json("El registro NO ha sido encontrado");
        }

        let dinero_actual = parseFloat(db_response_suma.rows[0].dinero);
        let dinero_nuevo = parseFloat(req.body.money);

        // Sumar del dinero
        let dinero_total = dinero_actual - dinero_nuevo;

        // UPDATE al dinero total
        let query_update = `UPDATE jugadores SET dinero = ${dinero_total} WHERE email = '${req.body.email}'`;
        let db_response_update = await db.query(query_update);

        console.log(req.body.money);
        console.log(db_response_update.rowCount);
        console.log(db_response_suma);

        if (db_response_update.rowCount > 0) {
            console.log(`El usuario ${req.body.email} tiene ahora ${dinero_total}`);
            res.json({ dinero_total });
        } else {
            console.log("El registro NO ha sido actualizado");
            res.status(500).json("El registro NO ha sido actualizado");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error, no se pudo procesar la solicitud');
    }
});

    
// app.post('/perder', jsonParser, async (req, res) => {

//     console.log(`Petición recibida al endpoint POST /perder. 
//         Body: ${JSON.stringify(req.body.email)}`);

//         try {
//             // Obtener el dinero actual del jugador
//             let query = `SELECT dinero FROM jugadores WHERE email = '${req.body.email}'`;
//             let db_response = await db.query(query);
    
//             if (db_response.rows.length == 0) {
//                 console.log("El registro NO ha sido encontrado");
//                 return res.status(404).json("El registro NO ha sido encontrado");
//             }

//             let dinero_actual = parseFloat(db_response.rows[0].dinero);

  
//           let query_perder = `UPDATE jugadores SET dinero = ${dinero_actual} WHERE email = '${req.body.email}';`; 
//           let db_response_perder = await db.query(query_perder);
  
//           console.log(`Usuarios encontrados: ${db_response_perder.rows.length}`);
//           console.log(db_response_perder.rows);
//           console.log(dinero_actual)
  
//           if (db_response_perder.rows.length > 0) {
//               res.json(db_response_perder.rows);
//               console.log(db_response_perder)
//           } else {
//               console.log("No se encontraron registros.");
//               res.json("No se encontraron registros.");
//           }
      
//       } catch (err) {
//           console.error(err);
//           res.status(500).send('Error interno del servidor, no se pudo obtener los datos.');
//       }
// });

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}
    - GET: /jugador/:email
    - POST: /crear
    - POST: /dinero
    - GET: /ordenar
    - POST: /perder
    `));

    // Preguntar si hay que restar en el backend :IMPORTANTISSIM