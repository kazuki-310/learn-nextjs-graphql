import { Container, Card, Flex, Box, Heading, Text, Button, HStack } from '@chakra-ui/react';
import { UserForm } from '../_components/user-form';
import Link from 'next/link';
import { ArrowLeftFromLine } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Page() {
  return (
    <Container maxW="container.md" py={6}>
      <Card.Root shadow="md">
        <Card.Header bg="gray.50" borderBottom="1px" borderColor="gray.200" p={6}>
          <Flex justify="space-between" align="center">
            <Box>
              <Heading as="h1" size="xl" mb={1}>
                新規ユーザー作成
              </Heading>
              <Text color="gray.600">必要な情報を入力してユーザーを作成してください</Text>
            </Box>
            <Link href="/users">
              <Button variant="ghost" size="sm">
                <HStack gap={2}>
                  <ArrowLeftFromLine size={16} />
                  <Text>戻る</Text>
                </HStack>
              </Button>
            </Link>
          </Flex>
        </Card.Header>

        <Card.Body p={6}>
          <UserForm />
        </Card.Body>
      </Card.Root>
    </Container>
  );
}
