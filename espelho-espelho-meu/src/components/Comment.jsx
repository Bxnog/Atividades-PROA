import { FiHeart } from "react-icons/fi";

function Comment({ comment }) {
  const dataComentario = new Date(comment.createdAt);

  const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "short",
  })
    .format(dataComentario)
    .replace(/\.$/, "");

  // No Vite, arquivos da pasta public são acessados pela raiz.
  const avatar = comment.avatar.replace(/^\/public/, "");

  return (
    <li className="comment">
      <img
        className="comment__avatar"
        src={avatar}
        alt={`Foto de perfil de ${comment.user}`}
        style={{height: 32, width: 32}}
      />

      <div className="comment__content">
        <p className="comment__text">
          <strong className="comment__username">{comment.user}</strong>{" "}
          {comment.text}
        </p>

        <div className="comment__details">
          <span>1d</span>
          <span>{comment.likes} curtidas</span>

          <button type="button" className="comment__reply">
            Responder
          </button>
        </div>
      </div>

      <button
        type="button"
        className="comment__like"
        aria-label={`Curtir comentário de ${comment.user}`}
      >
        <FiHeart size={12} />
      </button>
    </li>
  );
}

export default Comment;