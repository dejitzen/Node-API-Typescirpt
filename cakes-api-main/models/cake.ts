export interface CakesType extends ReadableStream<Uint8Array>{
    imageurl?:string,
    name?:string,
    comment?:string,
    yumfactor?:number
}
export interface DeleteType extends ReadableStream<Uint8Array>{
    id?:number
}
export interface Json {
    success: boolean;
    data?: any[]|string;
  }
  type Send<T = Response> = (body?: Json) => T;
  type Status<T = Response> = (status?: number) => T;
export interface CustomResponse  {
    json: Send<this>;
    status: Status<this>;
  }