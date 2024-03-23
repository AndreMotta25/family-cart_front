import * as Chakra from '@chakra-ui/react'
import { ReactElement, ReactNode } from 'react'
import { Tooltip } from './Tooltip'
import { Button } from '@chakra-ui/react'
import { dm_serif_display } from '@/fonts'

export type UpscaleProps = {
    icon?: ReactElement,
    tooltip?: string,
    text?:string,
    children?: ReactNode
} & Chakra.IconButtonProps

const UpscaleButton = ({children,icon,text,tooltip,_hover, ...rest}:UpscaleProps) => {
    if(!text && icon) {
        return (
            <Tooltip label={tooltip}>
                <Chakra.IconButton _hover={{transform:'scale(1.1);',bg:"teal.400",..._hover}} icon={icon} {...rest}/>
            </Tooltip>
        )
    }
    else if(text && icon) {
        return (
            <Tooltip label={tooltip} >
                <Button className={dm_serif_display.className} rightIcon={icon} _hover={{transform:'scale(1.1);',bg:"teal.400",..._hover}} icon={icon} {...rest}>{text}</Button>
            </Tooltip>
        )
    }
    else { // só com texto
        return (
            <Tooltip label={tooltip}>
                <Button className={dm_serif_display.className} _hover={{transform:'scale(1.1);',bg:"teal.400",..._hover}} {...rest}>{children}</Button>
            </Tooltip>
        )
    }
}
export {UpscaleButton}