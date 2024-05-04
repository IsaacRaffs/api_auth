import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Pagination from '../components/pagination/Pagination'
import Questao from '../components/questao/Questao'


const api_url = 'http://127.0.0.1:8000/questao'

const Home = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage] = useState(10)

  
  
  
  
  
  useEffect(() => {
    axios.get(api_url)
    .then(res => {
      setData(res.data);
      setLoading(false);
    })
    .catch(() => {
      alert('Error')
    })
  }, [])
  
  console.log(data)
  
  const indefOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indefOfLastRecord - recordsPerPage
  const currentRecords = data.slice(indexOfFirstRecord, indefOfLastRecord)
  const nPages = Math.ceil(data.length / recordsPerPage)

  return (
    <div>
      {loading ? 'Carregando...' : 'Carregado'}
      <Pagination 
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <Questao data={currentRecords}/>
      
      <Pagination 
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default Home