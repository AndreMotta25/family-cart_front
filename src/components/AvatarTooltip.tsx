import React, { ReactNode } from 'react'
import { Tooltip } from './Tooltip'
import { Avatar, AvatarProps, forwardRef, TooltipProps } from '@chakra-ui/react';

interface IAvatarTooltipProps  extends AvatarProps {
    children?: ReactNode
    tooltipProps?: Omit<TooltipProps, "children"> ;
}

const AvatarTooltip = forwardRef<IAvatarTooltipProps, 'span'>(({children,tooltipProps,...rest},ref) =>  {
  return (
    <Tooltip {...tooltipProps}>
        <Avatar {...rest}>
            {children}
        </Avatar>
    </Tooltip>
  )
})

export {AvatarTooltip}