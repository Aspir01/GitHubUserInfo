import React from 'react';
import './Modal.css';

export default function Modal({ user, followersCount, isLoadingRepos, followingCount, isLoadingFollowing, reposCount, onClose }) {
    const repos = isLoadingRepos ? 'Загрузка...' : reposCount[user.login] || 0;
    const followers = followersCount[user.login] || 0;
    const following = isLoadingFollowing ? 'Загрузка...' : followingCount[user.login] || 0;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal">
                <img alt="head_portrait" src={user.avatar_url} />
                <h2>{user.login}</h2>
                <p>Количество репозиториев: {repos}</p>
                <p>Количество подписчиков: {followers}</p>
                <p>Количество подписок: {following}</p>
                {user.bio && <p>Биография: {user.bio}</p>}
                <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                    Перейти к аккаунту
                </a>
                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
}