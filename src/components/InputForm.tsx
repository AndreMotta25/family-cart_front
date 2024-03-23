import { Button, Flex, InputProps } from "@chakra-ui/react";
import { BaseSyntheticEvent, ForwardRefRenderFunction, forwardRef, useEffect, useRef, useState } from "react";
import { IInputProps, Input } from "./Input";

type PropsFormProfile =  {
    isModify: boolean;
    submit?: (e?:BaseSyntheticEvent<any>) => Promise<void>;
} & IInputProps

const InputFormBase:ForwardRefRenderFunction<HTMLFormElement, PropsFormProfile> = ({isModify = true,submit,error,disabled, w, width,...rest}, ref) => {
    const [disable, setDisable] = useState(true);
    const input = useRef<HTMLInputElement>(null);
    
    const handleClick = () => {
        setDisable(v => !v);
    }
    
    useEffect(() => {
        input.current?.focus();
    },[disable])

    const handleSave = async () => {
        if(submit) await submit();

        if(!error) {
            handleClick();
        }
    }

    return (
        <Flex as={"form"} position={"relative"} ref={ref} w={w || width} sx={{'label':{color:"white"}}} gap={'0.5rem'}>
            {isModify && 
            <>
                <Input w={"100%"} bg={"gray.700"} disabled={disable} outline={"none"} border={"none"} color={"white"} {...rest} 
                sx={{_disabled:{cursor:"pointer"}}} ref={input} error={error}/>
                {!disable && <Button position={"relative"} right={0} bottom={'-2rem'} zIndex={1} onClick={handleSave}>
                    Salvar
                </Button>}
                {disable && 
                <Button position={"relative"} right={0} bottom={'-2rem'} zIndex={1} onClick={handleClick}>
                    Alterar
                </Button>}
            </>}
            { !isModify && <Input w={"100%"} bg={"gray.700"} disabled={disable} outline={"none"} border={"none"} color={"white"} {...rest}/>}            
            
        </Flex>    
    )
} 
const InputForm = forwardRef(InputFormBase)
export {InputForm}