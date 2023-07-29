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
                <div className='info-text'>
                    <p>Репозиторий:</p>
                    <p>Подписчиков:</p>
                    <p>Подписок:</p>
                </div>
                <div className='info-text num'>
                    <p>{repos}</p>
                    <p>{followers}</p>
                    <p>{following}</p>
                </div>
                {user.bio && <p>Биография: {user.bio}</p>}
                <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                    Перейти к аккаунту
                </a>
                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
}