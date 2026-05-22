import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Box, Button, Grid, Heading, Input, Textarea, VStack } from '@chakra-ui/react'
import DestinationCard from '../components/DestinationCard'

const API = 'http://localhost:8000'

function Destinations() {
  const { tripId } = useParams()
  const [destinations, setDestinations] = useState([])

  const [form, setForm] = useState({
    city: '',
    country: '',
    notes: '',
  })

  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await axios.get(
          `${API}/destinations/trip/${tripId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        setDestinations(res.data)
      } catch {
        setDestinations([])
      }
    }

    fetchDestinations()
  }, [tripId, token])

  const createDestination = async (e) => {
    e.preventDefault()

    await axios.post(
      `${API}/destinations`,
      {
        ...form,
        tripId: parseInt(tripId),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const res = await axios.get(`${API}/destinations/trip/${tripId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setDestinations(res.data)
  }

  return (
    <Box>
      <Heading mb={6}>Destinations</Heading>

      <Box bg="white" p={6} borderRadius="lg" shadow="md" mb={8}>
        <form onSubmit={createDestination}>
          <VStack spacing={4}>
            <Input placeholder="City" onChange={(e) => setForm({ ...form, city: e.target.value })} />
            <Input placeholder="Country" onChange={(e) => setForm({ ...form, country: e.target.value })} />
            <Textarea placeholder="Notes" onChange={(e) => setForm({ ...form, notes: e.target.value })} />

            <Button type="submit" colorScheme="blue" width="full">
              Add Destination
            </Button>
          </VStack>
        </form>
      </Box>

      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
        {destinations.map((d) => (
          <DestinationCard key={d.id} destination={d} />
        ))}
      </Grid>
    </Box>
  )
}

export default Destinations