import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import {
  chakra,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import Moment from 'moment';

const backgrounds = [
  `url("data:image/svg+xml, %3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'560\' height=\'185\' viewBox=\'0 0 560 185\' fill=\'none\'%3E%3Cellipse cx=\'102.633\' cy=\'61.0737\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23ED64A6\' /%3E%3Cellipse cx=\'399.573\' cy=\'123.926\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23F56565\' /%3E%3Cellipse cx=\'366.192\' cy=\'73.2292\' rx=\'193.808\' ry=\'73.2292\' fill=\'%2338B2AC\' /%3E%3Cellipse cx=\'222.705\' cy=\'110.585\' rx=\'193.808\' ry=\'73.2292\' fill=\'%23ED8936\' /%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ED8936'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%2348BB78'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%230BC5EA'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%23ED64A6'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='102.633' cy='61.0737' rx='102.633' ry='61.0737' fill='%23ED8936'/%3E%3Cellipse cx='399.573' cy='123.926' rx='102.633' ry='61.0737' fill='%2348BB78'/%3E%3Cellipse cx='366.192' cy='73.2292' rx='193.808' ry='73.2292' fill='%230BC5EA'/%3E%3Cellipse cx='222.705' cy='110.585' rx='193.808' ry='73.2292' fill='%23ED64A6'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ECC94B'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%239F7AEA'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%234299E1'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%2348BB78'/%3E%3C/svg%3E")`,
];

const ResultCard = ({result, index}) => {



  const date = Moment(result.date).format('MMM Do YYYY HH:mm')


  return (
    <RouterLink to={`/result/${result._id}`}>
    <Flex
    mb={10}
    boxShadow={'lg'}
 
    direction={{ base: 'column-reverse', md: 'row' }}
    width={'100%'}
    rounded={'xl'}
    p={10}
    justifyContent={'space-between'}
    position={'relative'}
    bg={useColorModeValue('white', 'gray.800')}
    _before={{
      content: '""',
      position: 'absolute',
      zIndex: '-1',
      height: 'full',
      maxW: '640px',
      width: 'full',
      filter: 'blur(40px)',
      transform: 'scale(0.98)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      top: 0,
      left: 0,
      backgroundImage: backgrounds[index % 4],
    }}>
    <Flex
      direction={'row'}
      textAlign={'left'}
      w={"100%"}
      className='responsive-text'
      justifyContent={'space-between'}>
      <chakra.p fontWeight={'bold'} fontSize={14}>
      {date}
        

      </chakra.p>
      <chakra.p
        className='responsive-text'
        fontWeight={'medium'}
        fontSize={'15px'}
    >
      R - {result.R} / I - {result.I} / A - {result.A} / S - {result.S} / E - {result.E} / C - {result.C} 
      </chakra.p>
    
    </Flex>
  </Flex>
  </RouterLink>
  )
}

export default ResultCard

