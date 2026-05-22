import {
  Button,
  Container,
  Field,
  Heading,
  Input,
  Stack,
  Text,
  Link,
} from '@chakra-ui/react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import z from 'zod'

const registerSchema = z.object({
  name: z.string().min(2, 'Name too short'),
  email: z.string().email('Invalid email'),
  password: z.string().min(5, 'At least 5 characters'),
})

const RegisterPage = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = handleSubmit(async (values) => {
    try {
      await axios.post('http://localhost:8000/auth/register', values)

      navigate('/login')
    } catch (err) {
      const message = err?.response?.data?.error

      if (!message) {
        setError('email', { message: 'Server error' })
        return
      }

      if (message === 'Email already registered') {
        setError('email', { message })
      } else {
        setError('password', { message })
      }
    }
  })

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Stack maxW="md" mx="auto" my={10}>
          <Heading>Register</Heading>

          <Field.Root invalid={!!errors.name}>
            <Field.Label>Name</Field.Label>
            <Input {...register('name')} />
            <Field.ErrorText>
              {errors.name?.message}
            </Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.email}>
            <Field.Label>Email</Field.Label>
            <Input {...register('email')} />
            <Field.ErrorText>
              {errors.email?.message}
            </Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.password}>
            <Field.Label>Password</Field.Label>
            <Input
              type="password"
              {...register('password')}
            />
            <Field.ErrorText>
              {errors.password?.message}
            </Field.ErrorText>
          </Field.Root>

          <Button type="submit" colorPalette="purple">
            Create Account
          </Button>

          <Text textAlign="center" mt={4}>
            Already have an account?{' '}
          <Link as={RouterLink} to="/login" color="purple.400">
                Login
          </Link>
          </Text>
        </Stack>
      </form>
    </Container>
  )
}

export default RegisterPage