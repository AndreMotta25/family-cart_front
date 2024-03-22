import React  from 'react'
import { Notification } from './Notification'
import { Flex, Text } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useAxios } from '@/hooks/useAxios';
import { INotification, useNotify } from '@/contexts/notify';

interface IActionNotification {
    notification: INotification;
}

const ActionNotification = ({notification}:IActionNotification) => {
    const {request,error} = useAxios({});
    const {cache, setData,decrementNotification} = useNotify();

    const handleClickAccept = async () => {
        const data = await request({url:notification.action.accept, method:'post',body: {
            owner:notification.emitter.id, // acho que não precisa estar aqui.
            notification_id: notification.notification_id
        }}) 
        if(!error) {
            const not = cache?.find((elem) => notification.notification_id === elem.notification_id) || null;
            if(not) {
                not.isRead = true;
                not.message = data
                setData("notifications",[...cache])
                decrementNotification();
            }
        }
    }
    const handleClickDenied = async () => {
        // acho que vou tirar o owner_id daqui.
        await request({url:`${notification.action.reject}?notification_id=${notification.notification_id}`, method:'delete'}) 
        decrementNotification();
    }

    return (
    <Notification.Root isRead={notification.isRead}>
      <Notification.Date date={notification.created_at}/>
      <Notification.Content>
        <Flex align={"center"}> 
          <Notification.Avatar name={notification.emitter.name} src={notification.emitter.avatar}/>
          <Text>{notification.message}</Text>
        </Flex>
        {!notification.isRead &&
        <Notification.Action>
            <Notification.Button bg={"teal.200"} onClick={handleClickAccept}>
                <CheckIcon/>
            </Notification.Button>
            <Notification.Button bg={"red.300"} onClick={handleClickDenied}>
                <CloseIcon/>
            </Notification.Button>
        </Notification.Action>}
      </Notification.Content>
    </Notification.Root>
  )
}

export {ActionNotification}