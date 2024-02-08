import { Flex, FlexProps } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface INotificationContentProps extends FlexProps  {
    children: ReactNode;
}

function NotificationContent({children, ...rest}:INotificationContentProps) {
  return (
    <Flex alignItems={'center'} w={"100%"} gap={"0.5rem"} wrap={"wrap"} {...rest}>
        {children}
    </Flex>
  )
}

export default NotificationContent