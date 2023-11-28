import * as Chakra from '@chakra-ui/react'
import Action from '../Header/Action'
import TrashIcon from '../Icons/TrashIcon/TrashIcon'
import { UpscaleButton } from '../UpscaleButton'

type TrashButtonProps = Chakra.IconButtonProps & { 
    colorIcon?: string    
}
const TrashButton = ({colorIcon,_hover, ...rest}:TrashButtonProps) => {
        return (<UpscaleButton _hover={{bg:'red.500', ..._hover}} icon={<TrashIcon boxSize={"1.5rem"} color={colorIcon}/>} {...rest}/>)
}
export {TrashButton}
