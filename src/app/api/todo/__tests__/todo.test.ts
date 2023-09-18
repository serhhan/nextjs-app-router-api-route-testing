import { GET as getHandler, POST as postHandler } from "../route";
import { createMocks } from "node-mocks-http";

describe("api/todo", () => {
  describe("GET", () => {
    it("should return a list of todos", async () => {
      const response = await getHandler();
      expect(response.status).toBe(200);

      expect(await response.json()).toEqual([
        { id: 0, task: "Learn API testing with Next.js 13", done: false },
        { id: 1, task: "Deploy the app", done: false },
      ]);
    });
  });
});
