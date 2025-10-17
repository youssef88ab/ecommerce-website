import TablePagination from '@mui/material/TablePagination'; // optional if in separate file
import type { ChangeEvent, MouseEvent } from "react";

interface PaginationProps {
  page: number;
  rowsPerPage: number;
  count: number;
  handleChangePage: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}


export default function Pagination({
  page,
  handleChangePage,
  rowsPerPage,
  handleChangeRowsPerPage,
  count,
}: PaginationProps) {
  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={[]} 
    />
  );
}
