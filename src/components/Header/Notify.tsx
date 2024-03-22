import { BellIcon } from "@chakra-ui/icons"
import LayoutIcon from "../Icons/LayoutIcon"
import { UpscaleLink } from "../UpscaleLink"
import { Text, HStack, useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import EventSource from "eventsource"; 
import { useNotify } from "@/contexts/notify";

const Notify = () => {
    const {data: session, update} = useSession();
    const sse = useRef<EventSource | null>(null);
    const toast = useToast();
    const {incrementNotification, totalNotifications} = useNotify()
    
    const createSsEvent =  useCallback(() => {
        sse.current = new EventSource(`http://localhost:3333/notifications/realtime_notifications/`,{
                                                headers:{Authorization:`Bearer ${session?.accessToken}`}
                                            });                             
        if(sse.current && session?.accessToken) {
            sse.current.onmessage = (e) => {
              const {message, isNew} = JSON.parse(e.data);
              toast({description:message,duration: 2000,isClosable:true,position:'top-right', status:"info", title:"Nova Notificação"})
              incrementNotification();
            }
            sse.current.onerror = (error) => {
              if('message' in error && error.message === "Failed to fetch") {
                sse.current?.close();
              }
              else if('message' in error && error.message === "Unauthorized"){
                signOut({callbackUrl:'/'});
              }
            }
        }
      },[session, toast, incrementNotification])
    
      useEffect(() => {
          if(!sse.current?.OPEN && session && session.accessToken !== "") {
            createSsEvent();
          }
      },[session, createSsEvent])

    return (
        <UpscaleLink tooltip="Ver Notificaçoes" href="/notifications" position={'relative'} bg={'transparent'} _hover={{bg:"whiteAlpha.900"}} w={"60px"} height={"40px"}>
          <LayoutIcon icon={BellIcon}/>
          <Text
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            p={"0.2rem"}
            fontSize={"0.8rem"}
            borderRadius={"full"}
            bg={"red.300"}
            position={"absolute"}
            top={0}
            left={7}
            fontWeight={"bold"}
          >
            {(session && totalNotifications < 99) ? totalNotifications : "99+"} 
          </Text>
      </UpscaleLink>)
}
export {Notify}