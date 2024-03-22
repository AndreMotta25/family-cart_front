import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { useAxiosError } from "./utils/useAxiosError";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/axios";

interface IUseAxiosDelete {
    url: string
}
const useAxiosDelete = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {data: session} = useSession();
    const [error, setError] = useState(false); 
    const {isAxiosError} = useAxiosError();
    const queryClient = useQueryClient();

    const requestDelete = useCallback(async ({url}:IUseAxiosDelete) => {
        try {
            setError(false);
            setIsLoading(true);
            
            const response =  (await api.delete(url,{headers: {Authorization: `Bearer ${session?.accessToken}`}}))
            return {status: response.status, error: false};
        }
        catch(e:any) {
            setError(true);
            const isErrorAxios = isAxiosError(e);
            if(isErrorAxios) {
                return {status: e.response.status, error: true};
            }
            return {status: 400, error: true};
        }
        finally {
            setIsLoading(false);
        }
    },[session, isAxiosError])

    return {isLoading, requestDelete, error, queryClient: queryClient}
}

export {useAxiosDelete}