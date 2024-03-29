import { ReactElement, useState } from "react";
import { Layout } from "./_layout";
import { NextPageWithLayout } from "./_app";
import { Box, Button, Flex, Input, Spinner, Text } from "@chakra-ui/react";
import { navigationMenuDistance } from "./dashboard";
import { InputForm } from "@/components/InputForm";
import { Avatar } from "@/components/ModalShare/Avatar";
import { useSession } from "next-auth/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { Password } from "@/components/Password";
import BoxRoot from "@/components/BoxRoot";
import { useAxiosMutate } from "@/hooks/useAxiosMutate";
import { useToast } from "@/hooks/useToast";
import Head from "next/head";
import { EditIcon } from "@/components/Icons/EditIcon";
import { color } from "framer-motion";
import { UploadAvatar } from "@/components/UploadAvatar";

interface IPassFields {
    password: string;
    same_password: string;
}
interface INameField {
    name: string;
}
  
const schemaPass = yup.object({
    password: yup.string().min(1,"A senha deve ter no minimo 1 caractere")
                          .max(10, "A senha deve ter no maximo 8 caracteres")
                          .required("A senha não pode ficar vazia"),
    same_password: yup.string().oneOf([yup.ref("password")],"As senhas devem ser iguais.").required("As senhas não combinam")
});

const schemaName = yup.object({
    name: yup.string().required("O nome não pode ficar vazio."),
});

const Profile: NextPageWithLayout = () => {
    const {data: session, update} = useSession();
    const {requestMutate} = useAxiosMutate();
    const {toast} = useToast()

    const {control: controlPassword, handleSubmit: handleSubmitPass,formState: {errors: errorsPass,isSubmitting}} = useForm<IPassFields>({mode:'onChange',resolver: yupResolver(schemaPass), defaultValues: {
        password: '',
        same_password: '',
    }});
    const {control: controlName, handleSubmit: handleSubmitName,formState: {errors:errorsName}} = useForm<INameField>({mode:'onChange',resolver: yupResolver(schemaName), defaultValues: {
        name: session?.user.name, 
    }});

    const handleChangeName:SubmitHandler<INameField> = async (data,e) => {
        const {error} = await requestMutate({url: 'user/rename', method: 'patch', body: {
            name: data.name
        }});
        if(!error) {
            update({user: {name: data.name}});
        }
    }

    const handleChangePassword:SubmitHandler<IPassFields> = async (data,e) => {
        const {error} = await requestMutate({url: 'user/reset-password', method: 'patch', body: {
            new_password: data.password
        }});
        if(!error) {
            toast({
                title:"Reset senha",
                description: "Reset de senha feito com sucesso",
                status: 'success'
            })
        }
    }

    return(
        <>
        <Head>
                <title>Perfil</title>
        </Head>
        <Flex w={"100%"} as="main" py={'1rem'} flexDirection={["column","column","row"]} paddingBottom={"7rem"}  borderRadius={"0.5rem"} gap={'1rem'}>
            <BoxRoot w="100%" bg={"gray.800"} padding={'1.5rem'} borderRadius={"0.5rem"} as='div'>
                <Box mb={"2rem"} >
                    <UploadAvatar/>
                </Box>
                <InputForm  id="email" label="email" isModify={false} w={"100%"} value={session?.user.email} margin={"0 0 1rem 0"}/>
                <Controller name="name" control={controlName} render={({field}) => <InputForm submit={handleSubmitName(handleChangeName)} id="name" label="nome" isModify w={"100%"} error={errorsName.name && errorsName.name.message} {...field}/> }/>
            </BoxRoot>
            <Flex w={"100%"} alignSelf={"baseline"} bg={"gray.800"} padding={'1.5rem'} borderRadius={"0.5rem"} sx={{"label":{color:"white"},"svg > * ":{color:'white'}}}>
                <Box as={'form'} w={"100%"}>
                    <Controller name="password" control={controlPassword} render={({field}) => <Password {...field} placeholder="Digite sua nova senha" autoComplete="new-password" bg={"gray.700"} outline={"none"} border={"none"} color={"white"} m={"0 0 1rem 0"} id="password" error={errorsPass.password && errorsPass.password.message }/>}/>   
                    <Controller name="same_password" control={controlPassword} render={({field}) => <Password {...field} label="repita a senha" placeholder="Repita a senha" autoComplete="same-password" bg={"gray.700"} outline={"none"} border={"none"} color={"white"} m={"0 0 1rem 0"} id="same-password" error={errorsPass.same_password && errorsPass.same_password.message }/>}/>   
                    <Button mx={"auto"} onClick={handleSubmitPass(handleChangePassword)} display={"block"}>
                       {!isSubmitting && <Text>Atualizar Senha</Text>}
                       {isSubmitting && <Spinner my={0} mx={"auto"} width={'1rem'} height={"1rem"} color="black"/>}
                    </Button>
                </Box>
            </Flex>
        </Flex>
        </>
    )
}   
export default Profile;

Profile.getLayout = function getLayout(page: ReactElement) {
    return (
     <Layout pl={{ base: "2rem", md: "2rem", lg: navigationMenuDistance }} pr={0} w={"calc(100% - 2rem)"}>
        {page} 
      </Layout>
    )
}
Profile.auth = true;