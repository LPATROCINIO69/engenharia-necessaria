import { Schema, model,HydratedDocument } from "mongoose";
import { FieldEngineering } from "../domain/enums/fieldEngineering";
import { TypeJob } from "../domain/enums/typeJob";
import { Opportunity } from "./opportunity-model";

export type OpportunityDocument = HydratedDocument<Opportunity>;

const OpportunitySchema = new Schema<OpportunityDocument>({
  title: { type: String, required: true },
  description: String,
  typeEngineering: {
    type: String,
    enum: Object.values(FieldEngineering), // usa os valores do enum
    required: true
  },
  typeJob: {
    type: String,
    enum: Object.values(TypeJob),
    required: true
  },
  jobLocation: String,
  requirements: String,
  benefits: String,
  responsabilities: String,
  data: { type: Date, default: Date.now },
  link: { type: String, required:true, unique:true}
});

export const OpportunityModel = model<OpportunityDocument>("Opportunity", OpportunitySchema);
