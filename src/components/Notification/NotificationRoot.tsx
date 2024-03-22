import { Flex, FlexProps } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import {motion} from 'framer-motion'
import { keyframes } from '@emotion/react'

type INotificationRootProps = FlexProps & {
    children: ReactNode;
    isRead: boolean;
}

const animation = keyframes`
  from {
    background-color: #353434;
  }
  to {
    background-color: #2D3748;
  }
`;

export default function NotificationRoot({children, isRead, ...rest}:INotificationRootProps) {
  return (
    <Flex bg={"gray.800"} flexDirection={"column"} color={"white"} wrap={"wrap"} width={'100%'} maxW={"700px"} borderRadius={"15px"} as={motion.div} padding={'0.5rem'} pb={'1.5rem'} mx={"auto"} my={"0"} alignItems={"center"} animation={isRead ?`${animation} 0.3s ease-in-out forwards` : ''} {...rest} > 
        {children}
    </Flex>
  )
}
