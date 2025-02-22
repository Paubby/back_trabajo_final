"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
app.use(cors_1.default());
var body_parser_1 = __importDefault(require("body-parser"));
var jsonParser = body_parser_1.default.json();
var db = __importStar(require("./db-connection"));
app.get('/jugadores/:email', jsonParser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, db_response, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Petici\u00F3n recibida al endpoint GET /user. \n        Body: " + JSON.stringify(req.body));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                query = "SELECT * FROM jugadores where email = '" + req.params.email + "'";
                return [4 /*yield*/, db.query(query)];
            case 2:
                db_response = _a.sent();
                console.log(db_response.rowCount);
                console.log(db_response);
                if (db_response.rows.length > 0) {
                    console.log("User encontrado: " + db_response.rows);
                    res.json(db_response.rows);
                }
                else {
                    console.log("El registro NO ha sido encontrado");
                    res.json("El registro NO ha sido encontrado");
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error(err_1);
                res.status(500).send('Internal Server Error, no se pudo cojer el email correctamente');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/crear', jsonParser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, db_response, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Petici\u00F3n recibida al endpoint POST /user. \n        Body: " + JSON.stringify(req.body.email));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                query = "INSERT INTO jugadores (email, nombre, dinero)\n        VALUES ('" + req.body.email + "', '" + req.body.name + "', 1000);";
                return [4 /*yield*/, db.query(query)];
            case 2:
                db_response = _a.sent();
                console.log(db_response.rowCount);
                console.log(db_response);
                if (db_response.rowCount == 1) {
                    res.json("El registro ha sido creado correctamente.");
                }
                else {
                    res.json("El registro NO ha sido creado");
                }
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                console.error(err_2);
                res.status(500).send('Internal Server Error, no se pudo cojer el email correctamente');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/dinero', jsonParser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query_suma, db_response_suma, dinero_actual, dinero_nuevo, dinero_total, query_update, db_response_update, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Petici\u00F3n recibida al endpoint POST /dinero/:" + req.body.email + ".");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                query_suma = "SELECT dinero FROM jugadores WHERE email = '" + req.body.email + "'";
                return [4 /*yield*/, db.query(query_suma)];
            case 2:
                db_response_suma = _a.sent();
                if (db_response_suma.rows.length === 0) {
                    console.log("El registro NO ha sido encontrado");
                    return [2 /*return*/, res.status(404).json("El registro NO ha sido encontrado")];
                }
                dinero_actual = parseFloat(db_response_suma.rows[0].dinero);
                dinero_nuevo = parseFloat(req.body.money);
                dinero_total = dinero_actual + dinero_nuevo;
                query_update = "UPDATE jugadores SET dinero = " + dinero_total + " WHERE email = '" + req.body.email + "'";
                return [4 /*yield*/, db.query(query_update)];
            case 3:
                db_response_update = _a.sent();
                console.log(req.body.money);
                console.log(db_response_update.rowCount);
                console.log(db_response_suma);
                if (db_response_update.rowCount > 0) {
                    console.log("El usuario " + req.body.email + " tiene ahora " + dinero_total);
                    res.json({ dinero_total: dinero_total });
                }
                else {
                    console.log("El registro NO ha sido actualizado");
                    res.status(500).json("El registro NO ha sido actualizado");
                }
                return [3 /*break*/, 5];
            case 4:
                err_3 = _a.sent();
                console.error(err_3);
                res.status(500).send('Internal Server Error, no se pudo procesar la solicitud');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// app.post('/dinero', jsonParser, async (req, res) => {
//     console.log(`Petición recibida al endpoint POST /dinero/:${req.body.email}.`);
//     try {
//         let query_suma = `SELECT (dinero) FROM jugadores where email = ${req.body.email}`
//         query_suma = req.body.money + query_suma
//         let query_update = `UPDATE jugadores SET dinero = ${req.body.money} WHERE email = '${req.body.email}'`; 
//         let db_response_suma = await db.query(query_suma);
//         let db_response_update = await db.query(query_update);
//         // let db_response = await db.query(query);
//         console.log(req.body.money)
//         console.log(db_response_update.rowCount);
//         console.log(db_response_suma);
//         if(db_response_update.rows.length > 0){
//             console.log(`el usuario ${req.params.email}, tiene ahora ${req.params.money}`)
//             res.json(query_suma);
//         } else {
//             console.log("El registro NO ha sido encontrado")
//             res.json("El registro NO ha sido encontrado")
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error, no se pudo cojer el email correctamente');
//     }
// });
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
var port = process.env.PORT || 3000;
app.listen(port, function () { return console.log("App listening on PORT " + port + "\n    - GET: /jugador/:email\n    - GET: /dinero\n    - POST: /crear"); });
