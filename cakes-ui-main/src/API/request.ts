import axios, { AxiosResponse } from 'axios';
import { CakesType, CakesArrayType, ErrorType } from '../types/types'


export const request = async (data: CakesType, type: string, route: string) => {
    var response: CakesArrayType | ErrorType
    switch (type) {
        case 'get':
            try {
                let resp: AxiosResponse<any> = await axios.get(`https://cakesapi.herokuapp.com${route}`);
                response = resp.data.data
            } catch (error) {
                throw new Error(JSON.stringify(error));
            }
            return response
            break;
        case 'post':
            try {
                let resp: AxiosResponse<any> = await axios.post(`https://cakesapi.herokuapp.com${route}`, data);
                response = resp.data

            } catch (error) {
                throw new Error(JSON.stringify(error));
            }
            return response
            break;
        case 'delete':
            try {
                let resp: AxiosResponse<any> = await axios.delete(`https://cakesapi.herokuapp.com${route}`, { data });
                response = resp.data

            } catch (error) {
                throw new Error(JSON.stringify(error));
            }
            return response
            break;

        default:
            return { error: 'Nothing Send' }
            break;
    }
}
