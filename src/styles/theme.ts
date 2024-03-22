import {extendTheme} from '@chakra-ui/react';

const theme = extendTheme({
    styles: {
        global: {
            body: {
                bg:"gray.900"
            }
        }
    },
    colors: {
        gray: {
            800:"#353434",
            900:"#1B1B1B"
        },
        teal: {
            200:"#74CEC2"
        }
    }
})

export {theme}