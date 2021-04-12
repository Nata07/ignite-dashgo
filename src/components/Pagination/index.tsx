import { Stack, Button, Box, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountRegister: number;
  registerPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;

}

function generatePagesArray(from: number, to: number){
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter(page => page > 0);
}

export function Pagination({ 
  totalCountRegister, 
  registerPerPage = 10, 
  currentPage = 1, 
  onPageChange }: PaginationProps) {

    const siblingsCount = 1;
    const lastPage = Math.floor(totalCountRegister / registerPerPage);

    const previousPages = currentPage > 1 
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : []

    const nextPages = currentPage < lastPage
      ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
      : []

  return(
    <Stack direction={["column", "row"]} mt="8" 
      justify="space-between" align="center" spacing="6">
      <Box>
        <strong>3</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack direction="row" spacing="2">
        {currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem numberPage={1} />

            { currentPage > (2 + siblingsCount) && 
              <Text color="gray.300" width="8" textAlign="center">...</Text>}
          </>
        )}

        {previousPages.length > 0 && previousPages.map(page => {
          return <PaginationItem key={page} numberPage={page} />
        })}

        <PaginationItem numberPage={currentPage} isCurrent />

        {nextPages.length > 0 && nextPages.map(page => {
          return <PaginationItem key={page} numberPage={page} />
        })}

        {(currentPage + siblingsCount) < lastPage && (
          <>
            { (currentPage + 1 + siblingsCount) < lastPage && 
              <Text color="gray.300" width="8" textAlign="center">...</Text>}
            <PaginationItem numberPage={lastPage} />
          </>
        )}      
      </Stack>
    </Stack>
  )
}