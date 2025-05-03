'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Project } from '@/lib/graphql/__generated__';

export function ProjectTable({ projects }: { projects: Project[] }) {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell>{project.title}</TableCell>
            <TableCell>{project.description}</TableCell>
            <TableCell className="text-right">{project.price} 円</TableCell>
            <TableCell>{new Date(project.createdAt).toLocaleDateString('ja-JP')}</TableCell>
            <TableCell>{new Date(project.updatedAt).toLocaleDateString('ja-JP')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
