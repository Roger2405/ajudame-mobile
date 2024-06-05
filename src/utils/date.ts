import moment from "moment";

export function getCurrentDate() {
    const date = new Date();
    return moment( date ).locale('pt-br').format("YYYY-MM-DD"); 
}