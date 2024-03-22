import { api } from "@/services/axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react"
import { useSession } from "next-auth/react";
import {useAxiosError} from './utils/useAxiosError'
import { useQueryClient } from "@tanstack/react-query";

interface IUseFecth {
    url: string;
    method: "post" | "put" | "patch";
    config?: AxiosRequestConfig<any>
    body?: any;
}

const useAxiosMutate = <T,>() => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<T>();
    const {data: session} = useSession();
    const [error, setError] = useState(false); 
    const {isAxiosError} = useAxiosError();
    const queryClient = useQueryClient();

    const requestMutate = useCallback(async ({url, method, config, body}:IUseFecth) => {
        try {
            setError(false);
            setIsLoading(true);
            
            const response =  (await api[method](url,body ,{headers: {Authorization:"Bearer " + session?.accessToken}, ...config}))
            const data = await response.data;
                
            setData(data);
            return {data, status: response.status, error: false};
        }
        catch(e:any) {
            setError(true);
            const isErrorAxios = isAxiosError(e);
            if(isErrorAxios) {
                return {data:null, status: e.response.status, error: true};
            }
            return {data:null, status: 400, error: true};
        }
        finally {
            setIsLoading(false);
        }
    },[session, isAxiosError])

    return {isLoading, data, setData, requestMutate, error, queryClient: queryClient}
}

export {useAxiosMutate}
