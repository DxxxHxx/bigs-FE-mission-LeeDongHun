import client from "../utils/client";

const boardService = {
  createPost: async (formData: FormData) => {
    return await client.post("/boards", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  updatePost: async (id: number, formData: FormData) =>
    await client.patch(`/boards/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  deletePost: async (id: number) => await client.delete(`/boards/${id}`),
  getPostDetail: async (id: string) => (await client.get(`/boards/${id}`)).data,
  getPosts: async (page = 0, size = 10) =>
    (await client.get(`boards?sort=createdAt,desc`, { params: { page, size } }))
      .data,
  getPostCategory: async () => (await client.get("/boards/categories")).data,
};
export default boardService;
