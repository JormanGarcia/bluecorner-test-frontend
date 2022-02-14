import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { productApi } from "api/products.service";
import ProductStack from "components/ProductStack";
import { IProduct } from "interfaces/product.interface";
import type { NextPage } from "next";
import { ChangeEventHandler, useEffect, useState } from "react";

const Home: NextPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productInput, setProductInput] = useState<string>("");
  const [createProductLoading, setCreateProductLoading] =
    useState<boolean>(false);

  const getProducts = async () => {
    const productsResponse = await productApi.get();
    setProducts(productsResponse);
  };

  const createProduct = async () => {
    if (!productInput) return;
    setCreateProductLoading(true);
    await productApi.create({ nombre: productInput });
    setProductInput("");
    await getProducts();
    setCreateProductLoading(false);
  };

  const onProductInputChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setProductInput(e.target.value);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Box mx="auto" maxW="5xl" pb="10">
      <Flex justifyContent="space-between" mt="10" alignItems="center" mb="20">
        <Heading>Productos</Heading>
        <VStack align="flex-end">
          <Input
            placeholder="Nombre de producto"
            value={productInput}
            onChange={onProductInputChange}
          />
          <Button
            disabled={!productInput}
            colorScheme="blue"
            onClick={createProduct}
            isLoading={createProductLoading}
          >
            Agregar Producto
          </Button>
        </VStack>
      </Flex>
      {products === null ? (
        <Flex w="full" justify={"center"}>
          <Spinner />
        </Flex>
      ) : (
        <ProductStack products={products} getProducts={getProducts} />
      )}
    </Box>
  );
};

export default Home;
