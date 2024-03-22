import { useQuery } from "@/hooks/useQuery";
import { api } from "@/services/axios";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface INotifyProviderProps {
    children: ReactNode
}
export interface IUser {
  id: string,
  name: string,
  email: string,
  avatar: string,
}
interface INotifyProviderResponse {
    totalNotifications: number;
    incrementNotification: () => void;
    decrementNotification: () => void;
    notifications: INotification[];
    isLoading: boolean;
    setData: (key: string, data: any) => void;
    cache: INotification[]
}
export interface INotification {
  type: string,
  entity_type: string,
  entity_id: string,
  message: string,
  notification_id: string,
  created_at: string,
  emitter: IUser,
  to: IUser
  action: {
    accept: string,
    reject: string,
  },
  isRead: boolean,
};


const NotifyContext = createContext<INotifyProviderResponse>({} as INotifyProviderResponse);

const NotifyProvider = ({children}: INotifyProviderProps) => {
  const [totalNotifications, setTotalNotifications] = useState(0);
  const {data: session, update} = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {data, isLoading, setData, cacheData} = useQuery<INotification[]>({queryKey: ['notifications'], queryFn: async () => {
        return (await (api.get('notifications/', {headers: {Authorization: `Bearer ${session?.accessToken}`}}))).data
    },
    enabled: session?.accessToken !== undefined && router.pathname === '/notifications',
  })
  const incrementNotification = () => {
    setTotalNotifications(notification => notification + 1);
  }  
  const decrementNotification = () => {
    setTotalNotifications(notification => notification - 1);
  }

  useEffect(() => {
    if(session?.totalNotifications) {
      setTotalNotifications(session?.totalNotifications);
    }
  },[session])
  
  useEffect(() => {
    queryClient.invalidateQueries({queryKey: ['notifications']})
  },[totalNotifications,queryClient])

  return (
  <NotifyContext.Provider value={{ setData: setData, cache: cacheData ?? [], notifications: data, isLoading, totalNotifications, incrementNotification, decrementNotification}}>
    {children}
  </NotifyContext.Provider>)
}

const useNotify = () => useContext(NotifyContext)

export {useNotify}
export {NotifyProvider}