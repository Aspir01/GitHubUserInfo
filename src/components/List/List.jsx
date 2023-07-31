import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import './List.css';
import axios from 'axios';

export default function List({ users, sortedUsers, reposCount, setReposCount, isLoading, errorMessage }) {
    const [followersCount, setFollowersCount] = useState({});
    const [followingCount, setFollowingCount] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);
    const accountsPerPage = 8;
    const isLoadingRepos = Object.keys(reposCount).length !== users.length;
    const isLoadingFollowing = Object.keys(followingCount).length !== users.length;

    useEffect(() => {
        // Функция поиска количества репозиториев
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
        // Функция поиска количества подпиcчиков
        const fetchFollowersCount = async () => {
            try {
                const promises = users.map((user) =>
                    axios.get(`https://api.github.com/users/${user.login}`)
                );

                const responses = await Promise.all(promises);
                const data = responses.reduce((result, response) => {
                    result[response.data.login] = response.data.followers;
                    return result;
                }, {});

                setFollowersCount(data);
            } catch (error) {
                console.error('Error fetching followers count:', error);
            }
        };

        // Функция поиска количества подписок
        const fetchFollowingCount = async () => {
            try {
                const promises = users.map((user) =>
                    axios.get(`https://api.github.com/users/${user.login}/following`)
                );

                const responses = await Promise.all(promises);
                const data = responses.reduce((result, response, index) => {
                    result[users[index].login] = response.data.length;
                    return result;
                }, {});

                setFollowingCount(data);
            } catch (error) {
                console.error('Error fetching following count:', error);
            }
        };

        if (users.length > 0) {
            fetchReposCount();
            fetchFollowersCount();
            fetchFollowingCount();
        }
    }, [users]);

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
            <div className="container">
                {isLoading ? (
                    <center><h2>Загрузка......</h2></center>
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
                <Modal user={selectedUser} isLoadingRepos={isLoadingRepos} followingCount={followingCount} isLoadingFollowing={isLoadingFollowing} followersCount={followersCount} reposCount={reposCount} onClose={closeModal} />
            )}
        </>
    );
}