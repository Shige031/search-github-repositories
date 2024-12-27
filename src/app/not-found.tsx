import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from '@chakra-ui/react';

export default function notFound() {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>ページが見つかりません</AlertTitle>
      <AlertDescription>お探しのページは存在しません</AlertDescription>
    </Alert>
  );
}
