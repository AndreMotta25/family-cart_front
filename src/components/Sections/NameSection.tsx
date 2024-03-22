import { Box, Button, Flex } from "@chakra-ui/react"
import { ISectionsProps, SectionBase } from "./SectionBase"
import { Input } from "../Input"
import { NextButton } from "./NextButton"

const NameSection = ({next,error, back, value, ...rest}:ISectionsProps) => {
    return (
    <SectionBase>
            <Input id="name" color={"white"} label="nome" placeholder="Digite seu nome" {...rest}/>
            <Flex justifyContent={"space-between"} marginTop={"1rem"}>
                <Button onClick={back}>Voltar</Button>
                <NextButton error={error} next={next} value={value}/>
            </Flex>
    </SectionBase>)
}  

export {NameSection}