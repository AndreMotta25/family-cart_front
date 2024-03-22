import React from 'react'
import {Notification} from './Notification/'
import {Flex, Text } from '@chakra-ui/react'
import {CheckIcon} from '@chakra-ui/icons'
import { useAxios } from '@/hooks/useAxios'
import { INotification, useNotify } from '@/contexts/notify'

interface IWarningNotification {
  notification: INotification;
}

const WarningNotification = ({notification}:IWarningNotification) => {
  const { request } = useAxios({})
  const {cache, setData,decrementNotification} = useNotify();
  
  const handleClick = async () => {
    await request({url: `${notification.action.accept}`,method: 'patch'});

    const not = cache?.find((elem) => notification.notification_id === elem.notification_id) || null;
    if(not) {
      not.isRead = true;
      setData("notifications",[...cache])
      decrementNotification();
    }
  }
  return (
    <Notification.Root isRead={notification.isRead}>
      <Notification.Date date={notification.created_at}/>
      <Notification.Content>
        <Flex align={"center"}> 
          <Notification.Avatar name={notification.emitter.name} src={notification.emitter.avatar}/>
          <Text>{notification.message}</Text>
        </Flex>
        {!notification.isRead &&<Notification.Action>
            <Notification.Button bg={"teal.200"} onClick={handleClick}>
              <CheckIcon/>
            </Notification.Button>
        </Notification.Action>}
      </Notification.Content>
    </Notification.Root>
  )
}

export default WarningNotification