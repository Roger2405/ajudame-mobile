import moment from "moment";
import 'moment/locale/pt-br';

export function getCurrentDate() {
    const date = new Date();
    return moment( date ).locale('pt-br').format("YYYY-MM-DD"); 
}