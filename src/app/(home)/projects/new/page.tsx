import { Container, Card, Flex, Box, Heading, Text, Button, HStack } from '@chakra-ui/react';
import { ProjectForm } from '../_components/project-form';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CategoryOptionContainer } from '../_containers/category-option-container';
import { LocationOptionContainer } from '../_containers/location-option-container';

export const dynamic = 'force-dynamic';

export default async function Page() {
  return (
    <Container maxW="container.md" py={6}>
      <Card.Root shadow="md">
        <Card.Header bg="gray.50" borderBottom="1px" borderColor="gray.200" p={6}>
          <Flex justify="space-between" align="center">
            <Box>
              <Heading as="h1" size="xl" mb={1}>
                新規プロジェクト作成
              </Heading>
              <Text color="gray.600">必要な情報を入力してプロジェクトを作成してください</Text>
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
          <ProjectForm
            categoryOptions={<CategoryOptionContainer />}
            locationOptions={<LocationOptionContainer />}
          />
        </Card.Body>
      </Card.Root>
    </Container>
  );
}
