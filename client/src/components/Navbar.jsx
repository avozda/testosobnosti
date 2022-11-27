import React, {useContext, useEffect, useState} from 'react'
import {
  Box,
  Flex,
  Avatar,
  Image,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
   Stack,
  Center,
} from '@chakra-ui/react';
import logo from "../assets/logo.png"
import { Link as RouterLink } from 'react-router-dom';
import UserContext from '../context/user/userContext';


const Navbar = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const userContext = useContext(UserContext)
   const {logout, user, loading} = userContext
   const [grade, setGrade] = useState("");
   
   useEffect(()=>{

     
       if(user != undefined){
         const datum = new Date()
      let mesic = datum.getMonth()+1;
      let rok = datum.getFullYear();

      let rocnik;
      if(mesic>8){
         rocnik = Number(user.yearOfEntry.split("/")[0]);
         rocnik--
         rocnik = rok - rocnik;
      }else {
         rocnik = Number(user.yearOfEntry.split("/")[1]);
       
         rocnik = rok - rocnik;  
         rocnik++
      }

      if(user.field==="VMA"){
       
         setGrade(rocnik+".C")
         return;
      }
      if(user.field==="MD"){
         setGrade(rocnik+".B")
         return;
      }
      if(user.field==="MT"){
         setGrade(rocnik+".A")
         return;
      }
      }
       
    
   },[])

  return (
    <>
    {
      !loading && (
         <Box zIndex={999} boxShadow={"sm"} color={'gray.600'} className="navbar"  px={4} >
         <Flex   
         w={"full"} 
         alignItems={'center'} justifyContent={'space-between'}>
           <Box><RouterLink to="/"><Image width={"40%"} height={"40%"} src={logo} alt="RIASEC Logo" /></RouterLink></Box>
 
           <Flex alignItems={'center'}>
             <Stack direction={'row'} spacing={7}>
              
 
               <Menu>
                  {user !== undefined && user.isAdmin && <RouterLink to="/statistics"><Button colorScheme='teal'>Statistika</Button></RouterLink>}
             
                 <MenuButton
                   as={Button}
                   rounded={'full'}
                   variant={'link'}
                   cursor={'pointer'}
                   minW={0}>
                   <Avatar
                     size={'sm'}
                     src={'https://i.pinimg.com/564x/9b/47/a0/9b47a023caf29f113237d61170f34ad9.jpg'} 
                   />
                 </MenuButton>
                 <MenuList alignItems={'center'}>
                   <br />
                   <Center>
                     <Avatar
                       size={'2xl'}
                       src={'https://i.pinimg.com/564x/9b/47/a0/9b47a023caf29f113237d61170f34ad9.jpg'}                />
                   </Center>
                   <br />
                   <Center>
                      {user != undefined
                      && <p><b>{user.firstName} {user.lastName}</b> </p>}  
                    
                     
                     
                   </Center>
                   <Center>
                       <p>{user !== undefined && user.isAdmin ? "Učitel" : grade}</p>
                   </Center>
                   <br />
                   <MenuDivider />
                   <MenuItem onClick={logout}>Odhlásit se</MenuItem>
                 </MenuList>
               </Menu>
             </Stack>
           </Flex>
         </Flex>
       </Box>
      )
    }
     
    </>
  );
}

export default Navbar