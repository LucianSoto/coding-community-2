import { useDispatch } from 'react-redux'
import { deletePost } from '../features/posts/postSlice'
import { useNavigate } from 'react-router-dom'
import { GoTrashcan } from 'react-icons/go'
import { BiEdit } from 'react-icons/bi'
import { AiOutlineLike } from 'react-icons/ai'
import { FcLike } from 'react-icons/fc'

function PostItem({ post }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  console.log(post[0], 'in postitem')
  return (
    <div className='border shadow-xl mb-10 p-10 rounded-lg'>
      <p className='text-xl mb-4'>{post[0].title}</p >
      {/* { post ?
        post.imgUrls.map((img, i) => (
        <img key={i} className='' src={img} alt={post.title}/>
      ))
      :
      null
      } */}
      <div className="bottom-con w-full flex justify-between text-2xl">
        <div className=" flex items-center ">
          <FcLike className=''/>
          <p className="likes ml-2">{post[0].likes.length}</p>
        </div>
        <div className=" flex items-center">
          <GoTrashcan onClick={() => dispatch(deletePost(post[0]._id))} className='close mr-2'/>
          <BiEdit onClick={()=> navigate(`/update_post/${post[0]._id}`) } className=''/>
        </div>
      </div>
    </div>
  )
}

export default PostItem
