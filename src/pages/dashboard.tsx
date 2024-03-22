import { Layout } from "./_layout";
import { SimpleGrid, Text} from "@chakra-ui/react";
import { ListProvider, useLists } from "@/contexts/list";
import type {NextPageWithLayout} from './_app';
import { ReactElement } from "react";
import { BoxDashboard } from "@/components/BoxDashboard";
import { useSession } from "next-auth/react";
import Head from 'next/head'

export const navigationMenuDistance = "17rem"
export const headerDistance = "7.25rem"

const Dashboard:NextPageWithLayout = () => {
  const {lists} = useLists();
  const {data: session} = useSession()

  return(
    <>
      <Head>
        <title>Dashboard</title>
      </Head>    
      <SimpleGrid columns={2} spacing={10} minChildWidth={{lg:'400px',"2xl":"40%"}} w={"100%"} mx={"auto"}>
        <BoxDashboard title="Total de amigos" total={session?.totalFriends || 0}/>
        <BoxDashboard title="Total de listas" total={lists?.length}/>
        <BoxDashboard title="Listas compartilhadas" total={session?.listsSharedTotal || 0}/>
        {/* <BoxDashboard title="Convites pendentes" total={11}/> */}
      </SimpleGrid>
    </>
  )
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <ListProvider>
      <Layout pl={{ base: "2rem", md: "2rem", lg: navigationMenuDistance }} pr={0} w={"calc(100% - 2rem)"} wrap={"wrap"}>
        {page} 
      </Layout>
    </ListProvider>
  )
}
/*
  Vamos colocar esse atributo auth para dizermos que a pagina é privada. 
*/
Dashboard.auth = true;


export default Dashboard;

