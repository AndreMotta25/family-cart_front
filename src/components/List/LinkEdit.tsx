import {LinkProps} from '@chakra-ui/react'
import { EditIcon } from '../Icons/EditIcon'
import { UpscaleLink } from '../UpscaleLink'

const EditLink = ({...rest}: LinkProps) => {
    return (
        <UpscaleLink tooltip='Editar' {...rest} bg={"gray.800"}>
            <EditIcon boxSize={"1.5rem"} color={"white"}/>
        </UpscaleLink>
    )
}
export {EditLink}