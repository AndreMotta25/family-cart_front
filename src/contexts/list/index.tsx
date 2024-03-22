import { api } from "@/services/axios";
import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import {useRouter} from 'next/router';
import { useSession } from "next-auth/react";
import { useQuery } from "@/hooks/useQuery";
import { useDisclosure } from "@chakra-ui/react";
import ModalShare from "@/components/ModalShare";
import { useAxiosMutate } from "@/hooks/useAxiosMutate";
import { useToast } from "@/hooks/useToast";
import { useAxiosDelete } from "@/hooks/useAxiosDelete";
import { useNotify } from "../notify";

type ListProviderProps = {
    children: ReactNode
}
export interface IList {
    name: string;
    id: string;
    created_at: string;
    update_at: string;
    owner?: {
        name: string
    }
}

type ListProviderReturn = {
    addList: (list:IList) => void;
    remove: (id:string) => void;
    lists: IList[];
    isLoading: boolean;
    shareList: ({id_list,id_friend}:IShareListRequest) => Promise<void>
    selectList: (list_id: string) => void
    cancelSharing: ({id_friend,id_list}:ICancelSharingRequest) => Promise<void>
    sharedLists: IList[];
    loadingSharedLists: boolean;
}

interface IShareListRequest {
    id_list: string;
    id_friend: string;
}
interface ICancelSharingRequest extends IShareListRequest{}

const ListContext = createContext({} as ListProviderReturn);


const ListProvider = ({children}:ListProviderProps) => {
    const {requestMutate} = useAxiosMutate(); 
    const {requestDelete, queryClient} = useAxiosDelete();

    const router = useRouter();
    const {data: session} = useSession();
    const {isOpen: isOpenModalShare, onClose:closeModalShare, onOpen: openModalShare} = useDisclosure();
    const [selectedList, setSelectedList] = useState("");
    const {toast} = useToast();
    const {totalNotifications} = useNotify()


    const {data: lists, isLoading: loading} = useQuery<IList[]>({queryKey: ['lists'], queryFn: async () => {
        const lists = (await (api.get('/lists/', {headers: {Authorization: `Bearer ${session?.accessToken}`}}))).data as IList[]
        const orderedLists =  lists.map((list) => ({
            id: list.id, 
            name: list.name, 
            created_at: new Date(list.created_at).toDateString(), 
            update_at: new Date(list.update_at).toLocaleString("pt-BR")
        }));
        return orderedLists;
    },
        enabled: session?.accessToken !== undefined,
    })
    const {data: sharedLists, isLoading} = useQuery<IList[]>({queryKey: ['sharedLists'], queryFn: async () => {
        const lists = (await (api.get('/lists/sharedLists', {headers: {Authorization: `Bearer ${session?.accessToken}`}}))).data as IList[]
        const orderedLists =  lists.map((list) => ({
            id: list.id, 
            name: list.name, 
            created_at: new Date(list.created_at).toDateString(), 
            update_at: new Date(list.update_at).toLocaleString("pt-BR"),
            owner: list.owner && {
                name: list.owner.name
            }
        }));
        return orderedLists;
    },
        enabled: session?.accessToken !== undefined,
    })

    const selectList = (list_id: string) => {
        setSelectedList(list_id);
        openModalShare();
    }
    
    const add = () => {
    
    }
    
    const remove = async (id: string) => {
        const {error} = await requestDelete({url: `/lists/${id}`});
        if(!error) {
            queryClient.invalidateQueries({queryKey:["lists"]}) // acho que pode sair daqui
            toast({
                title: "Sucesso",
                description: `Lista excluida`,
                status: "success",
            })
        }
        if(router.pathname !== '/lists') router.push('/lists')
    }  

    const shareList =  useCallback(async ({id_list,id_friend}:IShareListRequest) => {
        const {error} = await requestMutate({url: `/lists/share_list/${id_list}`, method:"post", body: {
            friend: id_friend
        }})
        if(!error) {
            toast({
                title: "Sucesso",
                description: `Convite enviado`,
                status: "success",
            })
        }
    },[requestMutate, toast])

    const cancelSharing = async ({id_friend,id_list}:ICancelSharingRequest) => {
        const {error} = await requestDelete({url:`lists/${id_list}/friends/${id_friend}/cancelSharing`})
        if(!error) {
            toast({
                title: "Sucesso",
                description: `Compartilhamento cancelado`,
                status: "success",
            })
        }
    }

    useEffect(() => {
        queryClient.invalidateQueries({queryKey: ['sharedLists']})
    },[totalNotifications,queryClient])

    return (
        <ListContext.Provider value={{ sharedLists:sharedLists, loadingSharedLists: isLoading  ,selectList: selectList, addList: add, remove: remove, lists: lists, isLoading: loading, shareList: shareList, cancelSharing: cancelSharing}}>
            {children}
            <ModalShare closeModalShare={closeModalShare} isOpenModalShare={isOpenModalShare} id_list={selectedList}/>
        </ListContext.Provider>
    )
}


const useLists = () => useContext(ListContext);

export {useLists}
export {ListProvider}