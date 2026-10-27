import { FiMoreHorizontal, FiSmile, FiX } from "react-icons/fi";
import { useEffect } from "react";
import comments from "../data/comments.json";
import Comment from "./Comment";
import PostActions from "./PostActions";

function Comments({ post, liked, likes, onToggleLike, onClose }) {
  useEffect(() => {
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflowAnterior;
    };
  }, []);

  const postComments = comments.filter((comment) => comment.postId === post.id);
  const postDate = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(post.createdAt));

  return (
    <div className="comments-overlay">
      <button
        className="icon-button comments-modal__close"
        type="button"
        aria-label="Fechar comentários"
        onClick={onClose}
      >
        <FiX />
      </button>
      <section
        className="comments-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Comentários da publicação de ${post.user}`}
      >
        <div className="comments-modal__image_container">
          <img
            className="comments-modal__image"
            src={post.image}
            alt={post.alt}
          />
        </div>

        <div className="comments-panel">
          <header className="comments-panel__header">
            <div className="comments-panel-user">
              <img
                className="post__avatar"
                src={post.avatar}
                alt={`Foto de ${post.user}`}
              />
              <div className="post__user">
                <strong>{post.user}</strong>
              </div>
            </div>
            <button aria-label="Mais opções" className="icon-button">
              <FiMoreHorizontal />
            </button>
          </header>
          <div className="comments-panel__list">
            <ul style={{ listStyleType: "none" }}>
              {postComments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </ul>
          </div>
          <div className="comments-panel__footer">
            <PostActions
              liked={liked}
              onToggleLike={onToggleLike}
              onComment={() => document.getElementById("comment-text")?.focus()}
            />
            <p className="comments-panel__likes">{likes} curtidas</p>
            <time className="comments-panel__date" dateTime={post.createdAt}>
              {postDate}
            </time>
            <form className="comments-form">
              <button className="comments-form__emoji" type="button" aria-label="Adicionar emoji">
                <FiSmile size={24} />
              </button>
              <label htmlFor="comment-text" className="sr-only">
                Escreva um comentário
              </label>

              <input
                id="comment-text"
                name="comment"
                placeholder="Adicione um comentário"
              />

              <button type="submit" className="comments-form__submit">
                Postar
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Comments;
