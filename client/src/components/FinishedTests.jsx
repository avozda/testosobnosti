import React from 'react'
import { Box, Heading, Text, Button, Spinner } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const FinishedTests = ({loading, click}) => {
  return (
   <Box textAlign="center" py={10} px={6}>
   <CheckCircleIcon boxSize={'50px'} color={'teal.600'} />
   <Heading as="h2" size="xl" mt={6} mb={2}>
      Dokončil jsi test RIASEC
   </Heading>
   <Text color={'gray.500'}>
      Pro zobrazení výsledků klikni na tlačítko níže
   </Text>
   {loading ? (<Spinner/>): (<Button mt={10} colorScheme={'green'} onClick={click}>Zobrazit výsledky</Button>)}
   
 </Box>
  )
}

export default FinishedTests