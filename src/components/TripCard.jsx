import axios from 'axios'
import { Link } from 'react-router-dom'

import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'

function TripCard({ trip }) {
  const token = localStorage.getItem('token')

  const deleteTrip = async () => {
    await axios.delete(
      `http://localhost:8000/trips/${trip.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    window.location.reload()
  }

  return (
    <Box
      bg="white"
      p={6}
      borderRadius="lg"
      shadow="md"
    >
      <VStack
        align="start"
        spacing={3}
      >
        <Heading size="md">
          {trip.title}
        </Heading>

        <Text>
          {trip.description}
        </Text>

        <Text>
          {new Date(
            trip.startDate,
          ).toLocaleDateString()}
          {' - '}
          {new Date(
            trip.endDate,
          ).toLocaleDateString()}
        </Text>

        <Link
          to={`/destinations/${trip.id}`}
        >
          View Destinations
        </Link>

        <Button
          colorScheme="red"
          onClick={deleteTrip}
        >
          Delete
        </Button>
      </VStack>
    </Box>
  )
}

export default TripCard