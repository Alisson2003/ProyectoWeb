import moongose, {Schema,model} from 'mongoose'
import bcrypt from 'bcryptjs'
import veterinario from './veterinario'
import mongoose from 'mongoose'


const pacienteSchema = new Schema({

    nombrePropietario:{
        type: String,
        required: true,
        trim: true
    },
    cedulaPropietario:{
        type:String,
        required: true,
        trim: true
    },
    passwordPropietario:{
        type:String,
        required: true,
        trim: true
    },
    celularPropietario:{
        type:String,
        required: true,
        trim:true
    },
    avatarMascota:{
        type: String
    },
    avatarMascotaIA:{
        type: String
    },
    tipoMascota:{
        type: String,
        required: true,
        trim: true
    },
    fechaNacimientoMascota:{
        type:String,
        required: true,
        trim: true
    },
    fechaIngresoMascota:{
        type:Date,
        required: true,
        trim: true,
        default: Date.now
    },
    fechaSalidaMascota:{
        type:Date,
        trim: true,
        default: null
    },
    estadoMascota:{
        type: Boolean,
        default: true
    },
    rol:{
        type: String,
        default: "paciente"
    },
    veterinario:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Veterinario'
    }
},{
    timestamps: true
})

//Metodo para cifrar contraseña
pacienteSchema.methods.encrypPassword = async function (password) {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

//Metodo para verificar la contraseña
pacienteSchema.methods.matchPassword() = function (password) {
    return bcrypt.compare(password,this.passwordPropietario)
}

export default model('Paciente', pacienteSchema)