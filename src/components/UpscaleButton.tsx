import * as Chakra from '@chakra-ui/react'
import { ReactElement } from 'react'
import { Tooltip } from './Tooltip'

export type UpscaleProps = {
    icon: ReactElement,
    tooltip?: string,
} & Chakra.IconButtonProps

const UpscaleButton = ({icon,tooltip,_hover, ...rest}:UpscaleProps) => {
    return (
        <Tooltip label={tooltip}>
            <Chakra.IconButton _hover={{transform:'scale(1.1);',bg:"teal.400",..._hover}} icon={icon} {...rest}/>
        </Tooltip>
    )
}
export {UpscaleButton}