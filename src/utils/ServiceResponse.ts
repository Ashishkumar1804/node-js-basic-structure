import { ServiceResponseInterface } from "../interfaces/ServiceResponseInterface";
export function serviceResponse(error: boolean, message: string, data: any, responseText?: string,): ServiceResponseInterface {
    return { error: error, responseText: responseText, message: message, data: data, };
}