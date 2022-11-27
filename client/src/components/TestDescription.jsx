import React from 'react'
import {
  Box,
  VStack,
  Button,
  Flex,
  Divider,
  chakra,
  Grid,
  GridItem,
  Container,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const TestDescription = () => {
  return (
   <Box mb={100} as={Container} maxW="7xl" mt={14} p={4}>
   <Grid
     templateColumns={{
       base: 'repeat(1, 1fr)',
       sm: 'repeat(2, 1fr)',
       md: 'repeat(2, 1fr)',
     }}
     gap={4}>
     <GridItem colSpan={1}>
       <VStack alignItems="flex-start" spacing="20px">
         <chakra.h2 fontSize="3xl" fontWeight="700">
         Dotazník pracovního zaměření 
         <br />
         osobnosti <span style={{color:'#43b3ae'}}>RIASEC</span>
         </chakra.h2>
         <RouterLink to="/test"> <Button colorScheme="teal" size="md">
            Začít test
         </Button></RouterLink>
        
       </VStack>
     </GridItem>
     <GridItem>
       <Flex>
         <chakra.p>
         RIASEC je speciální psychologická metoda, 
         která se využívá zejména pro testy osobnosti 
         a testy ovlivňující volbu povolání. 
         Podle této metody je každý člověk zcela jedinečný. 
         Jeden se zajímá o matematiku, druhého baví umění, další rozumí spíše praktickým věcem a jiný má 
         zase skvělou schopnost přesvědčovat ostatní. Všechny tyto a ještě další vlastnosti 
         lze použít pro přesný popis něčí osobnosti a volbu vhodného zaměstnání v budoucnosti.


         </chakra.p>
       </Flex>
     </GridItem>
   </Grid>
   <Divider mt={12} mb={12} />
 </Box>
  )
}

export default TestDescription