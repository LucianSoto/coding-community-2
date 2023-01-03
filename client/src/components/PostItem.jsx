import { useDispatch } from 'react-redux'
import { deletePost } from '../features/posts/postSlice'
import { useNavigate } from 'react-router-dom'

function PostItem({ post }) {
  console.log(post, 'in item')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <div className=''>
      {/* <div>{new Date(post.createdAt).toLocaleString('en-US')}</div> */}
      <h2>{post.title}</h2>
      <p className="likes">{post.likes.length}</p>
      <button onClick={() => dispatch(deletePost(post._id))} className='close'>
        X
      </button>
      <button 
      onClick={()=> navigate(`/update_post/${post._id}`) }
      >
        Edit
      </button>
    </div>
  )
}

export default PostItem
