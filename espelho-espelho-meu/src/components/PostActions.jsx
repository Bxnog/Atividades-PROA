import { FiBookmark, FiHeart, FiMessageCircle, FiSend } from "react-icons/fi";

function PostActions({ liked, onToggleLike, onComment }) {
  return (
    <div className="post__actions">
      <div className="post__actions-main">
        <button
          className="icon-button"
          type="button"
          aria-label={liked ? "Descurtir" : "Curtir"}
          aria-pressed={liked}
          onClick={onToggleLike}
        >
          <FiHeart
            style={{
              fill: liked ? "#ff3040" : "transparent",
              color: liked ? "#ff3040" : "currentColor",
            }}
          />
        </button>
        <button
          className="icon-button"
          type="button"
          aria-label="Comentar"
          onClick={onComment}
        >
          <FiMessageCircle />
        </button>
        <button className="icon-button" type="button" aria-label="Enviar">
          <FiSend />
        </button>
      </div>
      <button className="icon-button" type="button" aria-label="Salvar">
        <FiBookmark />
      </button>
    </div>
  );
}

export default PostActions;
