import JobLocation from "../models/joblocation-schema";
import * as HttpResponse from "../utils/http-helper";

export const listarEstados = async () => {


    // Busca todos os estados únicos usando Mongoose + MongoDB
    const estados = await JobLocation.distinct("estado");

    // Ordena alfabeticamente
    estados.sort();

    let response = null;

    if (estados.length >= 1) {
        response = await HttpResponse.ok(estados);
    } else {
        response = await HttpResponse.noContent();
    }
    return response;


}


