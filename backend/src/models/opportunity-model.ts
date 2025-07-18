import { Types } from "mongoose";
import { FieldEngineering } from "../domain/enums/fieldEngineering";
import { TypeJob } from "../domain/enums/typeJob";


export interface Opportunity {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  typeEngineering: FieldEngineering;
  typeJob: TypeJob;
  jobLocation: string;
  requirements:string;
  benefits:string;
  responsabilities:string;
  data?: Date;
  link: string;
}