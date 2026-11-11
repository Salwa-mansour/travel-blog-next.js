import { getPostComments } from '@/actions/commentActions'
// import { buildCommentTree } from '@/util/utilFunctions'
import { buildFlatThread } from '@/util/utilFunctions';
import CommentItem from '@/components/post/CommentItem'
import "@/css/comment.css";


interface CommentListProps {
  postId: string
}

export default async function CommentList({ postId }: CommentListProps) {
 
  const comments = await getPostComments(postId)
  const commentList = buildFlatThread(comments)

  if (!commentList || commentList.length === 0) {
    return (
       <div className="comment-container">
         <p >No comments yet. Be the first to share your thoughts!</p>
      </div>
   )}

  return (
    <div className="comment-container">
      <h3 className="title">comments of this post</h3>
      
      {commentList.map((commentItem: any) => (
        <CommentItem key={commentItem._id} postId={postId} comment={commentItem} />
      ))}
    </div>
  )
}