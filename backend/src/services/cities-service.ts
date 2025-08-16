import JobLocation from "../models/joblocation-schema";
import * as HttpResponse from "../utils/http-helper";

export const listarCidade = async (state:string) => {


    // Busca todos os estados únicos usando Mongoose + MongoDB
    const cities = await JobLocation
                            .find({estado:state})
                            .select("cidade -_id")
                            .lean()
                            .then(docs =>docs.map(doc =>doc.cidade));

    // Ordena alfabeticamente
    cities.sort();

    let response = null;

    if (cities.length >= 1) {
        response = await HttpResponse.ok(cities);
    } else {
        response = await HttpResponse.noContent();
    }
    return response;


}

