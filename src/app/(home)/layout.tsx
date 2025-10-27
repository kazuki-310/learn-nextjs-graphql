import { Box, Flex } from '@chakra-ui/react';
import { Sidebar } from '@/components/shared/sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex h="100vh">
      <Sidebar />
      <Box as="main" flex="1" overflowY="auto" p={6}>
        {children}
      </Box>
    </Flex>
  );
}
