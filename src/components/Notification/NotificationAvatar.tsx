import React from 'react'
import { AvatarTooltip } from '../AvatarTooltip'
import { Box } from '@chakra-ui/react'

interface INotificationAvatar {
    name: string,
    src?: string,
}
export default function NotificationAvatar({name,src}: INotificationAvatar) {
  return (
    <Box marginRight={"1rem"} marginTop={'0.4rem'}>
        <AvatarTooltip tooltipProps={{label:name}} src={src} name={name} boxSize={"4rem"} />
    </Box>
  )
}
