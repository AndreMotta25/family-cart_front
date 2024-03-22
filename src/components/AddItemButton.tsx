import { AddIcon } from "@chakra-ui/icons"
import { Box, IconButton, IconButtonProps } from "@chakra-ui/react"
import { Tooltip } from "./Tooltip";


type AddItemButtonProps = {
    createItem: () => void,
} & Omit<IconButtonProps, 'aria-label'>;

const AddItemButton = ({createItem}: AddItemButtonProps) => (

    <Box role="group" w={"100%"} bg={"gray.600"} borderRadius={"0.5rem"} mb={"2rem"} onClick={createItem} 
    _hover={{transform: 'scale(1.05);',
             transition: 'all 0.3s ease'
    }}>
        {/* Quando passar o mouse no box, a cor do icone vai mudar, mas para isso funcionar 
        o atributo role tem que estar presente no ancestral do _groupHover */}
        <Box _groupHover={{color:"black"}} color={"white"}>
            <Tooltip label="Adicionar Item">
                <IconButton bg={"transparent"} color={"inherit"} display={"block"} w={"100%"} mx={"auto"} aria-label="add item" icon={<AddIcon/>}/>
            </Tooltip>
        </Box>
    </Box>   
)
export {AddItemButton}