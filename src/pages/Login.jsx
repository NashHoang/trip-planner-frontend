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

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(5, 'Must be at least 5 characters'),
})

const LoginPage = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = handleSubmit(async (values) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/auth/login',
        values
      )

      const token = response.data.token

      if (token) {
        localStorage.setItem('token', token)
        navigate('/trips')
      }
    } catch (err) {
      const message = err?.response?.data?.error

      if (!message) {
        setError('email', { message: 'Server error' })
        return
      }

      if (message === 'User not found') {
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
          <Heading textAlign="center">Login</Heading>

          <Field.Root invalid={!!errors.email}>
            <Field.Label>Email</Field.Label>
            <Input placeholder="Enter your email" {...register('email')} />
            <Field.ErrorText>
              {errors.email?.message}
            </Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.password}>
            <Field.Label>Password</Field.Label>
            <Input
              type="password"
              placeholder="Enter your password"
              {...register('password')}
            />
            <Field.ErrorText>
              {errors.password?.message}
            </Field.ErrorText>
          </Field.Root>

          <Button type="submit" colorPalette="purple">
            Login
          </Button>

          <Text textAlign="center" mt={4}>
            {"Don't have an account?"}
            <Link as={RouterLink} to="/register" color="purple.400">
              Register
            </Link>
          </Text>
        </Stack>
      </form>
    </Container>
  )
}

export default LoginPage