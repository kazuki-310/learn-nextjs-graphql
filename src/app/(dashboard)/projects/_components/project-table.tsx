'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Project } from '@/lib/graphql/__generated__';
import { EllipsisIcon } from 'lucide-react';
import Link from 'next/link';
import { useTransition } from 'react';
import { deleteProject } from './[id]/_server-actions/actions';

export function ProjectTable({ projects }: { projects: Project[] }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    startTransition(async () => {
      try {
        await deleteProject(id);
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell>{project.title}</TableCell>
            <TableCell>{project.description}</TableCell>
            <TableCell>{project.price} 円</TableCell>
            <TableCell>{new Date(project.createdAt).toLocaleDateString('ja-JP')}</TableCell>
            <TableCell>{new Date(project.updatedAt).toLocaleDateString('ja-JP')}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisIcon width={16} height={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Link href={`/projects/${project.id}`}>
                    <DropdownMenuItem>編集</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600"
                    onClick={() => handleDelete(project.id)}
                    disabled={isPending}
                  >
                    削除
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
