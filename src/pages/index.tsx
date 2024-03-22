import Head from 'next/head'
import { Inter } from 'next/font/google'
import { Box, Text, Button, Flex, FormControl , useToast, Spinner} from '@chakra-ui/react'
import { Input } from '@/components/Input'
import { UpscaleLink } from '@/components/UpscaleLink'
import GoogleButton from '@/components/GoogleButton'
import { UpscaleButton } from '@/components/UpscaleButton'
import {signIn} from 'next-auth/react'
import { useForm, Controller, SubmitHandler} from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import {useRouter} from 'next/router';
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import { dm_serif_display } from '@/fonts'
import { useEffect } from 'react'
import { Password } from '@/components/Password'

interface IFields {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().required("O email não pode ficar vazio").email("Email invalido"),
  password: yup.string().required("A senha não pode ficar vazia")
});

export default function Home() {
  const toast = useToast();
  const {control, handleSubmit,formState: {errors, isSubmitting}} = useForm<IFields>({resolver: yupResolver(schema), defaultValues: {
    email: '', 
    password: ''
  }});
  const router = useRouter();


  const handleSign: SubmitHandler<IFields> = async (data, e) => {
    e?.preventDefault();
    const result = await signIn("credentials", {redirect:false, email: data.email, password: data.password});

    if(result?.status === 200) {
      router.push("/dashboard");
    }
    else {
      toast({
        title: "Erro de autenticação",
        description: result?.error,
        status: "error",
        duration: 9000,
        isClosable: true,
        position:"top-right"
      })
    }
  }
  
  useEffect(() => {
    if(router.query.error) {
      toast({
        title: "Erro de autenticação",
        description: router.query.error,
        status: "error",
        duration: 9000,
        isClosable: true,
        position:"top-right"
      })
    }
  }, [router.query.error, toast])


  return (
    <Flex bg={'white'} alignItems={"center"} justifyContent={"center"} mx={"auto"} minHeight={"100vh"}>
        <Flex maxW={"700px"} w={"100%"} borderRadius={"0.5rem"} padding={"1rem"} gap={"1rem"}>
          <Flex onSubmit={handleSubmit(handleSign)} as={"form"} direction={"column"} w={"100%"} borderRight={"1px solid"} gap={"0.5rem"} borderColor="gray.200" px={"1rem"}>
            <Controller control={control} name='email' render={({field}) => <Input id='teste' label='Email' error={errors.email && errors.email.message}  {...field}/>} />
            <Controller control={control} name='password' render={({field}) => <Password type='password' error={errors.password && errors.password.message}  {...field}/> }/>
            {isSubmitting && <Spinner mx={"auto"}/>}
            <UpscaleButton aria-label='Fazer login'mx={"auto"} w={"100%"} type='submit' _hover={{bg:"teal.100"}}>Entrar</UpscaleButton>
          </Flex>
          <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
            <GoogleButton/>
            <Text className={dm_serif_display.className} display={"flex"} gap={"0.4rem"} fontWeight={"bold"} _before={{content:'""', display:"block", width:"100%", height:"2px", bg:"teal.300"}} 
                  _after={{content:'""', display:"block", width:"100%", height:"2px", bg:"teal.300"}} alignItems={"center"}>
                    Ou
            </Text>
              <UpscaleLink fontWeight={"600"} fontSize={"1rem"} marginTop={'30px'} href='/register' _hover={{bg:"teal.100"}}>
                Cadastrar-se
              </UpscaleLink>
          </Box>
        </Flex>
    </Flex>
  )
}

/*
  O componente controller é usado para inputs de bibliotecas externas como a do chakra.
  Esse componente é especifico para cada input.  
*/ 

/*
  Caso o usuario já esteja logado ele não poderá chegar na pagina de login novamente!
*/ 
export const getServerSideProps:GetServerSideProps = async (context) => {
  /*
    A documentação recomenda a usar o getServerSession e não o getSession.
    a variavel authOptions é o mesmo objeto passado para o next-auth.
  */ 
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session?.user) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}