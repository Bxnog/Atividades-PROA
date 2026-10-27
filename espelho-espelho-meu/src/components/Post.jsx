import { FiMoreHorizontal } from 'react-icons/fi';
import { useState } from 'react';
import Comments from './Comments';
import PostActions from './PostActions';
function Post({ post }) {

  const [likePost, setLikePost] = useState(false);
  const [showComments, setShowComments] = useState(false)
  const [likes, setLikes] = useState(post.likes);

  function toggleLike() {
    setLikes((count) => count + (likePost ? -1 : 1));
    setLikePost((liked) => !liked);
  }
  return (
    <>
      {
        showComments && (
          <Comments
            post={post}
            liked={likePost}
            likes={likes}
            onToggleLike={toggleLike}
            onClose={() => setShowComments(false)}
          />
        )
      }
      <article className="post">
        <header className="post__header">
          <img className="post__avatar" src={post.avatar} alt={`Foto de ${post.user}`} />
          <div className="post__user"><strong>{post.user}</strong>
            <span>{post.location}</span>
          </div>
          <button className="icon-button post__more" type="button" aria-label="Mais opções">
            <FiMoreHorizontal />
          </button>
        </header>
        <img className="post__image" src={post.image} alt={post.alt} />
        <div className="post__content">
          <PostActions
            liked={likePost}
            onToggleLike={toggleLike}
            onComment={() => setShowComments(true)}
          />
          <p className="post__likes"><strong>{likes} curtidas</strong></p>
          <p className="post__caption"><strong>{post.user}</strong>{post.caption}</p>
        </div>
      </article>
    </>
  )
}

export default Post
