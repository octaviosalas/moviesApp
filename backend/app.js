import express from "express"
import cors from "cors"
import connectDataBase from "./database/connectDataBase.js"
//import appRoutes from "./routes/appRoutes.routes.js"
import bodyParser from "body-parser"
import userRoutes from "./routes/user.routes.js"
import movieRoutes from "./routes/movies.routes.js"
import genRoutes from "./routes/gens.routes.js"
import commentsRoutes from "./routes/comments.routes.js"

const app = express()
const PORT = 4000

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}))


app.use('/users', userRoutes);
app.use('/movies', movieRoutes);
app.use("/gens/", genRoutes)
app.use("/comments/", commentsRoutes)



app.get('/', (req, res) => {
    res.send('Bienvenidos a tu Servidor de Recomendaciones de Peliculas!!!!!!!!')
  })
  

app.listen(PORT, () => {
     console.log("Servidor de NodeJs/Express iniciado en el puerto 4000 ✔✔")
     connectDataBase() 
})