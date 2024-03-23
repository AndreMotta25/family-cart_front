import * as Chakra from '@chakra-ui/react'
import { ShareIcon } from '../Icons/ShareIcon'
import { UpscaleButton } from '../UpscaleButton'


type ShareButtonProps = Chakra.IconButtonProps & { 
    colorIcon?: string;
}

const ShareButton = ({colorIcon,_hover,...rest}:ShareButtonProps) => { 
    return (<UpscaleButton tooltip='Compatilhar' icon={<ShareIcon boxSize={"1.5rem"} color={colorIcon}/>} _hover={_hover} {...rest}/>)
}
export {ShareButton}
