const QUERY_KEYS = {
  getPostList: (page: number) => ["postList", `${page} page`] as const,
};
export default QUERY_KEYS;
