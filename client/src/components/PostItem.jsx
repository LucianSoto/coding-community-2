import { useDispatch } from 'react-redux'
import { deletePost } from '../features/posts/postSlice'
import { useNavigate } from 'react-router-dom'

function PostItem({ post }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  console.log(post, 'in postitem')
  return (
    <div className=''>
      {/* <div>{new Date(post.createdAt).toLocaleString('en-US')}</div> */}
      <h2>{post.title}</h2>
      { post.imgUrls.map((img, i) => (
        <img src={img}/>
      ))}
      <p className="likebutton">Like</p>
      <p className="likes">♥ {post.likes.length}</p>
      {/* make like a button */}
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
