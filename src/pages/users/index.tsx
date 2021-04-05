import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import Icon from "@chakra-ui/icon";
import { Box, Flex, Heading, HStack, Text, useBreakpointValue } from "@chakra-ui/react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { RiAddLine, RiDeleteBinLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

export default function UserList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
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

            <Heading size="lg" fontWeight="normal">Usuários</Heading>

            <Button 
              as="a" 
              size="sm"
              fontSize="sm" 
              colorScheme="pink" 
              leftIcon={<Icon as={RiAddLine} />}>
              Criar novo
            </Button>
          </Flex>

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
              <Tr>
                <Td px={["4", "4", "6"]}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Natanael Silva</Text>
                    <Text fontSize="sm" color="gray.300">nata.mw@hotmail.com</Text>
                  </Box>
                </Td>
                { isWideVersion && <Td>04 de abril de 2021 </Td>}
                <Td>
                {/* <Button 
                  as="span" 
                  size="sm"
                  fontSize="sm" 
                  leftIcon={}>
                </Button> */}
                <HStack spacing="2" align="center">
                  <Icon as={RiPencilLine} />
                  <Icon as={RiDeleteBinLine} />
                </HStack>
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <Pagination />
        </Box>
        
      </Flex>
    </Box>
  )
}