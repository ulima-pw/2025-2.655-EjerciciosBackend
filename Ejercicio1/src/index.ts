import express, {Request, Response} from "Express"
import dotenv from "dotenv"
import bodyParser from "body-parser"

dotenv.config()

const app = express()
const PORT = process.env.PORT

// MIDDLEWARES

// Middlewares que permiten obtener
// la data del payload (cuerpo) en peticiones POST
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))

app.post("/login", (req : Request, resp : Response) => {
    const data = req.body

    const username = data.username
    const password = data.password

    if (username == "PW" && password == "123") {
        resp.status(200).json({
            token : "abc123"
        })
        return
    }
    resp.status(400).json({
        error : "Credenciales invalidas"
    }) // Error en login
    return
})

app.get("/profile", (req : Request, resp : Response) => {
    // /profile?token=abc123
    const token = req.query.token
    if (token != undefined && token == "abc123") {
        resp.status(200).send("OK")
        return
    }else {
        resp.status(401).json({
            error : "Usuario no autorizado"
        })
        return
    }
})

app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`)
})