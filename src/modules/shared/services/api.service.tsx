import {baseUrl} from "./apiUrl.service";
import queryString from "query-string";

export default class Api{
    static get(url){
        return fetch(baseUrl + url, {credentials: 'include'}).then(resp => resp.json());
    }
    static post(url, data){
        return fetch(baseUrl+url, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    }
    static getFormHtml(url, request){
        let settings:RequestInit = {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: queryString.stringify(request)

        };
        return fetch(baseUrl + url, settings).then(resp=>resp.text());
    }
}