import React, {useState, useContext} from 'react'
import {
   Flex,
   Box,
   FormControl,
   FormLabel,
   Input,
   InputGroup,
   HStack,
   InputRightElement,
   Stack,
   Button,
   Heading,
   Text,
   useColorModeValue,
   Link,
   Select,
   FormErrorMessage,
   Spinner
 } from '@chakra-ui/react';
 import { Formik, Field } from "formik";
 import {Link as RouterLink} from  "react-router-dom" 

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import UserContext from '../../context/user/userContext';

const Register = () => {
   const [showPassword, setShowPassword] = useState(false);



   const userContext = useContext(UserContext);
    
   const { register, loading } = userContext;

  const datum = new Date()
  let mesic = datum.getMonth()+1;
  let rok = datum.getFullYear()
  let nastupPrvaku;

  if(mesic>8){
    nastupPrvaku = rok - 3;
  }else {
    nastupPrvaku = rok - 4;
  }

  const vyberLet=[];

  for(let i=1; i<5; i++){
    let roky = ((nastupPrvaku+i)-1)+"/"+ (nastupPrvaku+i)
    vyberLet.push(roky)
  }
  return (
    
   <Flex
   minH={'100vh'}
   align={'center'}
   justify={'center'}
   bg={useColorModeValue('gray.50', 'gray.800')}>
   <Stack w={"full"} spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
     <Stack align={'center'}>
       <Heading fontSize={'4xl'} textAlign={'center'}>
         Zaregistruj se
       </Heading>
       <Text fontSize={'lg'} color={'gray.600'}>
          a najdi své vysněné povolání✌️
       </Text>
     </Stack>
     <Box
       rounded={'lg'}
       bg={useColorModeValue('white', 'gray.700')}
       boxShadow={'lg'}
       p={8}>
          <Formik
          initialValues={{
            email: "",
            password: "",
            passwordConfirm:"",
            field:"VMA",
            yearOfEntry:vyberLet[0]
          }}
          onSubmit={(values) => {
            const fieldVal = {email: values.email, 
              password: values.password, 
              field: values.field,
              yearOfEntry: values.yearOfEntry
            }
   
           register(fieldVal)
          }}
        >
          {({ handleSubmit, errors, touched }) => (
         <form onSubmit={handleSubmit}>
       <Stack spacing={4} w={"full"}>
         <HStack w={"full"}> 
         <Box w={"40%"}>
             <FormControl id="vstup">
               <FormLabel>Ročník</FormLabel>
               <Field
                 as={Select}
                 id="yearOfEntry"
                 name="yearOfEntry"
                 type="yearOfEntry"
               >
                {vyberLet.map((value, index)=>(<option key={index} value={value}>{4-index}</option>))}
              </Field>
             </FormControl>
           </Box>
           <Box w={"60%"}>
             <FormControl id="obor">
               <FormLabel>Obor</FormLabel>
               <Field as={Select}
                    id="field"
                    name="field"
                    type="field"
                    >
                <option value='VMA'>VMA</option>
                <option value='MD'>MD</option>
                <option value='MT'>MT</option>
                </Field>
             </FormControl>
           </Box>
   
         </HStack>
         <FormControl id="email" isRequired>
           <FormLabel>Email</FormLabel>
           <Field as={Input}
                    id="email"
                    name="email"
                    type="email"
              />
         </FormControl>
         <FormControl id="password" isRequired isInvalid={!!errors.password && touched.password}>
           <FormLabel>Heslo</FormLabel>
           <InputGroup>
             <Field as={Input}
                    id="password"
                    name="password" 
                    type={showPassword ? 'text' : 'password'}
                    validate={(value) => {
                      let error;

                      if (value.length <= 5) {
                        error = "Heslo musí obsahovat aspoň 6 znaků";
                      }

                      return error;
                    }}
                    />
             <InputRightElement h={'full'}>
               <Button
                 variant={'ghost'}
                 onClick={() =>
                   setShowPassword((showPassword) => !showPassword)
                 }>
                 {showPassword ? <ViewIcon /> : <ViewOffIcon />}
               </Button>
             </InputRightElement>
           </InputGroup>
           <FormErrorMessage>{errors.password}</FormErrorMessage>
         </FormControl>
         <FormControl id="passwordConfirm" isRequired isInvalid={!!errors.passwordConfirm && touched.passwordConfirm}>
           <FormLabel>Potvrdit heslo</FormLabel>
           <InputGroup>
           <Field as={Input}
                    id="passwordConfirm"
                    name="passwordConfirm" 
                    type={showPassword ? 'text' : 'password'}
                    validate={(value) => {
                      let error;
                        
                      if (value !== password.value) {
                        error = "Hesla se musí shodovat";
                      }

                      return error;
                    }}
                    />
             <InputRightElement h={'full'}>
             </InputRightElement>
           </InputGroup>
           <FormErrorMessage>{errors.passwordConfirm}</FormErrorMessage>
         </FormControl>
         <Stack spacing={10} pt={2}>
            
           <Button
           type="submit"
             size="lg"
             bg={'teal.400'}
             color={'white'}
             _hover={{
               bg: 'teal.500',
             }}>
               {loading ? <Spinner/>: "Registrovat se"}
           </Button>
         </Stack>
         <Stack pt={6}>
           <Text align={'center'}>
             Už máš účet?<RouterLink to="/login"> <Link color={'teal.400'}>Přihlaš se</Link></RouterLink>
           </Text>
         </Stack>
       </Stack>
       </form>)}
        </Formik>
     </Box>
   </Stack>
 </Flex>
  )
}

export default Register