import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from '../components/pagination/Pagination'
import Questao from '../components/questao/Questao'
import Filter from '../components/filter/Filter'
import Select from 'react-select'


const api_url = 'http://127.0.0.1:8000'

const Home = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage] = useState(10)

  const [materias, setMaterias] = useState([])
  const [selectedMateria, setSelectedMaterias] = useState(null)

  const [assuntos, setAssuntos] = useState([])
  const [selectedAssunto, setSelectedAssunto] = useState(null)


  useEffect(() => {
    axios.get(`${api_url}/questao`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert('Error')
      })
  }, [])


  useEffect(() => {
    axios.get(`${api_url}/materia`)
      .then(res => {
        setMaterias(res.data)
      })
      .catch(() => {
        alert('Error')
      })
  }, [])

  useEffect(() => {
    axios.get(`${api_url}/assunto`)
      .then(res => {
        setAssuntos(res.data)
      })
      .catch(() => {
        alert('Error')
      })
  })

  const assuntoOptions = assuntos.map((assunto) => ({
    value: assunto.nome,
    label: assunto.nome
  }))


  const materiaOptions = materias.map((materia) => ({
    value: materia.nome,
    label: materia.nome
  }))


  const filterAreas = selectedMateria ? data.filter((data) => data.materia === selectedMateria.value) : data

  const filterAssuntos = selectedAssunto ? filterAreas.filter((data) => data.assunto === selectedAssunto.value) : filterAreas

  // const[busca, setBusca] = useState('')

  // const questoesFiltradas = data
  //   .filter((item) => item.includes(busca))





  const indefOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indefOfLastRecord - recordsPerPage
  const currentRecords = filterAssuntos.slice(indexOfFirstRecord, indefOfLastRecord)
  const nPages = Math.ceil(filterAssuntos.length / recordsPerPage)

  return (
    <div>
      {loading ? 'Carregando...' : 'Carregado'}

      {/* <Filter 
       
        valueElement={busca}
        onChangeElement={setBusca}/> */}
      <div className="filters w-50 mb-5">
        <Select
          options={materiaOptions}
          isClearable
          placeholder='Selecione uma materia'
          onChange={(selectdMateria) => setSelectedMaterias(selectdMateria)}
          value={selectedMateria}
        />

        <Select
          options={assuntoOptions}
          isClearable
          placeholder='Selecione um assunto'
          onChange={(selectedAssunto) => setSelectedAssunto(selectedAssunto)}
          value={selectedAssunto}
        />
      </div>


      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <Questao data={currentRecords} />

      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default Home