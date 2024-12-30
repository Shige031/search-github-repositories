'use client';

import { Container, Heading, VStack } from '@chakra-ui/react';
import { SearchInput } from './components/SearchInput';
import { useSearchRepositories } from './hooks';
import { RepositoryCard } from './components/RepositoryCard';
import { RepositoryModal } from './components/RepositoryModal';

export const SearchRepositories = (): JSX.Element => {
  const {
    repositories,
    handleSubmit,
    selectedRepository,
    isOpen,
    onOpenModal,
    onCloseModal,
    isLoading,
  } = useSearchRepositories();
  return (
    <Container alignItems="center" width="70vw" p={6}>
      <VStack spacing={6}>
        <Heading as="h2" size="xl">
          リポジトリ検索
        </Heading>
        <SearchInput handleSubmit={handleSubmit} isLoading={isLoading} />
        <VStack>
          {repositories.map((repository) => (
            <RepositoryCard repository={repository} onClick={onOpenModal} />
          ))}
        </VStack>
      </VStack>
      {selectedRepository && (
        <RepositoryModal
          repository={selectedRepository}
          isOpen={isOpen}
          onClose={onCloseModal}
        />
      )}
    </Container>
  );
};
