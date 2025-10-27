import { Suspense } from 'react';
import Link from 'next/link';
import { Container, Card, Flex, Box, Heading, Text, Button, HStack } from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import ProjectTableSkeleton from './_components/project-table-skeleton';

import { ProjectListContainer } from './_containers/project-list-container';

export const dynamic = 'force-dynamic';

export default async function Page() {
  return (
    <Container maxW="container.xl" py={6}>
      <Card.Root shadow="md">
        <Card.Header bg="gray.50" borderBottom="1px" borderColor="gray.200" p={6}>
          <Flex justify="space-between" align="center">
            <Box>
              <Heading as="h1" size="xl" mb={1}>
                プロジェクト一覧
              </Heading>
              <Text color="gray.600">登録されているプロジェクトの一覧を表示しています</Text>
            </Box>
            <Link href="/projects/new">
              <Button size="lg" colorPalette="blue" shadow="lg" _hover={{ shadow: 'xl' }}>
                <HStack gap={2}>
                  <Plus size={16} />
                  <Text>新規プロジェクト作成</Text>
                </HStack>
              </Button>
            </Link>
          </Flex>
        </Card.Header>

        <Card.Body p={3}>
          <Suspense fallback={<ProjectTableSkeleton />}>
            <ProjectListContainer />
          </Suspense>
        </Card.Body>
      </Card.Root>
    </Container>
  );
}
