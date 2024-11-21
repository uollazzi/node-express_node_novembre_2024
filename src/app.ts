import express, { Request, Response, NextFunction } from "express";
import { DateTime } from "luxon";
import dati from "./data";

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

// middleware file statici
app.use(express.static("./public"));

// black friday
app.use((req: Request, res: Response, next: NextFunction) => {
    const adesso = DateTime.local();
    if (adesso.month == 11 && adesso.day == 22) {
        res.send("BLACK FRIDAY");
    }
    next();
});

// MVC
// Model
// View
// Controller
app.get("/", (req: Request, res: Response) => {
    res.render("index", { nome: req.query.nome, pageTitle: "Benvenuti da me" });
});

app.get("/chi-siamo", (req: Request, res: Response) => {
    res.render("chi-siamo", { pageTitle: "Chi Siamo" });
});

app.get("/benvenuto", (req: Request, res: Response) => {

    res.send("Benvenuto");
});

app.get("/articoli", (req: Request, res: Response) => {
    res.render("articoli", {
        pageTitle: "Lista Articoli",
        articoli: dati
    });
});

app.get("/articoli/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    const idNumber = Number(id);

    if (isNaN(idNumber)) {
        res.status(400).send("Id deve essere un numero.");
        return;
    }

    const articolo = dati.find(x => x.id == idNumber);

    if (!articolo) {
        res.status(404).send("Articolo non trovato.");
        return;
    }

    res.render("articolo",
        {
            pageTitle: "Lista Articoli",
            articolo: articolo
        }
    );
});

app.get("/api/pippo", (req: Request, res: Response) => {
    res.json({ nome: "Pippo", anni: 34 });
});

app.get("/errore", (req: Request, res: Response) => {
    throw new Error("Errore simulato.");
});

// 404
app.use((req: Request, res: Response) => {
    res.status(404).send("Pagina non trovata.")
});

// 500
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.message);
    res.status(500).send("Ops, qualcosa è andato storto: " + err.message);
});

app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
    console.log("Premere CTRL+C per arrestare");
})