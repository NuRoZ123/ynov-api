import {ServiceXhr} from "./ServiceXhr";

export const ServiceListe = {
    getAll: () => {
        return ServiceXhr.callWithAuthNoBody("http://localhost:8080/api/v1/listes", "GET");
    },
    create: (title) => {
        const data = JSON.stringify({title: title});
        return ServiceXhr.callWithAuth("http://localhost:8080/api/v1/listes", data, "POST");
    },
    modify: (title, id) => {
        const url = "http://localhost:8080/api/v1/listes/" + id;
        const data = JSON.stringify({title: title});
        return ServiceXhr.callWithAuth(url, data, "PUT")
    },
    delete: (id) => {
        const url = "http://localhost:8080/api/v1/listes/" + id;
        return ServiceXhr.callWithAuthNoBody(url, "DELETE");
    }
}