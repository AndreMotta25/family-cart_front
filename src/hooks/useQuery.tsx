import { useToast } from '@chakra-ui/react';
import {UseQueryOptions, useQueryClient, useQuery as useQueryHook} from '@tanstack/react-query';
import axios from 'axios';
import { signOut } from 'next-auth/react';
import router from 'next/router';
import { useEffect, useState } from 'react';

const useQuery = <T,>(queryOptions: UseQueryOptions) => {
    const query = useQueryHook({...queryOptions})
    const toast = useToast();
    const queryClient = useQueryClient()
    const [cacheData, setCacheData] = useState<T>();

    useEffect(() => {
        if(axios.isAxiosError(query.error)) {
            if(query.error.response?.status === 404) router.push('/dashboard');
            else if(query.error.response?.status === 401) signOut({callbackUrl:'/'});
            else {
                toast({
                    title: "Erro",
                    description: `${query.error.response?.data.message}`,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position:"top-right"
                })
            }
        }
        
    },[query.isError, toast, query])

    useEffect(() => {
        const cacheData = queryClient.getQueryData<T>(queryOptions.queryKey);
        setCacheData(cacheData);
    }, [queryOptions, queryClient, queryClient.setQueryData])



    return {...query, data: query.data as T, cacheData: cacheData, setData: (key: string, data: any) => queryClient.setQueryData([key], data)}
}

export {useQuery}

