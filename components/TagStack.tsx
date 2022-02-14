import { VStack } from "@chakra-ui/react";
import Tag from "./Tag";
import React from "react";
import { ITag } from "interfaces/Tag.interface";

export interface ITagStack {
  tags: ITag[];
  getProducts: () => void;
}

const TagStack: React.FC<ITagStack> = ({ tags, getProducts }) => {
  return (
    <VStack
      px="8"
      py="5"
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      gap="4"
    >
      {tags.map((tag) => (
        <Tag
          name={tag.nombre}
          id={tag.id_etiqueta}
          key={tag.id_etiqueta}
          getProducts={getProducts}
        />
      ))}
    </VStack>
  );
};

export default TagStack;
