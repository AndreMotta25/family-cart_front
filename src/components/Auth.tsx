import { Box, Flex, Spinner } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import {jwtDecode} from 'jwt-decode';

interface AuthProps {
    children: ReactNode;
}
interface IPayload {
  exp:number
}

const Auth = ({children}:AuthProps) => {
    const router = useRouter();

    const {data: session, status} = useSession(
        {
          required:true,
          onUnauthenticated() {
              router.push('/')
          },
        } 
    );
      
    useEffect(() => {
      let id: NodeJS.Timeout;

      const checkSession = () => {
        const payload = jwtDecode(session?.accessToken as string) as IPayload
        
        const dateExpire = new Date((payload.exp * 1000)).getTime();
        const dateNow = new Date().getTime();

        const timeToExpire = (dateExpire - dateNow);
        
        if(timeToExpire < 0) {
          signOut({callbackUrl:'/'});
        }

        id = setTimeout(async () => {
            signOut({callbackUrl:'/'});
        },timeToExpire)
      }
      if(session?.accessToken) checkSession();

      return () => clearTimeout(id);
    },[session?.accessToken, router.pathname])
    
    if(status === 'loading') {
        return (
        <Flex w={"100%"} height={"100vh"} alignItems={"center"} bg={"gray.900"}>
            <Spinner mx={"auto"} width={'50px'} height={"50px"} color="white"/>
        </Flex>
      )
    }
    return children
  }

export {Auth}