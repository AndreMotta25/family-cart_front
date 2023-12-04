import * as Chakra from '@chakra-ui/react'
import { EditIcon } from '../Icons/EditIcon'
import { UpscaleButton } from '../UpscaleButton'

type EditButtonProps = Chakra.IconButtonProps & { 
    colorIcon?: string
}
const EditButton = ({colorIcon, _hover,...rest}:EditButtonProps) => { 
        return (
            <UpscaleButton tooltip={"Editar"} _hover={{..._hover}} icon={<EditIcon boxSize={"1.5rem"} color={colorIcon}/>} {...rest}/>
        )
}
export {EditButton}