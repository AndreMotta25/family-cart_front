import { ReactElement } from "react"
import { NextPageWithLayout } from "./_app"
import  Layout  from "./_layout"
import { navigationMenuDistance } from "./dashboard"
import { Flex, Spinner } from "@chakra-ui/react";
import { ListProvider } from "@/contexts/list";
import WarningNotification from "@/components/WarningNotification";
import { ActionNotification } from "@/components/ActionNotification";
import { useNotify } from "@/contexts/notify";
import ResponsiveShortText from "@/components/ResponsiveShortText";
import Head from "next/head";




const Notifications:NextPageWithLayout = () => {
    const {notifications, isLoading} = useNotify();
    return (
        <>
            <Head>
                <title>Notificações</title>
            </Head>    
            <Flex gap={"1rem"} pt={"1rem"} flexDirection={"column"} w={"100%"} alignItems={"center"} as={"main"}>
                {isLoading && <Spinner mx={"auto"} width={'50px'} height={"50px"} color="white"/>}
                {!isLoading && Array.isArray(notifications) &&  notifications.map((notification) => {
                    if(notification.type === 'warning') {
                        return <WarningNotification  notification={notification} key={notification.notification_id}/> 
                    }
                    else if(notification.type === 'action') {
                        return <ActionNotification  notification={notification} key={notification.notification_id}/> 
                    }

                })}
                {!isLoading && Array.isArray(notifications) && notifications.length <= 0 && 
                <Flex width={"100%"} height={"50vh"} align={"center"} justify={"center"}>
                    <ResponsiveShortText color={"white"}>
                        Voce não tem notificaçoes
                    </ResponsiveShortText>
                </Flex>}
            </Flex>
        </>
    )
}

export default Notifications


Notifications.getLayout = function getLayout(page: ReactElement) {
    return (
        // Esse provider tem que ficar aqui porque senão dá um bug na segunda vez quando volta pra dashboard, sumindo
        // todos os itens.
        <ListProvider> 
            <Layout pl={{ base: "2rem", md: "2rem", lg: navigationMenuDistance }} pr={0} w={"calc(100% - 2rem)"} >
            {page} 
            </Layout>
        </ListProvider>
    )
  }

Notifications.auth = true;