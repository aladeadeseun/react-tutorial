import { Link, useParams } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'
import { TimeAgo } from '../../components/TimeAgo'
import { selectCurrentUsername } from '../auth/authSlice'
import { PostAuthor } from './PostAuthor'
import { selectPostById } from './postsSlice'
import { ReactionButtons } from './ReactionButtons'

export const SinglePostPage = () => {
  const { postId } = useParams()

  // const post = useAppSelector(state =>
  //   state.posts.find(post => post.id === postId)
  // )

  const post = useAppSelector(state => selectPostById(state, postId!))
  const currentUsername = useAppSelector(selectCurrentUsername)!

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  const canEdit = currentUsername === post.user

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <PostAuthor userId={post.user}/><br />
        <TimeAgo timestamp={post.date}/><br/>
        <ReactionButtons post={post}/>
        {canEdit && (
          <Link to={`/editPost/${post.id}`} className="button">
            Edit Post
          </Link>
        )}
      </article>
    </section>
  )
}