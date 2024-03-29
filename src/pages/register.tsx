
import { EmailSection } from "@/components/Sections/EmailSection";
import { NameSection } from "@/components/Sections/NameSection";
import { PasswordSection } from "@/components/Sections/PasswordSection";
import { api } from "@/services/axios";
import {  Flex, useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';


export interface IFields {
    email: string;
    name: string;
    password: string;
    same_password: string;
}
  
const schema = yup.object({
    email: yup.string().email("Email invalido").required("O email não pode ficar vazio."),
    name: yup.string().required("O nome não pode ficar vazio"),
    password: yup.string().min(1,"A senha deve ter no minimo 1 caractere")
                          .max(10, "A senha deve ter no maximo 8 caracteres")
                          .required("A senha não pode ficar vazia"),
    same_password: yup.string().oneOf([yup.ref("password")],"As senhas devem ser iguais.").required("As senhas não combinam")
});


type sections = {
    email: string;
    name: string;
}

const nameSectios = ["email","name"];
const sections = [EmailSection, NameSection];

const Register = () => {
    const [counter, setCounter]= useState(0);
    const {control, handleSubmit,formState: {errors,isSubmitting}} = 
    useForm<IFields>({mode:'onBlur',resolver: yupResolver(schema), defaultValues:{email: '', name:'', password: '',same_password:''} });
    const toast = useToast();
    const router = useRouter();

    const handleNextClick = () => {
        setCounter(n => n+1)
    }
    const handleBackClick = () => {
        setCounter(n => n-1)
    }
    console.log(control)
    const submit:SubmitHandler<IFields> = async (data) => {
        try {
            const response = await api.post("/user",{
                name: data.name,
                email: data.email,
                password: data.password
            });
            toast({title:"Conta criada",duration:2500,position:"top-right",description:"Conta criada com sucesso",status:'success', isClosable:true})
            const result = await signIn("credentials", {redirect:false, email: data.email, password: data.password});

            if(result?.status === 200) {
                router.push("/dashboard");
            }
        }
        catch(e) {
            if(e instanceof AxiosError) {
                toast({title:"Error",duration:5000,position:"top-right",description:e.response?.data.message,status:'error', isClosable:true})
            }
        }
        
    }
    return (
        <Flex as="form" bg={'white'} alignItems={"center"} justifyContent={"center"} mx={"auto"} minHeight={"100vh"}>
            { 
                ((counter < 2) &&
                sections.map((Section,index) => {
                     const section = nameSectios[index] as keyof sections;
                     if(index === counter) return (<Controller key={index} name={section} control={control} render={({field}) => 
                     <Section next={handleNextClick} back={handleBackClick} key={index} error={errors[section] && errors[section]?.message} {...field}/>} />)}
                ))
            }    
            
            {counter === 2 && <PasswordSection back={handleBackClick} control={control} errors={errors} isSubmitting={isSubmitting} submit={handleSubmit(submit)}/>}     
         </Flex>)
    
}
export default Register;