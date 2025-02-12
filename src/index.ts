import express from "express";
import cors from 'cors';
const app = express();
app.use(cors());

import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();

import * as db from './db-connection';

app.get('/jugadores/:email', jsonParser, async (req, res) => {

    console.log(`Petición recibida al endpoint GET /user. 
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

    console.log(`Petición recibida al endpoint POST /user. 
        Body: ${JSON.stringify(req.body)}`);

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
        let query_suma = `SELECT (dinero) FROM jugadores where email = ${req.body.email}`
        query_suma = req.body.money + query_suma
        let query_update = `UPDATE jugadores SET dinero = ${req.body.money} WHERE email = '${req.body.email}'`; 

        let db_response_suma = await db.query(query_suma);
        let db_response_update = await db.query(query_update);
        // let db_response = await db.query(query);


        console.log(req.body.money)
        console.log(db_response_update.rowCount);
        console.log(db_response_suma);

        if(db_response_update.rows.length > 0){
            console.log(`el usuario ${req.params.email}, tiene ahora ${req.params.money}`)
            res.json(query_suma);
        } else {
            console.log("El registro NO ha sido encontrado")
            res.json("El registro NO ha sido encontrado")
        }
    
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error, no se pudo cojer el email correctamente');
    }
});


// app.post('/dinero', jsonParser, async (req, res) => {
//     console.log(`Petición recibida al endpoint POST /dinero para el email ${req.body.email}.`);

//     try {
//         // Consulta para obtener el dinero actual
//         let querySum = 'SELECT dinero FROM jugadores WHERE email = $1';
//         let sumResult = await db.query(querySum, [req.body.email]);

//         if (sumResult.rows.length === 0) {
//             return res.status(404).json({ message: "El registro NO ha sido encontrado" });
//         }

//         let currentMoney = sumResult.rows[0].dinero;
//         let newMoney = currentMoney + req.body.money;

//         // Consulta para actualizar el dinero
//         let queryUpdate = 'UPDATE jugadores SET dinero = $1 WHERE email = $2';
//         let updateResult = await db.query(queryUpdate, [newMoney, req.body.email]);

//         if (updateResult.rowCount > 0) {
//             console.log(`El usuario ${req.body.email} tiene ahora ${newMoney} de dinero.`);
//             res.json({ message: "Dinero actualizado correctamente", newMoney });
//         } else {
//             res.status(404).json({ message: "El registro NO ha sido encontrado" });
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error, no se pudo procesar la solicitud');
//     }
// });



// app.post('/crear' , jsonParser , async (req, res) => {
//     console.log("end point crear" + req.body)
//     try{

//         let query = `INSERT INTO jugadores (email, nombre)
//             values ('${req.body.email}', '${req.body.nombre}'`;
//         let db_response = await db.query(query)

//         console.log(db_response)

//         if(db_response.rowCount == 1){
//             res.json("Todo ha salido bien")
//         } else{
//             res.json("el registro no ha sido creado ")
//         }
//     } catch (err) {
//         console.log(err)
//         res.status(500).send('internal Server Error')
//     }
// });

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}
    - GET: /jugador/:email
    - GET: /dinero
    - POST: /crear`));