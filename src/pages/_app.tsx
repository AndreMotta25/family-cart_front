import type { AppProps } from 'next/app'
import {ChakraProvider, useDisclosure} from '@chakra-ui/react'
import {theme} from '../styles/theme'
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { NextPage } from 'next';
import {SessionProvider, signOut, useSession} from 'next-auth/react'
import { useRouter } from 'next/router';
import { Auth } from '@/components/Auth';
import { NotifyProvider } from '@/contexts/notify';
import ModalShare from '@/components/ModalShare';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  auth?: boolean;
}
 
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


// if (process.env.NODE_ENV === 'development') {
//   if(typeof window === 'undefined') {
//     const {workerServer} = require('../services/msws/server')
//     workerServer.listen();
//   }
//   else {
//     const { worker } = require('../services/msws/index')
//     worker.start();
//   }
// }

const queryClient = new QueryClient();

const App = ({ Component, pageProps}: AppPropsWithLayout) => {
    const getLayout = Component.getLayout || ((page) => page);    

    return (
            <SessionProvider session={pageProps.session}>
              {Component.auth ? 
              <ChakraProvider theme={theme}>
                <Auth>
                    <QueryClientProvider client={queryClient}>
                      <NotifyProvider>
                        {getLayout(<Component {...pageProps}/>)}
                      </NotifyProvider>
                    </QueryClientProvider>
                </Auth>
              </ChakraProvider>
              : 
              <ChakraProvider theme={theme}>
                {getLayout(<Component {...pageProps} />)}
              </ChakraProvider>}
            </SessionProvider>          
      )
     
}

export default App ;

