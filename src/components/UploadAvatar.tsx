import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { Avatar } from "./ModalShare/Avatar"
import { EditIcon } from "./Icons/EditIcon"
import { useSession } from "next-auth/react";
import { ChangeEvent } from "react";
import { useAxiosMutate } from "@/hooks/useAxiosMutate";
import { useToast } from "@/hooks/useToast";

const UploadAvatar = () => {
    const {data: session,update} = useSession();
    const {requestMutate} = useAxiosMutate();
    const {toast} = useToast()

    const upload = async (e: ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();

        if(e.target.files && e.target.files?.length > 0 ) {
            const file = e.target.files[0];

            formData.append('avatar', file);

            const {error} =await requestMutate({url: 'user/upload_avatar',method: 'patch', body: formData, 
                        config: {headers: {'Content-Type': 'multipart/form-data', Authorization: "Bearer " + session?.accessToken}}})
            if(!error) {
                toast({
                    title:"Update da foto",
                    description: "Foto atualizada com sucesso.",
                    status: 'success'
                })          
            }  
            update();
        }
    }

    return(
        <>
            <Avatar mx={"auto"} position={'relative'} my={0} display={"flex"} name={session?.user.name} _hover={{"div[role=img]":{display:'none'},"#upload_file":{display: 'flex !important', zIndex:9999, color: 'white'}}}>
                <form>
                    <FormControl position={"relative"} w={"100%"} height={"100%"}>
                        <FormLabel cursor={"pointer"} display={"none"} alignItems={"center"} position={"absolute"} justifyContent={"center"} id="upload_file" _hover={{color:"black"}} height={"100%"} w={"100%"}>
                            <EditIcon boxSize={"1.5rem"} />
                        </FormLabel>
                        <Input type="file" onChange={upload} display={'none'} accept='.jpeg,.png,.jpg' />
                    </FormControl>
                </form>
            </Avatar>
        </>
    )
}

export {UploadAvatar}