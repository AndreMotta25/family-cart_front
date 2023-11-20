import { Box, ButtonGroup, useDisclosure } from "@chakra-ui/react"
import { TrashButton } from "./TrashButton"
import { ShareButton } from "./ShareButton"
import { EditButton } from "./EditButton"
import ResponsiveShortText from "../ResponsiveShortText"
import { dm_serif_display } from "@/fonts"
import { Modal } from "../Modal"
import { Input } from "../Input"
import { FormEvent, useEffect, useState } from "react"
import * as yup from 'yup';
import { SubmitHandler, useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useLists } from "@/contexts/list"

type ListHeaderProps = {
    name: string;
    identifier: string;
    updateList: (newName: string) => void
}
type ListSchemaValidation = {
    name_list: string
}

const schema = yup.object({
    name_list: yup.string().required("O nome da lista não pode ficar em branco")
});

const ListHeader = ({name,updateList,identifier}:ListHeaderProps) => {
    const {isOpen, onClose, onOpen} = useDisclosure();
    const {remove} = useLists()
    const {handleSubmit,control, setValue, formState:{errors}} = useForm<ListSchemaValidation>({resolver:yupResolver(schema), 
        defaultValues:{
            name_list: name
        }
    })

    const handleSubmitForm:SubmitHandler<ListSchemaValidation> = (data, e ) => {
        e?.preventDefault();
        updateList(data.name_list);
        onClose();
        // faria uma requisição na api.
    }

    useEffect(() => {
      setValue("name_list", name)
    }, [name,setValue])
    
    return (
        <>
            <ButtonGroup>
                <TrashButton aria-label='remove-list' bg={"gray.800"} colorIcon='white' onClick={() => remove(identifier)}/>
                <ShareButton aria-label='share-list' bg={"gray.800"} colorIcon='white' />
                <EditButton aria-label='edit-list' bg={"gray.800"} colorIcon='white' onClick={onOpen} />
            </ButtonGroup>
            
            <ResponsiveShortText color={'white'} fontSize={"clamp(2rem, 2.5vw, 2.5rem)"} textTransform={"capitalize"} fontFamily={dm_serif_display.variable} my={'1rem'} textAlign={"center"} as="h2">
                    {name}
            </ResponsiveShortText>
 
            <Modal isOpen={isOpen} onClose={onClose} onSave={handleSubmit(handleSubmitForm)} title="Atualizar Lista">
                <Box display={"flex"} flexDirection={"column"} gap={"1rem"}> 
                    <Controller name={'name_list'} control={control} render={({field}) => 
                        <Input placeholder='Nome da lista' id="list" label="Nome da Lista" {...field} error={errors.name_list && errors.name_list.message}/>}
                    />   
                </Box>
            </Modal>
        </>
    )
}
export {ListHeader}


// 29 de novembro 14:30 dr.carlos alberto