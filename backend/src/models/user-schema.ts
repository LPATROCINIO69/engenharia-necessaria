import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';


export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    createdAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}



const UserSchema = new Schema({
    name: {
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
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash da senha antes de salvar
UserSchema.pre("save", async function(next){
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})

// Método para comparar senhas
UserSchema.methods.comparePassword = async function(candidatePassword:string):Promise<boolean>{
    return await bcrypt.compare(candidatePassword,this.password);
}


export default model<IUser>("User", UserSchema);
