import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData: boolean;
}
export function Profile({showProfileData}: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Natanael</Text>
          <Text color="gray.300" fontSize="small">nata.mw@hotmail.com</Text>
        </Box>
      )}

      <Avatar size="md" name="Natanael Silva" src="https://github.com/Nata07.png" />

    </Flex>
  )
}