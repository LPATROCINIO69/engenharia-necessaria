import mongoose, { Schema, Document } from "mongoose";

export interface IJobLocation extends Document {
  cidade: string;
  estado: string;
  codigoIbge: number;
}

const JobLocationSchema: Schema = new Schema(
  {
    cidade: { type: String, required: true },
    estado: { type: String, required: true },
    codigoIbge: { type: Number, required: true }
  },
  { collection: "joblocation" }
);

JobLocationSchema.index({ cidade: 1, estado: 1 }, { unique: true });

export default mongoose.model<IJobLocation>("JobLocation", JobLocationSchema);