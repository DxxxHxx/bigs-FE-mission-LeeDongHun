import client from "../utils/client";

const boardService = {
  createPost: async (formData: FormData) => {
    return await client.post("/boards", formData);
  },
  updatePost: async (id: number, formData: FormData) =>
    await client.patch(`/boards/${id}`, formData),
  deletePost: async (id: number) => await client.delete(`/boards/${id}`),
  getPostDetail: async (id: number) => (await client.get(`/boards/${id}`)).data,
  getPosts: async (page = 0, size = 10) =>
    (await client.get(`boards`, { params: { page, size } })).data,
  getPostCategory: async () => (await client.get("/boards/categories")).data,
};
export default boardService;
