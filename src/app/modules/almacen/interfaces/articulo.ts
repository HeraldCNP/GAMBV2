export interface Articulo {
  codigo: string;
  nombre: string;
  unidadDeMedida: string;
  cantidad: number;
  ubicacion: string;
  estado: boolean;
  idCategoria?: string;
  idUsuario?: string;
}

