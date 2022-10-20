export class Representante{
    constructor(
        public nombre: string,
        public apellidos: string,
        public cargo: string,
        public telefono?: string,
        public ci?: string,
        public email?: string,
        public entidad?: string,
    ){}
}