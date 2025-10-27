import { ProjectForm } from '../../_components/project-form';
import { Card, Alert, Button, Flex, Box, Heading, Text, HStack } from '@chakra-ui/react';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Project } from '@/lib/graphql/__generated__';

export function ProjectDetail({ project }: { project?: Project | null }) {
  if (!project) {
    return (
      <Alert.Root status="error">
        <Alert.Indicator>
          <AlertTriangle size={16} />
        </Alert.Indicator>
        <Alert.Content>
          <Alert.Description>
            指定されたプロジェクトが見つかりません。プロジェクトが削除されているか、IDが正しくない可能性があります。
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
              プロジェクト編集
            </Heading>
            <Text color="gray.600">{project.title} の情報を編集</Text>
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
        <ProjectForm project={project} />
      </Card.Body>
    </Card.Root>
  );
}
