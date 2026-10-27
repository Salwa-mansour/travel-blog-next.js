import { getPostComments } from '@/actions/commentActions'
import { buildCommentTree } from '@/util/utilFunctions'
import CommentItem from '@/components/post/CommentItem'

interface CommentListProps {
  postId: string
}

export default async function CommentList({ postId }: CommentListProps) {
 
  const comments = await getPostComments(postId)
  const commentList = buildCommentTree(comments)

  if (!commentList || commentList.length === 0) {
    return <p className="text-sm text-gray-500 my-4">No comments yet. Be the first to share your thoughts!</p>
  }

  return (
    <div className="border-l-2 border-gray-200 pl-4 my-4 space-y-3">
      {commentList.map((commentItem: any) => (
        <CommentItem key={commentItem._id} postId={postId} comment={commentItem} />
      ))}
    </div>
  )
}