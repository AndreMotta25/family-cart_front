import * as Chakra from '@chakra-ui/react'
import {capitalize} from '../utils/capitalize'
import { ForwardRefRenderFunction, forwardRef } from 'react';
import {UseControllerProps, useController} from 'react-hook-form'

export type IInputProps =  {
    id: string;
    error?: string;
    label: string;
    disabled?: boolean
} & Chakra.InputProps


const InputBase:ForwardRefRenderFunction<HTMLInputElement, IInputProps> = ({id,label, error, ...rest}, ref) => {
    return (
    <Chakra.FormControl isInvalid={error ? true: false}>
        <Chakra.FormLabel htmlFor={id}>{capitalize(label)}</Chakra.FormLabel>
        <Chakra.Input id={id} {...rest} ref={ref}/>
        {error && <Chakra.FormErrorMessage>{error}</Chakra.FormErrorMessage>}
    </Chakra.FormControl>
    )
}

const Input = forwardRef(InputBase)
export {Input}