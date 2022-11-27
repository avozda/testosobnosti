import React, {useEffect} from 'react'
import { Radar, RadarChart, PolarGrid, 
   PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const Chart = ({data}) => {


 const chartData = [
   { name: 'R', domain: [0, 40],fullMark:40,x: data.R },
   { name: 'A', domain: [0, 40],fullMark:40,x: data.A },
   { name: 'I', domain: [0, 40],fullMark:40,x: data.I },
   { name: 'S', domain: [0, 40],fullMark:40,x: data.S },
   { name: 'E', domain: [0, 40],fullMark:40,x: data.E },
   { name: 'C', domain: [0, 40],fullMark:40,x: data.C },
 ];

  return (
   <>
      {data != {} && (
      <RadarChart height={400} width={400} 
      cx="50%" cy="50%" outerRadius="80%" data={chartData}>
      <PolarGrid />
      <PolarAngleAxis domain={[0,40]} dataKey="name" />
      <PolarRadiusAxis domain={[0,40]} />
      <Radar dataKey="x" stroke="rgb(52, 141, 136)" 
          fill="rgb(67, 179, 174)" fillOpacity={0.5} />
  </RadarChart>
   )}
   </>
  )
}

export default Chart