import express, { Request, Response, NextFunction } from "express";
import { DateTime } from "luxon";

const port = 3000;
const app = express();

// configurazione template engine
app.set("views", "./src/views");
app.set("view engine", "hbs");

// middleware 
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("LOG:", req.method, req.url);
    next();
});

// black friday
app.use((req: Request, res: Response, next: NextFunction) => {
    const adesso = DateTime.local();
    if (adesso.month == 11 && adesso.day == 22) {
        res.send("BLACK FRIDAY");
    }
    next();
});

// MVC ???
app.get("/", (req: Request, res: Response) => {
    res.render("index", { nome: req.query.nome, pageTitle: "Benvenuti da me" });
});

app.get("/benvenuto", (req: Request, res: Response) => {

    res.send("Benvenuto");
});

app.get("/api/pippo", (req: Request, res: Response) => {
    res.json({ nome: "Pippo", anni: 34 });

});



app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
    console.log("Premere CTRL+C per arrestare");
})