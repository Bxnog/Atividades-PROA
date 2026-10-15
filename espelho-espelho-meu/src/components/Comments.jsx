import { FiBookmark, FiHeart, FiMessageCircle, FiMoreHorizontal, FiSend, FiX } from 'react-icons/fi'
import { useState, useEffect } from 'react';

function Comments({ post, onClose }) {
    useEffect(() => {
        const overflowAnterior = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = overflowAnterior;
        };
    }, []);


    const [likePost, setLikePost] = useState(false);
    return (
        <div className="comments-overlay">
            <section
                className="comments-modal"
                role="dialog"
                aria-modal="true"
                aria-label={`Comentários da publicação de ${post.user}`}
            >
                <button
                    className="icon-button comments-modal__close"
                    aria-label="Fechar comentários"
                    onClick={onClose}
                >
                    <FiX />
                </button>
                <div className='comments-modal__image_container'>
                    <img className="comments-modal__image" src={post.image} alt={post.alt} />
                </div>

                <div className="comments-panel">
                    <header className="comments-panel__header">
                        <div className='comments-panel-user'>
                            <img className="post__avatar" src={post.avatar} alt={`Foto de ${post.user}`} />
                            <div className="post__user"><strong>{post.user}</strong></div>
                        </div>
                        <button aria-label='Mais opções' className='icon-button'>
                            <FiMoreHorizontal />
                        </button>
                    </header>
                    <div className="comments-panel__list">...</div>
                    <div className="comments-panel__footer">...</div>
                </div>
            </section>
        </div>
    )
}
export default Comments