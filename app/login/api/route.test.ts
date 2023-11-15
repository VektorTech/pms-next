import { POST } from "./route";
import { describe, expect, it } from "@jest/globals";

describe("POST /login/api", function () {
  it("Creates a new user as patient", async function () {
    const formData = new FormData();
    formData.append("email", "johnbrown@gmail.com");
    formData.append("password", "R4nD0m:p@55w0rD");
    const req = new Request("http://localhost/login/api", {
      method: "POST",
      body: formData,
    });
    const res = await POST(req);
    expect(res.headers.getSetCookie().join(" ")).toMatch(/session_id=/);
  });
});
