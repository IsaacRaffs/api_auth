import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from '../components/pagination/Pagination'
import Questao from '../components/questao/Questao'
import Filter from '../components/filter/Filter'
import Select from 'react-select'
import './Home.css'


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

  const [areas, setAreas] = useState([])
  const [selectedArea, setSelectedArea] = useState(null)


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

  useEffect(() => {
    axios.get(`${api_url}/area`)
      .then(res => {
        setAreas(res.data)
      })
      .catch(() => {
        alert('Error')
      })
  }, [])

  const assuntoOptions = assuntos.map((assunto) => ({
    value: assunto.nome,
    label: assunto.nome
  }))


  const materiaOptions = materias.map((materia) => ({
    value: materia.nome,
    label: materia.nome
  }))

  const areaOptions = areas.map((area) => ({
    value: area.nome,
    label: area.nome
  }))


  const filterAreas = selectedArea ? data.filter((data) => data.area_nome === selectedArea.value) : data

  const filterMaterias = selectedMateria ? filterAreas.filter((data) => data.materia === selectedMateria.value) : filterAreas

  const filterAssuntos = selectedAssunto ? filterMaterias.filter((data) => data.assunto === selectedAssunto.value) : filterMaterias



  const indefOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indefOfLastRecord - recordsPerPage
  const currentRecords = filterAssuntos.slice(indexOfFirstRecord, indefOfLastRecord)
  const nPages = Math.ceil(filterAssuntos.length / recordsPerPage)

  return (
    <div>
      {loading ? 'Carregando...' : 'Carregado'}

      <div className="filters">
        <Select
          options={areaOptions}
          isClearable
          placeholder='Selecione uma area'
          onChange={(selectdArea) => {
            setCurrentPage(1)
            setSelectedArea(selectdArea)
          }}
          value={selectedArea}
        />

        <Select
          options={materiaOptions}
          isClearable
          placeholder='Selecione uma materia'
          onChange={(selectdMateria) => {
            setCurrentPage(1)
            setSelectedMaterias(selectdMateria)
          }}
          value={selectedMateria}
        />

        <Select
          options={assuntoOptions}
          isClearable
          placeholder='Selecione um assunto'
          onChange={(selectedAssunto) => {
            setCurrentPage(1)
            setSelectedAssunto(selectedAssunto)
          }}
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