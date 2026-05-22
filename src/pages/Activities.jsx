import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import {
  Box,
  Button,
  Grid,
  Heading,
  Input,
  Text,
  Textarea,
  VStack,
  Container,
} from '@chakra-ui/react'

import ActivityCard from '../components/ActivityCard'
import BudgetTracker from '../components/BudgetTracker'
import TimelineView from '../components/TimelineView'

const API = 'http://localhost:8000'

function Activities() {
  const { destinationId } = useParams()

  const [activities, setActivities] = useState([])

  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    activityDate: '',
    cost: '',
  })

  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await axios.get(
          `${API}/activities/destination/${destinationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        setActivities(res.data)
      } catch {
        setActivities([])
      }
    }

    fetchActivities()
  }, [destinationId, token])

  const hasConflict = activities.some(
    (a) => a.activityDate === form.activityDate
  )

  const createActivity = async (e) => {
  e.preventDefault()

  try {
    if (hasConflict) {
      alert('Scheduling conflict detected')
      return
    }

    await axios.post(
      `${API}/activities`,
      {
        ...form,
        cost: parseFloat(form.cost),
        destinationId: parseInt(destinationId),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const res = await axios.get(
      `${API}/activities/destination/${destinationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    setActivities(res.data)

    setForm({
      title: '',
      description: '',
      location: '',
      activityDate: '',
      cost: '',
    })

    alert('Activity added successfully')
  } catch (err) {

    alert(
      err?.response?.data?.error ||
      'Failed to create activity'
    )
  }
}

  return (
    <Container maxW="container.xl" py={10}>
      <Heading mb={6}>
        Activities
      </Heading>

      <Box
        bg="white"
        p={6}
        borderRadius="xl"
        shadow="md"
        mb={8}
      >
        <form onSubmit={createActivity}>
          <VStack spacing={4}>
            <Input
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
            />

            <Textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
            />

            <Input
              placeholder="Location"
              value={form.location}
              onChange={(e) =>
                setForm({
                  ...form,
                  location: e.target.value,
                })
              }
            />

            <Input
              type="datetime-local"
              value={form.activityDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  activityDate: e.target.value,
                })
              }
            />

            <Input
              type="number"
              placeholder="Cost"
              value={form.cost}
              onChange={(e) =>
                setForm({
                  ...form,
                  cost: e.target.value,
                })
              }
            />

            {hasConflict && (
              <Text color="red.500">
                Scheduling conflict detected
              </Text>
            )}

            <Button
              type="submit"
              colorScheme="blue"
              width="full"
            >
              Add Activity
            </Button>
          </VStack>
        </form>
      </Box>

      <BudgetTracker activities={activities} />
      <TimelineView activities={activities} />

      <Grid
        templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gap={6}
        mt={8}
      >
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            setActivities={setActivities}
          />
        ))}
      </Grid>
    </Container>
  )
}

export default Activities