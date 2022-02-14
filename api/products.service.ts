import { IProduct } from "interfaces/product.interface";
import { ApiUrl } from "./api.url";

const productsUrl = ApiUrl + "/products/";

export const productApi = {
  async get(): Promise<IProduct[]> {
    const response = await fetch(productsUrl);
    const json = await response.json();
    return json;
  },

  async delete(id: number) {
    const response = await fetch(productsUrl + id, {
      method: "DELETE",
    });
    const json = await response.json();
    return json;
  },

  async create(props: Omit<IProduct, "id_producto" | "etiquetas">) {
    const response = await fetch(productsUrl, {
      method: "POST",
      body: JSON.stringify(props),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json;
  },
};
