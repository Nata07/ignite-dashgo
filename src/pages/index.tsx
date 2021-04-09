import { Flex, Button, Stack } from '@chakra-ui/react'
import { Input } from '../components/Form/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().email('Insira um E-mail válido').required('E-mail obrigatório'),
  password: yup.string().required('Senha obrigatória'),
})

export default function SignIn() {
  const {register, handleSubmit, formState:{ errors, isSubmitting } } = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    console.log(data)
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex as="form" w="100%" maxWidth={360} bg="gray.800" p="8" borderRadius={8} 
        flexDir="column" onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input name="email" type="email" label="E-mail" error={errors.email} {...register("email")} />
          <Input name="password" type="password" label="Senha" error={errors.password} {...register("password")} />
        </Stack>

        <Button type="submit" 
          mt="4" colorScheme="pink" size="lg"
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
