import { GridItem, AvatarProps, Spinner } from "@chakra-ui/react";
import { ShareButton } from "../List/ShareButton";
import { Avatar } from "./Avatar";
import { CancelShareButton } from "./CancelShareButton";
import { Tooltip } from "../Tooltip";
import { useEffect, useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import { api } from "@/services/axios";
import { useSession } from "next-auth/react";
import { useLists } from "@/contexts/list";


type ShareToProps = {
  id: string;
  list_id: string;
} & AvatarProps;

const ShareTo = ({name,src, id, list_id, ...rest}:ShareToProps) => {
    const [shared, setShared] = useState(false);
    const [menuEnable, setMenuEnable] = useState(false);
    const {data: session} = useSession();
    const {shareList, cancelSharing} = useLists();

    const {isLoading} = useQuery({queryKey: ['friend',list_id, id], queryFn: async () => {
      const result =  (await api.get(`lists/${list_id}/friends/${id}/alreadyShared`,{headers: {Authorization: `Bearer ${session?.accessToken}`}})).data as boolean;
      setShared(result);
      return result
    }
    ,enabled:(menuEnable && !!list_id && !!id),retry:0})

    const handleClick = () => setMenuEnable((v) => !v);

    
    return (
      <GridItem position={'relative'} alignItems={'center'} justifyItems={"center"} display={"grid"}  
      >
        { 
          <Avatar cursor={"pointer"} label={name} name={name} src={src} onClick={handleClick} {...rest}>
              {isLoading  && <Spinner my={0} mx={"auto"} size={"0.8rem"} color="black"/>}
              {!isLoading && menuEnable && !shared &&  <ShareButton onClick={() =>  shareList({id_list: list_id,id_friend: id})}  aria-label='share list' size={'0.8rem'} p={"0.2rem"} position={'absolute'} bg={"white"} color={"inherit"} _hover={{color:"white"}} zIndex={99}/>}
              {!isLoading && menuEnable && shared &&  <CancelShareButton onClick={() => cancelSharing({id_friend: id,id_list: list_id})}  size={'0.8rem'} p={"0.2rem"} position={'absolute'} bg={"white"} color={"inherit"} _hover={{color:"white"}} zIndex={99}/>}
          </Avatar>
        }
      </GridItem>
    )
  }
export {ShareTo}

// No contexto do usuario vamos ter que ter uma parte para amigos.