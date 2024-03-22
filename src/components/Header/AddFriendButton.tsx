import { useAxiosMutate } from "@/hooks/useAxiosMutate";
import { useToast } from "@/hooks/useToast";
import { Flex, Spinner, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { UpscaleButton } from "../UpscaleButton";
import { Modal } from "../Modal";
import { Input } from "../Input";
import AddFriendIcon from "../Icons/AddFriendIcon";

const AddFriendButton = () => {
    const {isOpen, onClose, onOpen} = useDisclosure();
    const { requestMutate, isLoading } = useAxiosMutate();
    const [email, setEmail] = useState("");
    const {toast} = useToast()
    
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
    
        const {error} = await requestMutate({url:"invite/",method: 'post',body: {
          kin_email: email
        }})
    
        if(!error) {
          toast({
            title:"Convite enviado",
            status: "success",
            description:"Convite enviado"})
        }
        onClose();
    }
    return (
        <>
            <UpscaleButton onClick={onOpen} tooltip="Adicionar Amigo" aria-label="Add friend" _hover={{bg:"whiteAlpha.900"}} icon={<AddFriendIcon w={"44px"} height={"44px"}/>} bg={"transparent"} color={"teal.200"} px={"0.5rem"} position={"relative"}/>
      
            <Modal isOpen={isOpen} onClose={onClose} title="Adicionar amigo" onSave={handleSubmit} as={"form"}>
                <Input label="Email do amigo" id="email" type="email" onChange={(e) =>  setEmail(e.target.value)}/>
                {isLoading && 
                <Flex width={"100%"} alignItems={"center"} justifyContent={"center"}>
                    <Spinner my={0} mx={"auto"} width={'1rem'} height={"1rem"} color="black"/>
                </Flex>}
            </Modal>
        </>
    )
}

export {AddFriendButton}