import { User } from '@/lib/graphql/__generated__';
import { UserForm } from '../../_components/user-form';
import { Card, Alert, Button, Flex, Box, Heading, Text, HStack } from '@chakra-ui/react';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export function UserDetail({ user }: { user?: User | null }) {
  if (!user) {
    return (
      <Alert.Root status="error">
        <Alert.Indicator>
          <AlertTriangle size={16} />
        </Alert.Indicator>
        <Alert.Content>
          <Alert.Description>
            指定されたユーザーが見つかりません。ユーザーが削除されているか、IDが正しくない可能性があります。
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>
    );
  }

  return (
    <Card.Root shadow="md">
      <Card.Header bg="gray.50" borderBottom="1px" borderColor="gray.200" p={6}>
        <Flex justify="space-between" align="center">
          <Box>
            <Heading as="h1" size="xl" mb={1}>
              ユーザー編集
            </Heading>
            <Text color="gray.600">{user.name} さんの情報を編集</Text>
          </Box>
          <Link href="/users">
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
        <UserForm user={user} />
      </Card.Body>
    </Card.Root>
  );
}
