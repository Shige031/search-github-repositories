import { useDisclosure, useToast } from '@chakra-ui/react';
import { useCallback, useState } from 'react';

export type Repository = {
  id: string;
  name: string;
  full_name: string;
  avatar_url: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  watchers: number;
  forks: number;
  open_issues: number;
};

export type UseSearchRepositories = {
  repositories: Repository[];
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  selectedRepository: Repository | null;
  isOpen: boolean;
  onOpenModal: ({ repositoryId }: { repositoryId: string }) => void;
  onCloseModal: VoidFunction;
  isLoading: boolean;
};

export const useSearchRepositories = (): UseSearchRepositories => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [selectedRepository, setSelectedRepository] =
    useState<Repository | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const onOpenModal = useCallback(
    ({ repositoryId }: { repositoryId: string }) => {
      if (repositories.length === 0) return;
      setSelectedRepository(
        repositories.find((repository) => repository.id === repositoryId) ??
          null,
      );
      onOpen();
    },
    [repositories],
  );

  const onCloseModal = useCallback(() => {
    setSelectedRepository(null);
    onClose();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      const res = await fetch(
        `https://api.github.com/search/repositories?q=${Object.fromEntries(formData).searchWord}${Object.fromEntries(formData).sort ? `&sort=${Object.fromEntries(formData).sort}&order=desc` : ''}`,
      );
      const data = await res.json();

      const repositories: Repository[] = data.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        full_name: item.full_name,
        avatar_url: item.owner?.avatar_url || '',
        html_url: item.html_url,
        language: item.language || '',
        stargazers_count: item.stargazers_count,
        watchers: item.watchers,
        forks: item.forks,
        open_issues: item.open_issues,
      }));

      setRepositories(repositories);
    } catch (e: any) {
      toast({
        description: e.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    repositories,
    handleSubmit,
    selectedRepository,
    isOpen,
    onOpenModal,
    onCloseModal,
    isLoading,
  };
};
