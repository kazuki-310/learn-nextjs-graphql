import { Container, Card, Heading, Text, VStack } from '@chakra-ui/react';
export const metadata = {
  title: 'このアプリについて',
  description: 'Management Portal の概要と使い方',
};

export const dynamic = 'force-dynamic';

export default function AboutPage() {
  return (
    <Container maxW="container.xl" py={6}>
      <Card.Root shadow="md">
        <Card.Header bg="gray.50" borderBottom="1px" borderColor="gray.200" p={6}>
          <Heading as="h1" size="xl" mb={1}>
            このアプリについて
          </Heading>
          <Text color="gray.600">Management Portal の概要と使い方</Text>
        </Card.Header>

        <Card.Body p={6}>
          <VStack align="stretch" gap={6}>
            <Card.Root variant="outline">
              <Card.Body>
                <VStack align="start" gap={2}>
                  <Text fontWeight="semibold">Management Portal</Text>
                  <Text color="gray.600">
                    Next.js 15 と GraphQL を使ったユーザー・プロジェクト管理アプリです。
                    ダッシュボードで概要を確認し、ユーザーやプロジェクトの CRUD 操作ができます。
                  </Text>
                </VStack>
              </Card.Body>
            </Card.Root>

            <Card.Root variant="outline">
              <Card.Body>
                <VStack align="start" gap={2}>
                  <Text fontWeight="semibold">主な機能</Text>
                  <Text color="gray.600" as="ul" listStyleType="disc" pl={4}>
                    <li>ダッシュボード: 統計とグラフ表示</li>
                    <li>ユーザー管理: 一覧・作成・編集・削除</li>
                    <li>プロジェクト管理: 一覧・作成・編集・削除</li>
                  </Text>
                </VStack>
              </Card.Body>
            </Card.Root>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Container>
  );
}
