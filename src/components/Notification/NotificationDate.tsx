import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'

interface INotificationDate {
  date: string
}
function NotificationDate({date}:INotificationDate) {
  const dateLocale =  new Date(date).toLocaleString("pt-Br");
  return (
    <Box my={-1} ml={"auto"} paddingRight={'0.5rem'} fontSize={"0.8rem"} color={"gray.300"} fontWeight={"bold"}>{dateLocale}</Box>
  )
}

export default NotificationDate