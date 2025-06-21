const QUERY_KEYS = {
  getPostList: (page: number) => ["postList", `${page} page`] as const,
  getPostDetail: (id: string) => ["post", id] as const,
};
export default QUERY_KEYS;
