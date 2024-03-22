import { api } from "@/services/axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback, useEffect, useRef, useState } from "react"
import {useRouter} from 'next/router';
import { useSession } from "next-auth/react";
import { useToast } from "@chakra-ui/react";
import {signOut} from 'next-auth/react';

interface IUseFecth {
    url: string;
    method: "get" | "post" | 'delete' | "put" | "patch";
    config?: AxiosRequestConfig<any>
    body?: any;
}
interface IUseAxios {
    redirectOnError?: () => void
}
// deprecated
const useAxios = <T,>({redirectOnError}:IUseAxios) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<T>({} as T);
    const {data: session} = useSession();
    const toast = useToast();
    const [error, setError] = useState(false); 
    
    const request = useCallback(async ({url, method, config, body}:IUseFecth) => {
        try {
            setError(false);
            setIsLoading(true);
            let data;
            let response: AxiosResponse; 
            if(method === 'post' || method === 'patch' || method === 'put')  {
                response =  (await api[method](url,body ,{headers: {Authorization:"Bearer " + session?.accessToken}, ...config}))
                data = await response.data;
            }
            else {
                response = await api[method](url,{headers: {Authorization:"Bearer " + session?.accessToken}, ...config});
                data = await response.data;
            }
            setData(data);
            return data;
        }
        catch(e:any) {
            if(e?.response?.status === 404) router.push('/dashboard');
            else if(e?.response?.status === 401) signOut({callbackUrl:'/'});
            else if(redirectOnError) redirectOnError();
            else {
                setError(true)
                toast({
                    title: "Erro",
                    description: `${e.response.data.message}`,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position:"top-right"
                  })
            }
        }
        finally {
            setIsLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[session])

    return {isLoading, data, setData, request, error }
}

export {useAxios}

/*


    Poderia dividir esse hook em dois. Basicamente um hook para receber o body e o outro não.
*/ 