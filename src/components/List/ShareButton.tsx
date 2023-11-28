import * as Chakra from '@chakra-ui/react'
import { ShareIcon } from '../Icons/Share/ShareIcon'
import { UpscaleButton } from '../UpscaleButton'


type ShareButtonProps = Chakra.IconButtonProps & { 
    colorIcon: string    
}

const ShareButton = ({colorIcon,...rest}:ShareButtonProps) => { 
    return (<UpscaleButton icon={<ShareIcon boxSize={"1.5rem"} color={colorIcon}/>} {...rest}/>)
}
export {ShareButton}
