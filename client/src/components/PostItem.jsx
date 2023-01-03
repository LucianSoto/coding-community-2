import { useDispatch } from 'react-redux'
import { deletePost } from '../features/posts/postSlice'

function PostItem({ post }) {
  const dispatch = useDispatch()

  return (
    <div className=''>
      {/* <div>{new Date(post.createdAt).toLocaleString('en-US')}</div> */}
      <h2>{post.title}</h2>
      <button onClick={() => dispatch(deletePost(post._id))} className='close'>
        X
      </button>
      
    </div>
  )
}

export default PostItem
