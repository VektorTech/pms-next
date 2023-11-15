import { POST } from "./route";
import { describe, expect, it } from "@jest/globals";

describe("POST /patient/appointments/new/api", function () {
  it("Creates a new user as patient", async function () {
    const formData = new FormData();

    const req = new Request("http://localhost/patient/appointments/new/api", {
      method: "POST",
      body: formData,
    });
    // const res = await POST(req);
  });
});
