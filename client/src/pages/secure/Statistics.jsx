import React, { useContext, useEffect } from 'react'
import UserContext from '../../context/user/userContext'
import { Navigate } from 'react-router-dom'
import ResultContext from '../../context/result/resultContext'
import Table from '../../components/Table'
import { Spinner } from '@chakra-ui/react';
import AlertContext from '../../context/alert/alertContext'


const Statistics = () => {

   const userContext = useContext(UserContext)
   const resultContext = useContext(ResultContext)
   const { user } = userContext
   const { allResults, getStatistics, loading } = resultContext;

   if (!user.isAdmin) {
      return <Navigate to="/" />
   }

   const columns = React.useMemo(
      () => [
         {
            accessor: 'name',
            Header: 'Jméno'
         },
         {
            Header: 'Třída',
            accessor: 'grade',
         },
         {
            accessor: 'R',
            Header: 'R',
            disableFilters: true,
            disableGlobalFilter: true
         },
         {
            accessor: 'I',
            Header: 'I',
            disableFilters: true,
            disableGlobalFilter: true
         },
         {
            accessor: 'A',
            Header: 'A',
            disableFilters: true,
            disableGlobalFilter: true
         },
         {
            accessor: 'S',
            Header: 'S',
            disableFilters: true,
            disableGlobalFilter: true
         },
         {
            accessor: 'E',
            Header: 'E',
            disableFilters: true,
            disableGlobalFilter: true
         },
         {
            accessor: 'C',
            Header: 'C',
            disableFilters: true,
            disableGlobalFilter: true
         },


         {
            accessor: 'date',
            Header: 'Datum'
         },

      ],
      []
   )


   useEffect(() => {

      getStatistics()

   }, [])

   return (
      <section>
         <div style={{ paddingTop: "30px" }}></div>
         {!loading ? <Table columns={columns} allResults={allResults} /> : <div className='loader'><Spinner /> </div>}
      </section>
   );
}

export default Statistics