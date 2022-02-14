import { Flex, IconButton, Text } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { tagsApi } from "api/tags.service";
import { useState } from "react";

export interface ITagProps {
  name: string;
  id: number;
  getProducts: () => void;
}

const Tag: React.FC<ITagProps> = ({ name, id, getProducts }) => {
  const [deleteTagLoading, setDeleteTagLoading] = useState<boolean>(false);

  const deleteTags = async () => {
    setDeleteTagLoading(true);
    await tagsApi.delete(id);
    await getProducts();
    setDeleteTagLoading(false);
  };

  return (
    <Flex justifyContent="space-between" w="full" alignItems="center">
      <Text opacity="0.70">{name}</Text>
      <IconButton
        onClick={deleteTags}
        colorScheme="red"
        aria-label="Delete Tag"
        icon={<DeleteIcon />}
        size="sm"
        isLoading={deleteTagLoading}
      />
    </Flex>
  );
};

export default Tag;
