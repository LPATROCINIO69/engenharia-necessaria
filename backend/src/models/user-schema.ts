import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
    nome: {
        type:  String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, insira um email válido']
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlenght: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash da senha antes de salvar
UserSchema.pre("save", async function(next){
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password,10);
})

// Método para comparar senhas
UserSchema.methods.comparePassword = async function(candidatePassword:string){
    return await bcrypt.compare(candidatePassword,this.password);
}

module.exports = model('User', UserSchema);