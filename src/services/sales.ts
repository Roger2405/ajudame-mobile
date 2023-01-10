import axios from "axios";
import { SalesResumeProps } from "../@types/sales";


export async function getSalesResume() {
    const salesResume: SalesResumeProps[] = await axios.get(`https://server-ajudame.vercel.app/114/sales`)
        .then((response) => {
            if (response.data[0]) {
                return response.data;
            }
            else {
                throw Error(response.data.msg);
            }
        })
    return salesResume
}