import { ITag } from "./Tag.interface";

export interface IProduct {
  id_producto: number;
  nombre: string;
  etiquetas: ITag[];
}
