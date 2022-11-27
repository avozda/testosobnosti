import React from 'react'
import {
   Box,
   Container,
   Stack,
   Text,
   useColorModeValue,
 } from '@chakra-ui/react';
 import Logo from "../assets/logo-transparent.png"

const Footer = () => {
   return (
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <img src={Logo} alt="Logo" width={"100px"} />
          <Text> Střední škola filmová, multimediální a počítačových technologií, s.r.o. © Všechna práva vyhrazena</Text>
        </Container>
      </Box>
    );
}

export default Footer