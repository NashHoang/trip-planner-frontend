import {
  Box,
  Heading,
  Stat,
} from '@chakra-ui/react'

function BudgetTracker({ activities }) {
  const total = activities.reduce(
    (sum, activity) => sum + activity.cost,
    0,
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
        Budget Tracker
      </Heading>

      <Stat.Root>
        <Stat.Label>
          Total Estimated Cost
        </Stat.Label>

        <Stat.ValueText>
          ${total.toFixed(2)}
        </Stat.ValueText>
      </Stat.Root>
    </Box>
  )
}

export default BudgetTracker