import * as Chakra from '@chakra-ui/react';
import {ViewIcon,ViewOffIcon} from '@chakra-ui/icons'
import { Input } from "./Input"
import { useEffect, useState, MouseEvent, useRef } from 'react';

type IInputProps =  {
    error?: string;
    label?: string;
    m?: string;
} & Chakra.InputProps

const Password = ({value,label, m,...rest}:IInputProps) => {
    const [activate, setActivate] = useState(false);
    const password = useRef<HTMLInputElement | null>(null);

    const handleCheckPasss = () => {
        if(password.current && password.current.type === "password") {
            password.current.type = "text";
        }else if(password.current && password.current.type === "text") {
            password.current.type = "password";
        }
        setActivate(ac => !ac);
    }
    return (
        <Chakra.Box position={"relative"} m={m}>
            <Input id="password" type='password' label={label || "Senha"} ref={password} {...rest}  value={value} paddingRight={'2rem'}/>
            {(value && value !== '') && !activate && <Chakra.Icon as={ViewIcon} position={"absolute"} right={0} top={'44px'}
            cursor={"pointer"} onClick={handleCheckPasss} zIndex={999} w={'3rem'}  />}
            {(value && value !== '') && activate && <Chakra.Icon as={ViewOffIcon} position={"absolute"} right={0} top={'44px'}
            cursor={"pointer"} onClick={handleCheckPasss} zIndex={999} w={'3rem'}  />}
        </Chakra.Box>
    )
}

export {Password}