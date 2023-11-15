import { POST } from "./route";
import { describe, expect, it } from "@jest/globals";

describe("POST /patient/register/api", function () {
  it("Creates a new user as patient", async function () {
    const formData = new FormData();
    formData.append("firstName", "John");
    formData.append("lastName", "Brown");
    formData.append("gender", "MALE");
    formData.append("dateOfBirth", "1800-05-09");
    formData.append("address", "3861 Rodney Street, Harvester, Missouri");
    formData.append("phone", "8769932343");
    formData.append("email", "johnbrown@gmail.com");
    formData.append("password", "R4nD0m:p@55w0rD");
    const req = new Request("http://localhost/patient/register/api", {
      method: "POST",
      body: formData,
    });
    const res = await POST(req);
    expect(res.headers.getSetCookie().join(" ")).toMatch(/session_id=/);
  });
});
