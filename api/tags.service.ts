import { ITag } from "interfaces/Tag.interface";
import { ApiUrl } from "./api.url";

const tagsUrl = ApiUrl + "/tags/";

export const tagsApi = {
  async get(): Promise<ITag[]> {
    const response = await fetch(tagsUrl);
    const json = await response.json();
    return json;
  },

  async delete(id: number) {
    const response = await fetch(tagsUrl + id, {
      method: "DELETE",
    });
    const json = await response.json();
    return json;
  },

  async create(props: Omit<ITag, "id_etiqueta">) {
    const response = await fetch(tagsUrl, {
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
