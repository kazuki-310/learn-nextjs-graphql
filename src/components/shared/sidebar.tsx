'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Users, FolderOpen, Info } from 'lucide-react';
import { Box, Flex, Heading, VStack, HStack, Text } from '@chakra-ui/react';

const navLinks = [
  { href: '/dashboard', label: 'ダッシュボード', icon: BarChart3 },
  { href: '/users', label: 'ユーザー', icon: Users },
  { href: '/projects', label: 'プロジェクト', icon: FolderOpen },
  { href: '/about', label: 'このアプリについて', icon: Info },
];

export function Sidebar() {
  return (
    <Box
      as="aside"
      minW="256px"
      borderRight="1px"
      borderColor="gray.200"
      bg="gray.50"
      p={6}
      display="flex"
      flexDirection="column"
    >
      <Box flex="1">
        <Link href="/dashboard">
          <Heading
            as="h2"
            size="lg"
            color="gray.800"
            mb={8}
            _hover={{ color: 'blue.600' }}
            transition="colors 0.2s"
          >
            Management Portal
          </Heading>
        </Link>

        <NavMenu />
      </Box>
    </Box>
  );
}

export function NavMenu() {
  const pathname = usePathname();

  return (
    <Box as="nav">
      <VStack gap={2} align="stretch">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link key={link.href} href={link.href}>
              <HStack
                gap={3}
                px={3}
                py={2}
                borderRadius="lg"
                fontSize="sm"
                fontWeight="medium"
                transition="all 0.2s"
                bg={isActive ? 'blue.100' : 'transparent'}
                color={isActive ? 'blue.700' : 'gray.700'}
                _hover={{
                  bg: isActive ? 'blue.100' : 'gray.200',
                  color: isActive ? 'blue.700' : 'gray.900',
                }}
              >
                <Icon size={16} />
                <Text>{link.label}</Text>
              </HStack>
            </Link>
          );
        })}
      </VStack>
    </Box>
  );
}
