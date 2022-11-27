import {
   Flex,
   Box,
   FormControl,
   FormLabel,
   Input,
   Stack,
   Link,
   Button,
   Heading,
   Text,
   useColorModeValue,
   FormErrorMessage,
   Spinner
 } from '@chakra-ui/react';
 import { useContext } from 'react';
 import { Formik, Field } from "formik";
 import {Link as RouterLink, Navigate} from  "react-router-dom"  
import UserContext from '../../context/user/userContext';


const Login = ()=> {

    const userContext = useContext(UserContext)
    const {loading ,login, isAuthenticated} = userContext

    if(isAuthenticated){
      return <Navigate to="/"/>
    }

   return (
     <Flex
       minH={'100vh'}
       align={'center'}
       justify={'center'}
       w={"full"}
       bg={useColorModeValue('gray.50', 'gray.800')}>
       <Stack w={"full"}k spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
         <Stack align={'center'}>
           <Heading fontSize={'4xl'}>Přihlaš se</Heading>
           <Text fontSize={'lg'} color={'gray.600'}>
             a poznej svou <Text style={{display:"inline"}} color={'teal.400'}>osobnost</Text> ✌️
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
            password: ""
          }}
          onSubmit={(values) => {
            login(values.email, values.password)
          }}
          >

          {({ handleSubmit, errors, touched }) => (
             <form onSubmit={handleSubmit}>
           <Stack spacing={4}>
             <FormControl id="email">
               <FormLabel>Email</FormLabel>
               <Field as={Input}
                    id="email"
                    name="email"
                    type="email"
                    />
             </FormControl>
             <FormControl id="password" isInvalid={!!errors.password && touched.password}>
               <FormLabel>Heslo</FormLabel>
               <Field
                   as={Input}
                   id="password"
                   name="password"
                   type="password"
                  
                   validate={(value) => {
                     let error;

                     if (value.length <= 5) {
                       error = "Heslo musí obsahovat aspoň 6 znaků";
                     }

                     return error;
                   }}
               />
               <FormErrorMessage>{errors.password}</FormErrorMessage>
             </FormControl>
             <Stack spacing={10}>
               <Button
                type="submit"
                 bg={'teal.400'}
                 color={'white'}
                 _hover={{
                   bg: 'teal.500',
                 }}>
                 {loading ? <Spinner/>: "Přihlásit se"}
               </Button>
             </Stack>
             <Stack pt={6}>
           <Text align={'center'}>
             Nemáš učet?<RouterLink to="/register" > <Link color={'teal.400'}>Zaregistruj se</Link></RouterLink>
           </Text>
         </Stack>
           </Stack>
           </form>)}
           </Formik>
         </Box>
       </Stack>
     </Flex>
   );
 }

export default Login