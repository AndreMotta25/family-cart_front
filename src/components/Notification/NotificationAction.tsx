import { Flex } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface INotificationAction {
    children: ReactNode
}

function NotificationAction({children}:INotificationAction) {
  return (
    <Flex marginLeft={"auto"} gap={'1rem'}>
        {children}
    </Flex>
  )
}

export default NotificationAction