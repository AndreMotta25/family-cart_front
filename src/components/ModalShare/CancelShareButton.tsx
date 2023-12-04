import { CancelShareIcon } from "../Icons/CancelShareIcon"
import { UpscaleButton } from "../UpscaleButton"
import {ButtonProps} from '@chakra-ui/react'

type CancelShareButtonProps = {
    colorIcon?: string    
} & ButtonProps

const CancelShareButton = ({colorIcon, ...rest}:CancelShareButtonProps) => (
        <UpscaleButton tooltip="Cancelar Compartilhamento" icon={<CancelShareIcon color={colorIcon} w={"24px"} height={'24px'}/>} aria-label="cancel sharing" {...rest}/>
)

export {CancelShareButton}