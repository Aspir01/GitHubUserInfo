import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import "./Search.css"

export default function Search({ users, setSortedUsers, setUsers, reposCount, setIsLoading, setErrorMessage }) {

    const inputRef = useRef()
    const placeHolder = "Введите логин"
    const [shouldSort, setShouldSort] = useState(false)

    // Функция поиска гитхаб аккаунта
    const search = async () => {
        const { value } = inputRef.current
        setIsLoading(true)
        axios.get(`https://api.github.com/search/users?q=${value}`).then(
            response => {
                setIsLoading(false)
                setUsers(response.data.items)
                setShouldSort(false)
            },
            error => {
                setIsLoading(false)
                setErrorMessage(error)
            }
        )
    }

    useEffect(() => {
        sortUsersByRepos();
    }, [reposCount]);

    // Функция сортировки репозиториев
    const sortUsersByRepos = () => {
        const sortedUsers = users.slice().sort((a, b) => {
            const reposA = reposCount[a.login] || 0;
            const reposB = reposCount[b.login] || 0;
            return reposB - reposA;
        });
        setSortedUsers(sortedUsers);
    };


    return (
        <div className='search-box'>
            <button className='sort' onClick={() => setShouldSort(true)}>Отсортировать по репозиториям</button>
            <input type="text" ref={inputRef} placeholder={placeHolder} />
            <button onClick={search}>Поиск</button>
        </div>
    )
}