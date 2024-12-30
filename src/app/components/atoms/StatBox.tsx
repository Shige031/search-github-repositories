import { Box, Text } from '@chakra-ui/react';

export const StatBox = ({
  label,
  value,
}: {
  label: string;
  value: number;
}): JSX.Element => (
  <Box textAlign="center" p={3} bg="gray.50" borderRadius="md" shadow="sm">
    <Text fontSize="lg" fontWeight="bold">
      {value}
    </Text>
    <Text fontSize="sm" color="gray.500">
      {label}
    </Text>
  </Box>
);
