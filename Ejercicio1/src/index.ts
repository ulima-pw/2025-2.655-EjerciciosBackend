import express, {NextFunction, Request, Response} from "Express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"

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
app.use(cors()) // Configuramos CORS

const authentication = (req : Request, resp : Response, next : NextFunction) => {
    const token = req.headers["authorization"]

    if (token == undefined){
        resp.status(400).json({
            error : "Debe enviar token"
        })
        return
    }
    if (token == "abc123") {
        next() // deja pasar la peticion
        return
    }else {
        resp.status(401).json({
            error : "Token incorrecto"
        })
        return
    }
}

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

app.get("/profile", authentication ,(req : Request, resp : Response) => {
    // /profile
    resp.status(200).send("OK")
})

app.get("/users", authentication, (req : Request, resp : Response) => {
    resp.json([
        {username : "billy", password : "123"}
    ])
})

app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`)
})