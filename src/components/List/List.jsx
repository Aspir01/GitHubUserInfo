import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import './List.css';
import axios from 'axios';

export default function List({ users, isLoading, errorMessage }) {
    const [reposCount, setReposCount] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [sortedUsers, setSortedUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const accountsPerPage = 8;
    const isLoadingRepos = Object.keys(reposCount).length !== users.length;

    useEffect(() => {
        const fetchReposCount = async () => {
            try {
                const promises = users.map((user) =>
                    axios.get(`https://api.github.com/users/${user.login}`)
                );

                const responses = await Promise.all(promises);
                const data = responses.reduce((result, response) => {
                    result[response.data.login] = response.data.public_repos;
                    return result;
                }, {});

                setReposCount(data);
            } catch (error) {
                console.error('Error fetching repositories count:', error);
            }
        };

        if (users.length > 0) {
            fetchReposCount();
        }
    }, [users]);

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

    // Функция выбора карточки пользователя
    const handleCardClick = (user) => {
        setSelectedUser(user);
    };

    // Функция закрытия модального окна
    const closeModal = () => {
        setSelectedUser(null);
    };

    const indexOfLastAccount = currentPage * accountsPerPage;
    const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
    const currentAccounts = sortedUsers.slice(indexOfFirstAccount, indexOfLastAccount);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <button className='sort' onClick={sortUsersByRepos}>Отсортировать по репозиториям</button>
            <div className="container">
                {isLoading ? (
                    <h2>Загрузка......</h2>
                ) : errorMessage !== '' ? (
                    <h2>Ошибка соединения</h2>
                ) : (
                    <>
                        {currentAccounts.map((user) => {
                            const repos = isLoadingRepos ? 'Загрузка...' : reposCount[user.login] || 0;
                            return (
                                <div key={user.id} className="card" onClick={() => handleCardClick(user)} data-testid="card">
                                    <img alt="head_portrait" src={user.avatar_url} />
                                    <b><p>{user.login}</p></b>
                                    <p>Количество репозиториев: {repos}</p>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
            <div className="pagination">
                {Array.from({ length: Math.ceil(sortedUsers.length / accountsPerPage) }).map((_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
            {selectedUser && (
                <Modal user={selectedUser} onClose={closeModal} />
            )}
        </>
    );
}