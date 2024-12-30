import {
  HStack,
  Text,
  Card,
  CardBody,
  Avatar,
  Heading,
  Flex,
} from '@chakra-ui/react';
import { Repository } from '../hooks';
import { StarIcon } from '@chakra-ui/icons';
import { memo } from 'react';

type Props = {
  repository: Repository;
  onClick: ({ repositoryId }: { repositoryId: string }) => void;
};

export const RepositoryCard = memo(
  ({ repository, onClick }: Props): JSX.Element => {
    return (
      <Card
        w="100%"
        key={repository.id}
        _hover={{
          background: 'gray.100',
          boxShadow: 'xl',
          cursor: 'pointer',
        }}
        onClick={() => onClick({ repositoryId: repository.id })}
      >
        <CardBody>
          <HStack justifyContent="space-between" w="100%">
            <HStack justifyContent="base-line" gap={6} w="80%">
              <Avatar size="md" src={repository.avatar_url} />
              <Heading size="md">{repository.full_name}</Heading>
            </HStack>
            <Flex alignItems="center" gap={2} w="15%">
              <StarIcon color="yellow.500" />
              <Text>{repository.stargazers_count}</Text>
            </Flex>
          </HStack>
        </CardBody>
      </Card>
    );
  },
);
