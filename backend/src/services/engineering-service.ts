import Engineering from "../models/engineering-schema";
import * as HttpResponse from "../utils/http-helper";

export const listarEngenharias = async () => {


    // Busca todos os estados únicos usando Mongoose + MongoDB
    const engenharias = await Engineering.find();
    
    // Ordena alfabeticamente
    engenharias.sort();
    console.log(engenharias);
    let response = null;

    if (engenharias.length >= 1) {
        response = await HttpResponse.ok(engenharias);
    } else {
        response = await HttpResponse.noContent();
    }
    return response;


}


