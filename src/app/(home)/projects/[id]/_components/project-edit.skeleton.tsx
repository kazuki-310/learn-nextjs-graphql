import { Spinner } from '@/components/shared/spinner';
import { Card, Button, Flex, Box, Heading, Text, HStack, Center } from '@chakra-ui/react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function ProjectEditSkeleton() {
  return (
    <Card.Root shadow="md">
      <Card.Header bg="gray.50" borderBottom="1px" borderColor="gray.200" p={6}>
        <Flex justify="space-between" align="center">
          <Box>
            <Heading as="h1" size="xl" mb={1}>
              プロジェクト編集
            </Heading>
            <Text color="gray.600">読み込み中...</Text>
          </Box>
          <Link href="/projects">
            <Button variant="ghost" size="sm">
              <HStack gap={2}>
                <ArrowLeft size={16} />
                <Text>戻る</Text>
              </HStack>
            </Button>
          </Link>
        </Flex>
      </Card.Header>

      <Card.Body p={6}>
        <Center py={8}>
          <Spinner />
        </Center>
      </Card.Body>
    </Card.Root>
  );
}
