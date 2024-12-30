import { Button, HStack, Input, Select } from '@chakra-ui/react';

export type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading: boolean;
};

export const SearchInput = ({
  handleSubmit,
  isLoading,
}: Props): JSX.Element => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <HStack w="30vw" minW="300px">
          <Input name="searchWord" placeholder="リポジトリを検索" w="70%" />
          <Select placeholder="ソート指定なし" name="sort" w="30%">
            <option value="stars">スターが多い順</option>
            <option value="updated">更新が新しい順</option>
          </Select>
          <Button
            type="submit"
            colorScheme="teal"
            variant="solid"
            isLoading={isLoading}
          >
            検索
          </Button>
        </HStack>
      </form>
    </>
  );
};
