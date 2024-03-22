import { Button, Flex, InputProps, Spinner } from "@chakra-ui/react";
import { BaseSyntheticEvent } from "react";
import { SectionBase } from "./SectionBase";
import { Input } from "../Input";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { IFields } from "@/pages/register";
import { Password } from "../Password";

type IPasswordSectionProps = {
    submit?: (e?:BaseSyntheticEvent<any>) => Promise<void>;    
    back: () => void;
    control:Control<IFields, any>;
    errors: FieldErrors<IFields>;
    isSubmitting?: boolean
} & InputProps

const PasswordSection = ({submit, back,isSubmitting,control,errors,...rest}:IPasswordSectionProps) => {
    return (
    <SectionBase sx={{"svg > * ":{color:'white'}, "label": {color:"white"}}} >
        <Controller name={"password"} control={control} render={({field}) => 
            <Password autoComplete="new-password" m={"0 0 1rem 0"} color={"white"} id="password" error={errors.password && errors.password?.message} {...field}/>}/>
        <Controller name={"same_password"} control={control} render={({field}) => 
            <Password autoComplete="same-password" color={"white"} id="same-password" label="repita a senha" error={errors.same_password && errors.same_password?.message} {...field}/>}/>
        {isSubmitting && <Spinner color="white" mx={"auto"} display={"block"} my={"1rem"}/>}
        <Flex justifyContent={"space-between"} marginTop={"1rem"}>
            <Button onClick={back}>Voltar</Button>
            <Button onClick={submit} isDisabled={(errors.password || errors.same_password) && true}>Salvar</Button>
        </Flex>
    </SectionBase>
            
      
  )
}  
export {PasswordSection}