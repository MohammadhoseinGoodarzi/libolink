// TODO: replace with real HTTP calls once the API is ready
// Each function maps 1:1 to a future endpoint — swap the body only, callers stay the same.

export interface CreatePostPayload {
  content: string;
  imageFile?: File;
}

export async function createPost(_payload: CreatePostPayload): Promise<void> {
  // POST /api/posts  (multipart/form-data when imageFile is present)
}

export async function likePost(_postId: string): Promise<void> {
  // POST /api/posts/:postId/like
}

export async function unlikePost(_postId: string): Promise<void> {
  // DELETE /api/posts/:postId/like
}

export async function sharePost(_postId: string): Promise<void> {
  // POST /api/posts/:postId/share
}
