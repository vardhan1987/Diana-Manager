export class CIModel {
    responseCount:number;
    requestCount:number;
    enabled:number;
    _id:string;
    constructor(public name:string,public accessKey:string,public secretKey:string){}
}