import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'

import { Link } from 'react-router-dom'

function DestinationCard({ destination }) {
  return (
    <Box
      bg="white"
      p={6}
      borderRadius="2xl"
      boxShadow="md"
      borderWidth="1px"
      transition="0.2s"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'lg',
      }}
    >
        <VStack align="start" spacing={3}>
        <Heading size="md">
          {destination.city}, {destination.country}
        </Heading>

        <Text color="gray.600">
          {destination.notes || 'No notes added'}
        </Text>

        <Button
          as={Link}
          to={`/activities/${destination.id}`}
          size="sm"
          borderRadius="full"
        >
          View Activities
        </Button>
      </VStack>
    </Box>
  )
}

export default DestinationCard