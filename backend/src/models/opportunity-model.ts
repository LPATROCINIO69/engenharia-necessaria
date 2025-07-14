import { FieldEngineering } from "../domain/enums/fieldEngineering";
import { TypeJob } from "../domain/enums/typeJob";


export interface Opportunity {
  id: number;
  title: string;
  description: string;
  typeEngineering: FieldEngineering;
  typeJob: TypeJob;
  jobLocation: string;
  requirements:string;
  benefits:string;
  responsabilities:string;
  data: string;
  link: string;
}