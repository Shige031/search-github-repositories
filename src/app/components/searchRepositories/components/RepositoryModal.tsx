import {
  Avatar,
  Box,
  Grid,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Repository } from '../hooks';
import { StatBox } from '../../atoms/StatBox';
import Link from 'next/link';

type Props = {
  repository: Repository;
  isOpen: boolean;
  onClose: VoidFunction;
};

export const RepositoryModal = (props: Props): JSX.Element => {
  const { repository, isOpen, onClose } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center" fontWeight="bold">
          {repository.full_name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6} align="stretch">
            <HStack align="center" justifyContent="space-between">
              <HStack spacing={4} align="center">
                <Avatar size="lg" src={repository.avatar_url} />
                <VStack align="start" spacing={1}>
                  <Heading size="md">{repository.name}</Heading>
                  <Text fontSize="sm" color="gray.500">
                    Language: {repository.language || 'N/A'}
                  </Text>
                </VStack>
              </HStack>
              <Link href={repository.html_url} target="blank">
                <Text color="blue.500">view more</Text>
              </Link>
            </HStack>
            <Box borderTopWidth="1px" borderTopColor="gray.200" pt={4}>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <StatBox label="Stars" value={repository.stargazers_count} />
                <StatBox label="Watchers" value={repository.watchers} />
                <StatBox label="Forks" value={repository.forks} />
                <StatBox label="Open Issues" value={repository.open_issues} />
              </Grid>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
