import { jest, expect, describe } from "@jest/globals";

const loginUserMock = jest.fn().mockResolvedValue({
  token: "mocked_token",
  user: {
    email: "test@example.com",
    subscription: "starter",
  },
});

jest.unstable_mockModule("../services/authServices.js", () => ({
  // rewrite default export to mock loginUser function
  default: {
    loginUser: loginUserMock,
  },
}));

// import controller directly from file to test it
const { loginController } = await import("../controllers/authControllers.js");

describe("loginController function testing", () => {
  it("Should return a token and user data", async () => {
    const req = {
      body: {
        email: "test@example.com",
        password: "password123",
      },
    };
    // mock response object
    const json = jest.fn();
    const res = {
      status: jest.fn().mockReturnValue({ json }),
      json,
    };

    await loginController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: "mocked_token",
      user: {
        email: "test@example.com",
        subscription: "starter",
      },
    });

    const response = res.json.mock.calls[0][0];

    expect(typeof response.token).toBe("string");
    expect(typeof response.user.email).toBe("string");
    expect(typeof response.user.subscription).toBe("string");
  });
});
