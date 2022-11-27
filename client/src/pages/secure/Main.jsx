import React, {useContext, useEffect} from 'react'
import {Link as RouterLink} from  "react-router-dom" 
import ResultContext from "../../context/result/resultContext"
import ResultCard from '../../components/ResultCard';
import { Spinner } from '@chakra-ui/react';
import TestDescription from '../../components/TestDescription';
import {
  Box,
  chakra,
  Flex
} from '@chakra-ui/react';

const Main = () => {

  const resultContext = useContext(ResultContext);

  const {getUsersResults, loading,userResults} = resultContext

  useEffect(()=>{
    getUsersResults();
  },[])

  return (
    <section>

        <TestDescription />
        {userResults.length>0 &&(
           <div className='results'>
           <div className='resultTitle'>
           <Flex
       textAlign={'center'}
       pt={10}
       justifyContent={'center'}
       direction={'column'}
       width={'full'}>
       
           <Box width={{ base: 'full', sm: 'lg', lg: 'xl' }} margin={'auto'}>
         <chakra.h3
           textAlign={"left"}
           fontWeight={'bold'}
           fontSize={16}
           textTransform={'uppercase'}
           color={'teal.400'}>
           Vaše osobnost
         </chakra.h3>
         <chakra.h1
           py={5}
           fontSize={32}
           textAlign={"left"}
           fontWeight={'bold'}
           color={'gray.700'}>
           Výsledky vašich dotazníků
         </chakra.h1>
 
       </Box>
       </Flex>
            
           </div>
         
           <div className='resultList'>
           {!loading? <div className='loader'><Spinner/></div> : userResults.map((result, i)=><ResultCard index={i} key={result._id} result={result}/>)}
           </div>
         </div>
        )}
       
      
      
       
 
 

    </section>
  
   
  )
}

export default Main