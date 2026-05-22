import { useState } from 'react'
import axios from 'axios'
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  HStack,
} from '@chakra-ui/react'

function ActivityCard({ activity, setActivities }) {
  const token = localStorage.getItem('token')

  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    title: activity.title,
    description: activity.description || '',
    location: activity.location,
    activityDate: activity.activityDate,
    cost: activity.cost,
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const saveEdit = async () => {
    if (!form.title.trim() || !form.location.trim()) {
      alert('Title and location are required')
      return
    }

    setLoading(true)

    try {
      const res = await axios.put(
        `http://localhost:8000/activities/${activity.id}`,
        {
          ...form,
          cost: Number(form.cost),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const updatedActivity = res.data

      // ✅ THIS FIXES BudgetTracker + TimelineView
      setActivities((prev) =>
        prev.map((a) =>
          a.id === updatedActivity.id ? updatedActivity : a
        )
      )

      setIsEditing(false)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      bg="white"
      p={6}
      borderRadius="2xl"
      boxShadow="md"
      borderWidth="1px"
    >
      <VStack align="start" spacing={3}>
        {isEditing ? (
          <>
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
            />

            <Input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
            />

            <Input
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
            />

            <Input
              name="activityDate"
              type="datetime-local"
              value={form.activityDate?.slice(0, 16)}
              onChange={handleChange}
            />

            <Input
              name="cost"
              type="number"
              value={form.cost}
              onChange={handleChange}
              placeholder="Cost"
            />

            <HStack>
              <Button
                colorScheme="green"
                onClick={saveEdit}
                isLoading={loading}
              >
                Save
              </Button>

              <Button
                onClick={() => setIsEditing(false)}
                isDisabled={loading}
              >
                Cancel
              </Button>
            </HStack>
          </>
        ) : (
          <>
            <Text fontWeight="bold" fontSize="lg">
              {form.title}
            </Text>

            <Text color="gray.600">
              {form.description || 'No description'}
            </Text>

            <Text>📍 {form.location}</Text>

            <Text color="gray.500">
              {new Date(form.activityDate).toLocaleString()}
            </Text>

            <Text fontWeight="bold">
              ${form.cost}
            </Text>

            <Button size="sm" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          </>
        )}
      </VStack>
    </Box>
  )
}

export default ActivityCard