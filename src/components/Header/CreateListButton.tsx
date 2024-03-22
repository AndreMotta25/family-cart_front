import { useDisclosure } from "@chakra-ui/react";
import { UpscaleButton } from "../UpscaleButton";
import Add from "../Icons/Add";
import { Modal } from "../Modal";
import { Input } from "../Input";
import * as yup from 'yup'
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAxiosMutate } from "@/hooks/useAxiosMutate";
import { useRouter } from "next/router";

interface ICreateListField {
    name:string
}
const schemaCreateList = yup.object({
    name: yup.string().required("O nome da lista não pode ficar em branco")
});

const CreateListButton = () => {
    const {isOpen, onClose, onOpen} = useDisclosure();
    const router = useRouter();
    const {requestMutate,queryClient} = useAxiosMutate();
    const {control, handleSubmit, formState: {errors, isSubmitting}} = useForm<ICreateListField>({mode:'onChange',resolver: yupResolver(schemaCreateList), defaultValues: {
        name: '',
    }});

    const handleClick:SubmitHandler<ICreateListField> = async ({name},e) => {
        e?.preventDefault();

        const {error} = await requestMutate({url:"/lists", method: 'post',body: {
            name: name
        }})
        
        if(!error) {
            queryClient.invalidateQueries({queryKey:["lists"]})
            onClose();
            router.push("/lists");
        }

    }

    return(
        <>
            <UpscaleButton onClick={onOpen} px={"0.5rem"} _hover={{bg:"whiteAlpha.900"}} bg={"transparent"} color={"teal.200"} aria-label="Create list" icon={<Add w={"34px"} height={"34px"}/>}/>
            
            <Modal isOpen={isOpen} onClose={onClose} title="Criar lista" onSave={handleSubmit(handleClick)} as={"form"}>
                <Controller control={control} name="name" render={({field}) => <Input {...field} label="Nome da lista" id="name" type="text" error={errors.name && errors.name?.message}/>}/>
            </Modal>
        </>
    )
}

export {CreateListButton}