import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ResultContext from "../../context/result/resultContext"
import Chart from '../../components/Chart'
import { Spinner } from '@chakra-ui/react';
import { Box, Flex, Text, TabList, TabPanel, TabPanels, Tabs, Tab } from '@chakra-ui/react';

import Moment from 'moment';
import { useState } from 'react';
import TypeDescription from "../../components/TypeDescription"
import { Navigate } from "react-router-dom";
const FinishedTestDetail = () => {

  const resultContext = useContext(ResultContext)
  const { getResultDetail, loading, resultDetail, error } = resultContext;
  const [percentages, setPercentages] = useState({})
  const [strongestTypes, setTypes] = useState([])
  let { id } = useParams();


  useEffect(() => {
    getResultDetail(id);
  }, [id])

  useEffect(() => {
    calculateResults()
  }, [resultDetail])


  const calculateResults = () => {
    if (resultDetail && resultDetail.R) {
      let total = resultDetail.R + resultDetail.I + resultDetail.A + resultDetail.S + resultDetail.E + resultDetail.C
      const result = {}

      result.R = ((resultDetail.R / total) * 100).toFixed()
      result.I = ((resultDetail.I / total) * 100).toFixed()
      result.A = ((resultDetail.A / total) * 100).toFixed()
      result.S = ((resultDetail.S / total) * 100).toFixed()
      result.E = ((resultDetail.E / total) * 100).toFixed()
      result.C = ((resultDetail.C / total) * 100).toFixed()
      setPercentages(result)

      let biggest = { value: 0, key: "" }
      let secondBiggest = { value: 0, key: "" }
      let thirdBiggest = { value: 0, key: "" }

      for (const key in result) {
        if (parseInt(result[key])  > parseInt(biggest.value)) {
          thirdBiggest = secondBiggest
          secondBiggest = biggest
          biggest = { value: result[key], key }
        } else if (parseInt(result[key]) > parseInt(secondBiggest.value)) {
          thirdBiggest = secondBiggest
          secondBiggest = { value: result[key], key }
        } else if (parseInt(result[key]) > parseInt(thirdBiggest.value)) {
          thirdBiggest = { value: result[key], key }
        }
        console.log(biggest)
      }

      setTypes([biggest.key, secondBiggest.key, thirdBiggest.key])


    }


  }

  if(error){
    return  <Navigate to="/" replace={true} />
  }

  return (

    loading ? <div className="loader"><Spinner /></div> :
      <section>
        <Flex pt={10}>
          <Box w="50%">
            <Text fontSize="xs" color='gray.500'>Výsledek testu pro {resultDetail.firstName + " " + resultDetail.lastName} ze dne {Moment(resultDetail.date).format('DD.MM.YYYY')}</Text>
            <Text mb={5} fontSize="3xl">RIASEC kód vaší osobnosti: <span className='primary'>{strongestTypes[0]}{strongestTypes[1]}{strongestTypes[2]} </span></Text>

            <Text mb={5}>Písmena jsou seřazeny zleva doprava podle priority. To znamená, že první písmeno nejvíce reporazentuje Váš typ osobnosti, další dvě písmena jsou doplňkové.</Text>
            <Text>
              <span style={{ marginRight: "10px" }}>R: {percentages.R}%</span>
              <span style={{ marginRight: "10px" }}>I: {percentages.I}%</span>
              <span style={{ marginRight: "10px" }}>A: {percentages.A}%</span>
              <span style={{ marginRight: "10px" }}>S: {percentages.S}%</span>
              <span style={{ marginRight: "10px" }}>E: {percentages.E}%</span>
              <span style={{ marginRight: "10px" }}>C: {percentages.C}%</span>
            </Text>
            <Chart data={resultDetail} />

          </Box>
          <Box w="50%">
            <Tabs>
              <TabList>
                <Tab>Primární typ - {strongestTypes[0]}</Tab>
                <Tab>Sekundární typ - {strongestTypes[1]}</Tab>
                {strongestTypes[2] && <Tab>Terciární typ - {strongestTypes[2]}</Tab>}
              </TabList>

              <TabPanels>
                <TabPanel>
                  <TypeDescription type={strongestTypes[0]}></TypeDescription>
                </TabPanel>
                <TabPanel>
                  <TypeDescription type={strongestTypes[1]}></TypeDescription>
                </TabPanel>
                {strongestTypes[2] && <TabPanel>
                  <TypeDescription type={strongestTypes[2]}></TypeDescription>
                </TabPanel>}

              </TabPanels>
            </Tabs>
          </Box>
        </Flex>
      </section>

  )
}

export default FinishedTestDetail