import { ReactNode, createContext, useContext, useEffect } from "react";
import { ListProvider } from "../list";
import { IItem } from "@/components/ItemList/Item";
import { EditableItem } from "@/pages/lists/view/[id]";
import { useAxios } from "@/hooks/useAxios";
import { useRouter } from "next/router";
import { useAxiosMutate } from "@/hooks/useAxiosMutate";
import { useNotify } from "../notify";
import { useSession } from "next-auth/react";
import { useQuery } from "@/hooks/useQuery";
import { api } from "@/services/axios";

export interface IList {
    name: string;
    itens: IItem[];
    id:string;
    isShared: boolean;
}

interface IListItemProps {
    children: ReactNode
}
interface IListChangesResponse  {
    list:IList, 
    renameList: (newName: string) => Promise<void>, 
    excludeItem: (id: string)=> Promise<void>, 
    isLoading: boolean,
    saveItem: (editableItem: EditableItem) => Promise<void>
}

const ListChangesContext = createContext({} as IListChangesResponse);

export const ListChangesProvider = ({children}:IListItemProps) => {
    const { request } = useAxios({});
    const router = useRouter();
    const {requestMutate, queryClient} = useAxiosMutate()
    const {data: session} = useSession();
    const {totalNotifications} = useNotify()

    const {data:list, isLoading} = useQuery<IList>({queryKey: ['list',`${router.query.id}`], queryFn: async () => {
        const list = (await (api.get(`lists/${router.query.id}/`, {headers: {Authorization: `Bearer ${session?.accessToken}`}}))).data;
        return {...list, isShared: router.query.isShared ? true: false};
    },
    enabled: session?.accessToken !== undefined && (router.query.id as string) !== '',
    })
    
    const renameList = async (newName: string) => {
        const {error} = await requestMutate({url: `/lists/${list.id}`, method: 'patch',body: {
            new_name: newName
        }})
        if(!error) list.name = newName
    }
    const excludeItem = async (id:string) => {
        await request({url: `lists/${list.id}/item/${id}`, method:"delete"})
        const updatedItens =  list.itens.filter((item) => !(item.id === id));
        list.itens = [...updatedItens];
    }
    const saveItem = async (editableItem: EditableItem) => {
        let item: IItem | undefined;
        if(editableItem.id){
            item = list.itens.find(item => item.id === editableItem.id) as IItem;
            item.name = editableItem.name_item;
            item.url = editableItem.url;

            await request({url:`lists/${list.id}/item/${item.id}`, method: 'patch', body: {
                name: editableItem.name_item,
                link: editableItem.url
            }})
        }
        else {
            const id = await request({url:`lists/${list.id}/item/add`, method: 'post', body: {
                name: editableItem.name_item,
                link: editableItem.url
            }});
            list.itens = [...list.itens, {...editableItem, id:id, name: editableItem.name_item}]
        }
    }

    useEffect(() => {
        queryClient.invalidateQueries({queryKey:['list',`${router.query.id}`]})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[totalNotifications])

    return (
        <ListChangesContext.Provider value={{list, renameList, excludeItem, isLoading, saveItem}}>
            {children} 
        </ListChangesContext.Provider>
        
    )
}
export const useListChanges = () => useContext(ListChangesContext)
