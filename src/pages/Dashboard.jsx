import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react'

import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <Box
      maxW="container.md"
      mx="auto"
      mt={10}
      p={8}
      bg="white"
      borderRadius="2xl"
      shadow="lg"
      textAlign="center"
    >
      <VStack spacing={6}>
        <Heading size="xl">
          Dashboard
        </Heading>

        <Text fontSize="lg" color="gray.600">
          Manage your trips, destinations, and activities.
        </Text>

        <Image
          src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3djBxdjMxOGJjNXV4dGticzdsdTl5a3RwdHpibHZrNWtiOGswam9pZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ojKMgAPZeerk21Allh/giphy.gif"
          alt="Traveling around the globe"
          borderRadius="xl"
          maxH="300px"
          objectFit="cover"
        />

        <Button
          as={Link}
          to="/trips"
          size="lg"
          borderRadius="full"
        >
          Plan Your Trips Now!
        </Button>
        <Text
            fontSize="sm"
            color="gray.500"
            mt={4}
            fontStyle="italic"
            >
            This’ll help you get your trips together
            before they go plane wrong.
            <br />
            Haha ha
        </Text>
      </VStack>
    </Box>
  )
}

export default Dashboard