import type { Comment } from '../types';

export async function getComments(_postId: string): Promise<Comment[]> {
  // TODO: GET /api/posts/:postId/comments
  return [];
}

export async function addComment(_postId: string, _content: string): Promise<void> {
  // TODO: POST /api/posts/:postId/comments
}
