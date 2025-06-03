import { sendMailToRegister, sendMailToRecoveryPassword } from "../config/nodemailler.js"
import veterinario from "../models/veterinario.js"
import Veterinario from "../models/veterinario.js"


//Etapa 1
const registro = async (req, res) => {
    //1
    const {email, password} = req.body

    //2
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Todos los campos son obligtorios"})

    const veterinarioEmailBDD = await Veterinario.findOne({email})
    if (veterinarioEmailBDD) return res.status(400).json({msg:"El email esta registrado"})
    //
    const nuevoVeterinario = await Veterinario(req.body)

    nuevoVeterinario.password = await nuevoVeterinario.encrypPassword(password)

    const token = nuevoVeterinario.crearToken()
    await sendMailToRegister(email,token)


    await nuevoVeterinario.save()

    //4

    res.status(200).json({msg:"Verifica tu correo"})

}

const confirmarMail = async (req, res) => {
    //1
    if (!(req.params.token)) return res.status(400).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    
    //2
    const veterinarioBDD = await Veterinario.findOne({token:req.params.token})

    if(!veterinarioBDD?.token) return res.status(404).json({msg:"La cuenta ya ha sido confirmada"})
    //3
    veterinarioBDD.token = null
    veterinarioBDD.confirmEmail=true
    await veterinarioBDD.save()

    //4
    res.status(200).json({msg:"Token confirmado, ya puedes iniciar sesión"})
}

// RECUPERAR CONTRASEÑA

const recuperarPassword = async(req,res)=>{
    const {email} = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const veterinarioBDD = await Veterinario.findOne({email})
    if(!veterinarioBDD) return res.status(404).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})
    const token = veterinarioBDD.crearToken()
    veterinarioBDD.token=token
    await sendMailToRecoveryPassword(email,token)
    await veterinarioBDD.save()
    res.status(200).json({msg:"Revisa tu correo electrónico para reestablecer tu cuenta"})
}

/*const recuperarPassword = async (req, res) => {
    //1
    const{email} = req.body
    //2
    if (Object.values(req.body).includes("")) return res.status(400).json({msg: "Lo sentimos, debes completar todos los campos"})

    const veterinarioBDD = await Veterinario.findOne({email})

    //validaciones
    if (veterinarioBDD) return res.status(400).json({msg: "Lo sentimos, el usuario no existe"})

    //3

    const token = veterinarioBDD.crearToken()
    veterinarioBDD.token = token
    //Enviar email
    await sendMailToRecoveryPassword(email, token)
    await veterinarioBDD.save()

    //4
    res.status(200).json({msg: "Revisa tu correo para restablecer tu contraseña"})
}*/

const comprobarTokenPasword = async (req,res)=>{
    const {token} = req.params
    const veterinarioBDD = await Veterinario.findOne({token})
    if(veterinarioBDD?.token !== req.params.token) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    await veterinarioBDD.save()
    res.status(200).json({msg:"Token confirmado, ya puedes crear tu nuevo password"}) 
}

/*/
const comprobarTokenPassword = async (req, res) => {

    //1 
    const {token} = req.params

    //2
    const veterinarioBDD = await Veterinario.findOne({token})
    if (veterinarioBDD.token !== token) return res.status(404).json({msg: "Lo sentimos, no se puede valdiar la cuenta"})

    //3
    await veterinarioBDD.save()

    //4
    res.status(200).json({msg: "Token confirmado, ya puedes crear tu nuevo password"})
}
    */

const crearNuevoPassword = async (req, res) => {
    //1
    const {password, confirmpassword} = req.body
    
    //2
    if(Object.values(req.body).includes("")) return res.status(404).json({msg: "Lo sentimos,debes llenar todos los campos"})

    if(password !== confirmpassword) return res.status(404).json({msg: "Lo sentimos,los password no cinciden"})

    const veterinarioBDD = await Veterinario.findOne({token:req.params.token})

    if(veterinarioBDD.token !== req.params.token) return res.status(404).json({msg: "Lo sentimos, no se puede validar la cuenta"})

    //3 logica - dejando token nulo y encriptacion de contraseña
    veterinarioBDD.token = null
    veterinarioBDD.password = await veterinarioBDD.encrypPassword(password)

    await veterinarioBDD.save()

    //4

    res.status(200).json({msg: "Felicitaciones, ya puedes iniciar sesion con tu nuevo password"})

}

export {
    registro,
    confirmarMail,
    recuperarPassword,
    comprobarTokenPasword,
    crearNuevoPassword
}