import React from 'react';
import './Modal.css';

export default function Modal({ user, onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal">
                <img alt="head_portrait" src={user.avatar_url} />
                <h2>{user.login}</h2>
                <p>Количество репозиториев: {user.reposCount || 0}</p>
                <p>Дата создания аккаунта: {user.created_at}</p>
                {user.bio && <p>Биография: {user.bio}</p>}
                <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                    Перейти к аккаунту
                </a>
                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
}