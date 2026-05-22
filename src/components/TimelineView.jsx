import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Separator,
} from '@chakra-ui/react'

function TimelineView({ activities }) {
  const sortedActivities = [...activities].sort(
    (a, b) =>
      new Date(a.activityDate) -
      new Date(b.activityDate),
  )

  return (
    <Box
      bg="white"
      p={6}
      borderRadius="2xl"
      boxShadow="md"
      borderWidth="1px"
    >
      <Heading size="md" mb={5}>
        Daily Timeline
      </Heading>

      <VStack spacing={4} align="stretch">
        {sortedActivities.map((activity) => (
          <Box key={activity.id}>
            <HStack justify="space-between" mb={1}>
                <Text fontSize="sm" color="gray.500">
                    {new Date(activity.activityDate,).toLocaleString()}
                </Text>

                <Badge borderRadius="full" px={3}>
                    Activity
                </Badge>
                </HStack>

                <Text fontWeight="bold" fontSize="lg">
                    {activity.title}
                </Text>

                <Separator mt={3} />
            </Box>
            ))}
        </VStack>
    </Box>
    )
}

export default TimelineView