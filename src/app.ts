import express, { Request, Response, NextFunction } from "express";

const port = 3000;
const app = express();









app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
    console.log("Premere CTRL+C per arrestare");
})