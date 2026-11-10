// Helper function to group all replies under their top-level root comment
export function buildFlatThread(comments: any[]) {
  const map = new Map()
  const roots: any[] = []

  // 1. Initialize all comments in a map with an empty replies array
  comments.forEach((comment) => {
    map.set(comment._id, { ...comment, replies: [] })
  })

  // 2. Helper to find the top-most root comment ID by walking up the parent chain
  function getRootId(commentId: string): string {
    let current = map.get(commentId)
    while (current && current.parentId && map.has(current.parentId)) {
      current = map.get(current.parentId)
    }
    return current ? current._id : commentId
  }

  // 3. Assign every child/nested reply to its ultimate root comment's replies list
  comments.forEach((comment) => {
    const node = map.get(comment._id)
    
    if (comment.parentId) {
      const rootId = getRootId(comment._id)
      const rootNode = map.get(rootId)
      
      if (rootNode && rootNode._id !== comment._id) {
        rootNode.replies.push(node)
      } else {
        roots.push(node) // Fallback if root cannot be found
      }
    } else {
      roots.push(node) // Top-level comments go straight to roots
    }
  })

  return roots
}


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