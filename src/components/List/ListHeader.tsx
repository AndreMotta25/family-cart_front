import { Box, ButtonGroup, useDisclosure } from "@chakra-ui/react"
import { TrashButton } from "./TrashButton"
import { ShareButton } from "./ShareButton"
import { EditButton } from "./EditButton"
import ResponsiveShortText from "../ResponsiveShortText"
import { dm_serif_display } from "@/fonts"
import { Modal } from "../Modal"
import { Input } from "../Input"
import { useEffect } from "react"
import * as yup from 'yup';
import { SubmitHandler, useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useLists } from "@/contexts/list"
import { useListChanges } from "@/contexts/listChanges"

type ListHeaderProps = {
    name: string;
    identifier: string;
}
type ListSchemaValidation = {
    name_list: string
}

const schema = yup.object({
    name_list: yup.string().required("O nome da lista não pode ficar em branco")
});

const ListHeader = ({name, identifier}:ListHeaderProps) => {
    const {isOpen, onClose, onOpen} = useDisclosure();
    const {remove} = useLists()
    const {renameList,list} = useListChanges()
    const {selectList} = useLists();

    const {handleSubmit, control, setValue, formState:{errors}} = useForm<ListSchemaValidation>({resolver:yupResolver(schema), 
        defaultValues:{
            name_list: name
        }
    })

    const handleSubmitForm:SubmitHandler<ListSchemaValidation> = (data, e ) => {
        e?.preventDefault();
        renameList(data.name_list);
        onClose();
    }

    const close = () => {
        if(!errors.name_list?.message) {
            onClose()
        }
    }
    useEffect(() => {
      setValue("name_list", name)
    }, [name,setValue])
    
    return (
        <>
            <ButtonGroup>
                {!list.isShared &&
                <>
                    <EditButton aria-label='edit-list' bg={"gray.800"} colorIcon='white' onClick={onOpen}/>
                    <ShareButton aria-label='share-list' bg={"gray.800"} colorIcon='white' onClick={() => selectList(identifier)} />
                    <TrashButton aria-label='remove-list' bg={"gray.800"} colorIcon='white' onClick={() => remove(identifier)}/>
                </>}
            </ButtonGroup>
            
            <ResponsiveShortText color={'white'} fontSize={"clamp(2rem, 2.5vw, 2.5rem)"} textTransform={"capitalize"} fontFamily={dm_serif_display.variable} my={'1rem'} textAlign={"center"} as="h2">
                    {name}
            </ResponsiveShortText>
 
            <Modal isOpen={isOpen} onClose={close} onSave={handleSubmit(handleSubmitForm)} title="Atualizar Lista">
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

