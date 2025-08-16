import mongoose, { Schema, Document } from "mongoose";

export interface IEngineering extends Document {
  key: string;   // nome do enum, ex: Civil, Mecanica
  name: string;  // valor do enum, ex: Engenharia Civil
}

const EngineeringSchema = new Schema<IEngineering>({
  key: { type: String, required: true, unique: true },
  name: { type: String, required: true }
},
{ collection: "engineerings" }
);

EngineeringSchema.index({ key: 1 }, { unique: true });

export default mongoose.model<IEngineering>("Engineering", EngineeringSchema);
