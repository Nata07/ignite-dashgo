import NextLink from "next/link";
import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import Icon from "@chakra-ui/icon";
import { Box, Flex, Heading, HStack, Link, Spinner, Text, useBreakpointValue } from "@chakra-ui/react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { RiAddLine, RiDeleteBinLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { useEffect, useState } from "react";

import { useUsers } from "../../services/hooks/useUsers";
import { QueryClient } from "react-query";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";


export default function UserList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useUsers(page);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  async function handlePrefecthUser(userId: string){
    await queryClient.prefetchQuery(['users', userId], async () => {
      const response = await api.get(`users/${userId}`)

      return response.data
    }, {
      staleTime: 1000 * 60 * 10 //10 minutes 
    })
  }


  useEffect(() => {
    
  })

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          flex="1" 
          borderRadius={8}
          bg="gray.800" 
          p="8"
        >
          <Flex mb="8" justify="space-between" align="center">

            <Heading size="lg" fontWeight="normal">
              Usuários 
              
              { !isLoading && isFetching && <Spinner color="gray.500" size="sm" ml="4" />
                // <Text as="span" ml="3" fontSize="10px" >Atualiazando dados...</Text > 
              }
            </Heading>

            <NextLink href="/users/create" passHref>
              <Button 
                as="a" 
                size="sm"
                fontSize="sm" 
                colorScheme="pink" 
                leftIcon={<Icon as={RiAddLine} />}>
                Criar novo
              </Button>
            </NextLink>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao receber os dados</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    { isWideVersion && <Th>Data de cadastro</Th>}
                    <Th width="8">Ações</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map(user => (
                    <Tr key={user.id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Link color="purple.400" onMouseEnter={() => {handlePrefecthUser(user.id)}}>
                            <Text fontWeight="bold">{user.name}</Text>
                          </Link>
                          <Text fontSize="sm" color="gray.300">{user.email}</Text>
                        </Box>
                      </Td>
                      { isWideVersion && <Td>{user.createdAt}</Td>}
                      <Td>
                      <HStack spacing="2" align="center">
                        <Icon as={RiPencilLine} />
                        <Icon as={RiDeleteBinLine} />
                      </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Pagination 
                totalCountRegister={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
        
      </Flex>
    </Box>
  )
}