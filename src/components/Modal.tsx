import * as Chakra from '@chakra-ui/react'
import {ModalProps} from '@chakra-ui/react'
import { FormEvent } from 'react';

type IModalProps = ModalProps & {
    title:string;
    onSave: (e:FormEvent<HTMLElement>) => void;
    conclusionButtonLabel?:string;
    as?: Chakra.As
} 
const Modal = ({children,title, as = 'form', onClose, onSave ,conclusionButtonLabel, ...rest}:IModalProps) => {
    return (
        <Chakra.Modal onClose={onClose}  {...rest}>
            <Chakra.ModalOverlay/>
            <Chakra.ModalContent as={as?as:'form'} onSubmit={onSave}>
                <Chakra.ModalHeader>
                    {title}
                </Chakra.ModalHeader>

                <Chakra.ModalCloseButton/>
                <Chakra.ModalBody>
                    {children}
                </Chakra.ModalBody>
                <Chakra.ModalFooter>
                    {as === "form" &&
                    <Chakra.Button colorScheme='blue' type='submit' mr={3}>
                        {conclusionButtonLabel ? conclusionButtonLabel : 'Save'}            
                    </Chakra.Button>}
                    <Chakra.Button onClick={onClose}>Cancel</Chakra.Button>
                </Chakra.ModalFooter>
            </Chakra.ModalContent>
        </Chakra.Modal>
    )
}

export {Modal}