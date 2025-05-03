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
import { Product } from '@/lib/graphql/__generated__';

export function ProjectTable({ products }: { products: Product[] }) {
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
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.title}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell className="text-right">{product.price} 円</TableCell>
            <TableCell>{new Date(product.createdAt).toLocaleDateString('ja-JP')}</TableCell>
            <TableCell>{new Date(product.updatedAt).toLocaleDateString('ja-JP')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
