import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, Grid, Heading, Input, Textarea, VStack } from '@chakra-ui/react'
import TripCard from '../components/TripCard'

const API = 'http://localhost:8000'

function Trips() {
  const [trips, setTrips] = useState([])

  const [form, setForm] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
  })

  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await axios.get(`${API}/trips`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setTrips(res.data)
      } catch {
        setTrips([])
      }
    }

    fetchTrips()
  }, [token])

  const createTrip = async (e) => {
    e.preventDefault()

    await axios.post(`${API}/trips`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const res = await axios.get(`${API}/trips`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setTrips(res.data)
  }

  return (
    <Box>
      <Heading mb={6}>Your Trips</Heading>

      <Box bg="white" p={6} borderRadius="lg" shadow="md" mb={8}>
        <form onSubmit={createTrip}>
          <VStack spacing={4}>
            <Input placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Textarea placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <Input type="date" onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
            <Input type="date" onChange={(e) => setForm({ ...form, endDate: e.target.value })} />

            <Button type="submit" colorScheme="blue" width="full">
              Create Trip
            </Button>
          </VStack>
        </form>
      </Box>

      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </Grid>
    </Box>
  )
}

export default Trips