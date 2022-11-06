export interface CommentariesSpecParams {
  pageIndex: number;
  pageSize:number;
  sort: 'lastUpdatedAsc' | 'lastUpdatedDesc' | 'dateCreatedAsc' | 'dateCreatedDesc'
  search?: string;
  postId?: number;
  userId?: number;
  approved?: boolean
}