import {
  Flex,
  Heading,
  HStack,
  Button,
} from '@chakra-ui/react'

import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <Flex
      bg="blue.500"
      color="white"
      px={8}
      py={4}
      justify="space-between"
      align="center"
      shadow="md"
    >
      <Heading size="md">
        Trip Planner
      </Heading>

      <HStack spacing={4}>
        <Link to="/">Dashboard</Link>
        <Button
          colorScheme="blackAlpha"
          onClick={logout}
        >
          Logout
        </Button>
      </HStack>
    </Flex>
  )
}

export default Navbar