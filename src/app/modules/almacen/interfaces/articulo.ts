export interface Articulo {
  codigo: string;
  nombre: string;
  unidadDeMedida: string;
  cantidad: number;
  ubicacion: string;
  estado: boolean;
  _id?: string;
  idPartida?: string;
  idUsuario?: string;
}

