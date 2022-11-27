import React,{useContext} from 'react'
import { useToast } from '@chakra-ui/react'
import AlertContext from '../context/alert/alertContext'

const Alert = () => {

  const alertContext = useContext(AlertContext)
  const {alerts, setAlert} = alertContext

   const toast = useToast()

  return (
    alerts.map((value, index)=>{
      if (!toast.isActive(value.id)) {
        toast({
        id: value.id,
        position: "bottom-right",
        title: value.msg,
        status: value.alertType,
        duration: 9000,
        isClosable: true,
      })}
    }
      ))

}

export default Alert