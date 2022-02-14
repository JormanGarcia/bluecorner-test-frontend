import { VStack } from "@chakra-ui/react";
import { IProduct } from "interfaces/product.interface";
import React from "react";
import ProductCard from "./ProductCard";

interface IProductStackProps {
  products: IProduct[];
  getProducts: () => void;
}

const ProductStack: React.FC<IProductStackProps> = ({
  products,
  getProducts,
}) => {
  return (
    <VStack mt="8" gap="4">
      {products.map((product) => (
        <ProductCard
          name={product.nombre}
          id={product.id_producto}
          key={product.id_producto}
          tags={product.etiquetas}
          getProducts={getProducts}
        />
      ))}
    </VStack>
  );
};

export default ProductStack;
