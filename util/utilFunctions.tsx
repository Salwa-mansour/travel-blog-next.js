// Helper function to turn flat comments into a nested tree structure
export function buildCommentTree(comments: any[]) {
  const map = new Map()
  const roots: any[] = []

  comments.forEach((comment) => {
    map.set(comment._id, { ...comment, replies: [] })
  })

  comments.forEach((comment) => {
    const node = map.get(comment._id)
    if (comment.parentId) {
      const parent = map.get(comment.parentId)
      if (parent) {
        parent.replies.push(node)
      } else {
        roots.push(node) // Fallback if parent is missing
      }
    } else {
      roots.push(node)
    }
  })

  return roots
}