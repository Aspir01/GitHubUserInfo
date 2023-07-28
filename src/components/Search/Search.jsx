import React, { useRef } from 'react'
import axios from 'axios'
import "./Search.css"

export default function Search({ setUsers, setIsLoading, setErrorMessage }) {

    const inputRef = useRef()
    const placeHolder = "Введите логин"

    // Функция поиска гитхаб аккаунта
    const search = async () => {
        const { value } = inputRef.current
        setIsLoading(true)
        axios.get(`https://api.github.com/search/users?q=${value}`).then(
            response => {
                setIsLoading(false)
                setUsers(response.data.items)
            },
            error => {
                setIsLoading(false)
                setErrorMessage(error)
            }
        )
    }
    return (
        <div className='search-box'>
            <input type="text" ref={inputRef} placeholder={placeHolder} />
            <button onClick={search}>Поиск</button>
        </div>
    )
}