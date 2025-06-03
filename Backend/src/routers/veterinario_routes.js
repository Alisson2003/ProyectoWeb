import {Router} from 'express'
import { confirmarMail, registro, recuperarPassword,comprobarTokenPasword,crearNuevoPassword } from '../controllers/veterinario_controller.js'
const router = Router()


router.post('/registro',registro)

router.get('/confirmar/:token', confirmarMail)


router.post('/recuperarpassword', recuperarPassword)

router.get('/recuperarpassword/:token', comprobarTokenPasword)
// todos los que yo envio datos
router.post('/nuevopassword/:token',crearNuevoPassword)

export default router