import jwt from "jsonwebtoken"
import Veterinario from "../models/veterinario.js"

const crearTokenJWT = (id, rol) => {

    return jwt.sign({ id, rol }, process.env.JWT_SECRET, { expiresIn: "1d" })
}

const verificarTokenJWT = async (req, res, next) => {

		const { authorization } = req.headers
		
    if (!authorization) return res.status(401).json({ msg: "Acceso denegado: token no proporcionado o inválido" })

    try {
        const token = authorization.split(' ')[1];
        const { id, rol } = jwt.verify(token,process.env.JWT_SECRET)
        console.log(id,rol)
        if (rol === "admin") {
            req.veterinarioBDD = await Veterinario.findById(id).lean().select("-password")
            console.log(req.veterinarioBDD)
            next()
        }
    } catch (error) {
        return res.status(401).json({ msg: "Token inválido o expirado" });
    }
}


export { 
    crearTokenJWT,
    verificarTokenJWT 
}

