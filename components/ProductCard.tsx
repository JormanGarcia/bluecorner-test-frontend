import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { productApi } from "api/products.service";
import { tagsApi } from "api/tags.service";
import { ITag } from "interfaces/Tag.interface";
import React, { ChangeEventHandler, useState } from "react";
import NoTagBox from "./NoTagBox";
import TagStack from "./TagStack";

export interface IProductsProps {
  name: string;
  id: number;
  tags: ITag[];
  getProducts: () => void;
}

const ProductCard: React.FC<IProductsProps> = ({
  name,
  tags,
  getProducts,
  id,
}) => {
  const [tagInput, setTagInput] = useState<string>("");
  const [createTagLoading, setCreateTagLoading] = useState<boolean>(false);
  const [deleteProductLoading, setDeleteProductLoading] =
    useState<boolean>(false);

  const onChangeTagInput: ChangeEventHandler<HTMLInputElement> = (e) =>
    setTagInput(e.target.value);

  const deleteProduct = async () => {
    setDeleteProductLoading(true);
    await productApi.delete(id);
    await getProducts();
    setDeleteProductLoading(false);
  };

  const addTag = async () => {
    if (!tagInput) return;
    setCreateTagLoading(true);
    await tagsApi.create({
      nombre: tagInput,
      producto: id,
    });

    setTagInput("");
    await getProducts();
    setCreateTagLoading(false);
  };

  return (
    <Box w="full" px="8" py="10" borderRadius="lg" shadow={"xl"}>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mb="8"
        borderBottom="1px"
        borderBottomColor="gray.200"
        pb="6"
      >
        <Heading size="md">{name}</Heading>
        <VStack align={"left"}>
          <Input
            placeholder="Nombre de etiqueta"
            value={tagInput}
            onChange={onChangeTagInput}
          />
          <HStack>
            <Button
              variant={"ghost"}
              onClick={deleteProduct}
              isLoading={deleteProductLoading}
            >
              Eliminar Producto
            </Button>
            <Button
              disabled={!tagInput}
              colorScheme="blue"
              onClick={addTag}
              isLoading={createTagLoading}
            >
              Agregar Etiqueta
            </Button>
          </HStack>
        </VStack>
      </Flex>

      {tags.length === 0 ? (
        <NoTagBox />
      ) : (
        <TagStack tags={tags} getProducts={getProducts} />
      )}
    </Box>
  );
};

export default ProductCard;
