import axios from 'axios'
import React, { useEffect, useState } from 'react'

const api_url = 'http://127.0.0.1:8000'

const FilterItem = ({ type }) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`${api_url}/${type}`)
            .then(res => {
                setData(res.data)
                setLoading(false)
            })
            .catch(() => {
                alert('Error')
            })
    }, [])


    return (
        <div>
            <label htmlFor={type}>Escolha o(a) {type}:</label>
            <select name={type} id={type}>
                {data.map(item => (
                    <option key={item.nome} value={item.nome}>{item.nome}</option>
                ))}
            </select>
        </div>
    )
}

export default FilterItem