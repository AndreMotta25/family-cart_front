import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { signOut } from "next-auth/react";
import router from "next/router";
import { useCallback } from "react";

const useAxiosError = () => {
    const toast = useToast();

    
    const isAxiosError = useCallback((error: any) => {
        if(axios.isAxiosError(error)) {
            if(error.response?.status === 401) signOut({callbackUrl:'/'});
            else {
                toast({
                    title: "Erro",
                    description: `${error.response?.data.message}`,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position:"top-right"
                })
            }
            return true
        }
    },[toast])

    return {isAxiosError}
}

export {useAxiosError}