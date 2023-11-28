import * as Chakra from '@chakra-ui/react'
import { ReactElement } from 'react'

type UpscaleProps = {
    icon: ReactElement
} & Chakra.IconButtonProps

const UpscaleButton = ({icon,_hover, ...rest}:UpscaleProps) => {
    return (
        <Chakra.IconButton _hover={{transform:'scale(1.1);',bg:"teal.400",..._hover}} icon={icon} {...rest}/>
    )
}
export {UpscaleButton}