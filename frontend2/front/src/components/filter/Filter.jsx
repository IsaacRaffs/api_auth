import React from 'react'
import './FilterItem'
import FilterItem from './FilterItem'

const Filter = ({valueElement, onChangeElement}) => {

  return (
    <div>
        <form method='get'>
        <FilterItem type='area' />
        <FilterItem type='materia' />
        <FilterItem type='assunto' />
        <button type='submit' value={valueElement} onChange={(ev) => onChangeElement(ev.target.value)}>Buscar</button>
        </form>
    </div>
  )
}

export default Filter