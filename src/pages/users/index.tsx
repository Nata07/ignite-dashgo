import Link from "next/link";
import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import Icon from "@chakra-ui/icon";
import { Box, Flex, Heading, HStack, Spinner, Text, useBreakpointValue } from "@chakra-ui/react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { RiAddLine, RiDeleteBinLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { useEffect } from "react";

import { useUsers } from "../../services/hooks/useUsers";


export default function UserList() {

  const { data, isLoading, isFetching, error } = useUsers();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })


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

            <Link href="/users/create" passHref>
              <Button 
                as="a" 
                size="sm"
                fontSize="sm" 
                colorScheme="pink" 
                leftIcon={<Icon as={RiAddLine} />}>
                Criar novo
              </Button>
            </Link>
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
                  {data.map(user => (
                    <Tr key={user.id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight="bold">{user.name}</Text>
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
                totalCountRegister={200}
                currentPage={5}
                onPageChange={() => {}}
              />
            </>
          )}
        </Box>
        
      </Flex>
    </Box>
  )
}