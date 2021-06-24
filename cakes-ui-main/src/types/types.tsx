export interface CakesType {
    id?: number,
    imageurl?: string,
    name?: string,
    comment?: string,
    yumfactor?: number
}
export interface CakesArrayType extends Array<CakesType> {
    [index: number]: CakesType
}
export interface ErrorType {
    error: string
}
export interface UploadPropsType {
    visible: boolean,
    toggleModal: (...args: any[]) => any,
    addCake: Function,
}
export interface CakeModalPropsType {
    visible: boolean,
    closeModal: (...args: any[]) => any,
    cake: CakesType,
    deleteCake: Function,
}
