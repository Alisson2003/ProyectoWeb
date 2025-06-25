// Requerir Modulos

import express from 'express'; 
import dotenv from 'dotenv'; // para las variables globales
import cors from 'cors'; //comunicacion entre backend y frontend sin importar el dominio
import routerVeterinarios from './routers/veterinario_routes.js'
import routerPacientes from './routers/paciente_routes.js';


// Inicializaciones (crear instancias)
const app = express() //
dotenv.config() //para que carge las variables

// Configuraciones
app.set('port', process.env.PORT || 3000) //cuando no llama datos sencibles -- cuando llama datos sencibles => port', process.env.PORT (variable global)
app.use(cors())

// Middlewares
app.use(express.json()) //captura y los almacena en un json para que el servidor guarde como un api y lo envie al backend

// (crear una ruta)
app.get('/',(req,res)=>{
    res.send("Server on")
})

//rutas veterinario
app.use('/api',routerVeterinarios)

//Ruta Pacientes
app.use('/api',routerPacientes)

//Rutas que no existen
app.use((req, res) => res.status(404).send("No encontrado - 404"))



//exportar la instancia
export default app


