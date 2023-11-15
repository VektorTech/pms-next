import { POST } from "./route";
import { describe, expect, it } from "@jest/globals";

describe("POST /doctor/register/api", function () {
  it("Registers a new doctor", async function () {
    const formData = new FormData();
    formData.append("firstName", "Ashley");
    formData.append("middleName", "Brittney");
    formData.append("lastName", "Thomas");
    formData.append("gender", "FEMALE");
    formData.append("dateOfBirth", "1985-02-21");
    formData.append("address", "12 Front Lane Ave, Kingston");
    formData.append("phone", "8763349987");
    formData.append("email", "abthomas01@gmail.com");
    formData.append("password", "__unkn0wn44-**78");
    formData.append("roomNo", "4");
    formData.append("specialty", "Orthodontist");
    const req = new Request("http://localhost/doctor/register/api", {
      method: "POST",
      body: formData,
    });
    const res = await POST(req);
    expect(res.headers.getSetCookie().join(" ")).toMatch(/session_id=/);
  });
});
