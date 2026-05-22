import { Alert } from '@chakra-ui/react'

function ConflictDetector({ hasConflict }) {
  if (!hasConflict) {
    return null
  }

  return (
    <Alert.Root
      status="error"
      borderRadius="xl"
      mb={4}
    >
      <Alert.Indicator />

      <Alert.Content>
        <Alert.Title>
          Scheduling conflict detected.
        </Alert.Title>
      </Alert.Content>
    </Alert.Root>
  )
}

export default ConflictDetector