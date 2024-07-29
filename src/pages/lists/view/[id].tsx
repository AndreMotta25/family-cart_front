import { Modal } from "@/components/Modal"
import  Layout  from "@/pages/_layout"
import { navigationMenuDistance } from "@/pages/dashboard"
import { Box, UnorderedList, useDisclosure, Text, Spinner, Flex } from "@chakra-ui/react"
import { ChangeEvent,FormEvent,ReactElement, useCallback, useState } from "react"
import { Input } from "@/components/Input"
import { IItem, Item } from "@/components/ItemList/Item"
import { ListHeader } from "@/components/List/ListHeader"
import { AddItemButton } from "@/components/AddItemButton"
import { NextPageWithLayout } from "@/pages/_app"
import { ListChangesProvider, useListChanges } from "@/contexts/listChanges"
import { ListProvider, useLists } from "@/contexts/list"
import Head from "next/head"

export interface EditableItem {
    name_item:string;
    url: string;
    id?: string;
}
export interface IList {
    name: string;
    itens: IItem[];
    id:string;
}


const SpecificList:NextPageWithLayout = () => {
    const {isOpen, onClose, onOpen} = useDisclosure()
    const [editableItem, setEditableItem] = useState<EditableItem>({} as EditableItem);
    const [action, setAction] = useState("") 
    const {list, isLoading, saveItem} = useListChanges()

    const closeModal = () => {
        setEditableItem({} as EditableItem);
        onClose();
    }

    const updateItem = useCallback((id:string) => {
        const item = list.itens.find(item => item.id === id) as IItem;
        setEditableItem({...item, name_item: item.name}); 
        setAction("Atualizar item");
        onOpen();
    },[list, onOpen])

    const createItem = () => {
        setEditableItem({name_item:"", url:""})
        setAction("Adicionar item");
        onOpen();
    }

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setEditableItem((item) => ({...item, [e.target.id]: e.target.value}))
    }

    const handleSave = async (e:FormEvent<HTMLElement>) => {
        e.preventDefault(); 
        await saveItem(editableItem);

        closeModal(); 
    }
    return(
        <>
            <Head>
                {!isLoading && <title>Listas - {list.name} </title>}
                {isLoading && <title>Carregando</title>}
            </Head>
            <Box bg={"gray.800"} w={"100%"}  mt={"1rem"} as="main" py={'2rem'} px={'1rem'}  borderRadius={"0.5rem"}>
                {isLoading && 
                <Flex alignItems={"center"} justify={"center"}>
                    <Spinner color="white"/>
                </Flex>}
                {!isLoading && 
                <Box width={{base:"100%",md:"60%"}} mx={"auto"} >
                    <ListHeader name={list.name} identifier={list.id}/>    
                    <AddItemButton createItem={createItem}/>
                    <UnorderedList  color={"white"} m={0}>
                        {   
                            list.itens?.length > 0 &&
                            list.itens?.map(item => (
                               <Item item={item} key={item.id} updateItem={updateItem}/>
                            ))
                            || <Text textAlign={'center'} fontSize={"1.5rem"}>Adicione seu primeiro item</Text>
                        }           
                    </UnorderedList>
                    <Modal isOpen={isOpen} onClose={closeModal} onSave={handleSave} title={action}>
                        <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>    
                            <Input placeholder='Nome do item' id="name_item" label="Nome do Item" value={editableItem['name_item']} onChange={handleChange}/>
                            <Input placeholder='Link para o item' id="url" label="Link" value={editableItem['url']} onChange={handleChange}/>
                        </Box>
                    </Modal>
                </Box>}
            </Box>
        </>
    )
}

export default SpecificList


SpecificList.getLayout = function getLayout(page: ReactElement)  {
    return (
    <ListProvider>     
        <ListChangesProvider>
        {/* O Provider tem que estar acima do layout para que assim seus filhos possam fazer uso do provider.*/}
        <Layout pl={{ base: "2rem", md: "2rem", lg: navigationMenuDistance }} pr={0} w={"calc(100% - 2rem)"} pb={'5rem'}>
            {page} 
        </Layout>
        </ListChangesProvider>
    </ListProvider>)
}

SpecificList.auth = true;