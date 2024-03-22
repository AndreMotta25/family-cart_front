import { Box, CircularProgress} from "@chakra-ui/react";
import { SlideItem } from "@/components/SlideMobile/SlideItem";
import List from "@/components/List/List";
import SlideAxis from "@/components/SlideMobile/SlideAxis";
import { ListProvider, useLists } from "@/contexts/list";
import { ReactElement, useState } from "react";
import { NextPageWithLayout } from "../_app";
import { Layout } from "../_layout";
import Head from "next/head";

export const navigationMenuDistance = "17rem"
export const headerDistance = "7.25rem"

const Lists:NextPageWithLayout = () => {
  const {lists, sharedLists, isLoading, loadingSharedLists} = useLists();
  
  return (
    <>
      <Head>
        <title>Listas</title>
      </Head>
      <Box flex={1} minHeight={`calc(100vh - ${headerDistance})`}
        position={"relative"}
        overflow={"hidden"} // A onde fica esse overflow é muito importante.
        as="main"
      >
        <Box borderBottom={"2px"} mb={"2rem"}>    
          <SlideAxis title="Suas Listas" pb={'1rem'} pl={0}>
            {isLoading && <CircularProgress isIndeterminate value={80} height={'200px'} alignItems={"center"} display={"flex"}/>}
            {!isLoading && lists.map((list => (
              <SlideItem key={list.id}>
                <List details={list}/>
              </SlideItem>
            )))}
          </SlideAxis>
        </Box>
        {!loadingSharedLists && Array.isArray(sharedLists) && sharedLists.length > 0 && 
        <Box borderBottom={"2px"} mb={"2rem"}>    
          <SlideAxis title="Listas Compartilhadas" pb={'1rem'} pl={0}>
            {loadingSharedLists && <CircularProgress isIndeterminate value={80} height={'200px'} alignItems={"center"} display={"flex"}/>}
            {!loadingSharedLists && sharedLists.map((list => (
              <SlideItem key={list.id}>
                <List details={list}/>
              </SlideItem>
            )))}
          </SlideAxis>
        </Box>}
      </Box>
    </>
  );
 
};

Lists.getLayout = function getLayout(page: ReactElement) {
  return (
    // O provider vai poder ser reutilizado em outros lugares, mas ainda vamos manter seus estados. 
    // A unica forma de usarmos estados nessa função getLayout é usando em seus filhos.
    <ListProvider>
      {/* O Provider tem que estar  acima do layout para que assim seus filhos possam fazer uso do provider.*/}
      <Layout pl={{ base: "2rem", md: "2rem", lg: navigationMenuDistance }} pr={0} w={"calc(100% - 2rem)"} >
        {page} 
      </Layout>
    </ListProvider>
  )
}
/*
  Vamos colocar esse atributo auth para dizermos que a pagina é privada. 
*/
Lists.auth = true;


export default Lists;
