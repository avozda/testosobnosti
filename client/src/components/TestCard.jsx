import React, {useState} from 'react'
import {
   Box,
   Center,
   useColorModeValue,
   Heading,
   Text,
   Stack,
   IconButton,
   HStack
 } from '@chakra-ui/react';
 import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons'


const TestCard = ({question, number,nextClick, backClick} ) => {

   const [val, setVal] = useState(null)
  return (
 <Center py={12} m={10} mt={0}>
    <Box
      role={'group'}
      p={6}
      maxW={'1000'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'lg'}
      pos={'relative'}
      zIndex={1}>
         
      <Stack pt={5} align={'center'}>
        <Text  color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
          Otázka č.{number}
        </Text>
        <Heading style={{display:"flex", alignItems:"center", height:"60px"}} pt={5} fontSize={'2xl'} fontFamily={'body'} align={"center"} fontWeight={500}>
        {question.question}
        </Heading>
         <HStack  pt={5}>
         <Box as='label'>
       <Box cursor='pointer' className={val == 0 ? "checked": ""} borderWidth='1px' borderRadius='md' boxShadow='md'
         onClick={ (e)=>{  
            setVal(0)                         
         }}          
         px={5}
         py={3}
       >
        0
       </Box>
     </Box>
         <Box as='label'>
       <Box cursor='pointer' _focus={{boxShadow: 'outline'}} className={val == 1 ? "checked": ""}  borderWidth='1px' borderRadius='md' boxShadow='md'
         onClick={ (e)=>{  
            setVal(1)                          
         }}          
         px={5}
         py={3}
       >
        1
       </Box>
     </Box>
         <Box as='label'>
       <Box cursor='pointer' _focus={{boxShadow: 'outline'}} borderWidth='1px' className={val == 2 ? "checked": ""}  borderRadius='md' boxShadow='md'
         onClick={ (e)=>{  
               setVal(2)                         
         }}          
         px={5}
         py={3}
       >
        2
       </Box>
     </Box>
         </HStack>
        <Stack pt={10} direction={'row'} align={'center'}>
         <IconButton onClick={()=>{
            setVal(null)
            backClick();
         }} aria-label='Search database' mr={10} icon={<ArrowBackIcon />} />
         <IconButton onClick={()=>{
            
            if(val !=null){
               nextClick(val)
               setVal(null)
            }
         }} aria-label='Search database' ml={10} icon={<ArrowForwardIcon />} />
        </Stack>
      </Stack>
    </Box>
  </Center>
  )
}

export default TestCard