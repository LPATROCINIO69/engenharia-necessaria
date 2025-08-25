
import { OpportunityModel } from "../models/opportunity-schema"; // Schema mongoose
import { Opportunity } from "../models/opportunity-model"; // Interface TS

export const findAllOpportunities = async (
  typeJob?: string,
  typeEngineering?: string,
  jobLocation?: string
): Promise<Opportunity[]> => {
  const filters: any = {};

  if (typeJob) filters.typeJob = typeJob;
  if (typeEngineering) filters.typeEngineering = typeEngineering;
  if (jobLocation) filters.jobLocation = jobLocation;

  const data = await OpportunityModel.find(filters);
  return data as Opportunity[];
};

export const insertOpportunity = async(opportunityData: Opportunity)=>{
    const newOpportunity = await OpportunityModel.create(opportunityData);
    return newOpportunity;
};