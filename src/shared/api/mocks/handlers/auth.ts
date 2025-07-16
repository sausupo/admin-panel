import { http } from "../http";

// Mock database
let users: User[] = [
  {
    id: 1,
    email: "user@example.com",
    password: "P@ssw0rd123",
    name: "Test User",
    createdAt: new Date().toISOString(),
  },
];

// Types
type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  createdAt: string;
};

type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

// Utility functions
const generateToken = (payload: object): string => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = btoa(
    JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + 3600 }),
  );
  return `${header}.${body}.mock-signature`;
};

const validatePassword = (password: string): boolean => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
};

// Mock handlers
export const authHandlers = [
  // Registration
  http.post("/auth/register", async ({ request }) => {
    const { email, password, name } = await request.json();

    // Validation
    if (!email || !password || !name) {
      return new Response(
        JSON.stringify({
          error: "Validation failed",
          details: [
            !email && "Email is required",
            !password && "Password is required",
            !name && "Name is required",
          ].filter(Boolean),
        }),
        { status: 400 },
      );
    }

    if (!validatePassword(password)) {
      return new Response(
        JSON.stringify({
          error:
            "Password must be at least 8 characters with 1 number and 1 special character",
        }),
        { status: 400 },
      );
    }

    if (users.some((user) => user.email === email)) {
      return new Response(
        JSON.stringify({
          error: "Email already exists",
          code: "EMAIL_EXISTS",
        }),
        { status: 409 },
      );
    }

    // Create user
    const newUser: User = {
      id: users.length + 1,
      email,
      password,
      name,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);

    // Generate tokens
    const response: AuthResponse = {
      accessToken: generateToken({ userId: newUser.id }),
      refreshToken: generateToken({ userId: newUser.id, tokenType: "refresh" }),
      expiresIn: 3600,
    };

    return new Response(JSON.stringify(response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  }),

  // Login
  http.post("/auth/login", async ({ request }) => {
    const { email, password } = await request.json();

    const user = users.find((u) => u.email === email);

    if (!user || user.password !== password) {
      return new Response(
        JSON.stringify({
          error: "Invalid credentials",
        }),
        { status: 401 },
      );
    }

    const response: AuthResponse = {
      accessToken: generateToken({ userId: user.id }),
      refreshToken: generateToken({ userId: user.id, tokenType: "refresh" }),
      expiresIn: 3600,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),

  // Token refresh
  http.post("/auth/refresh", async ({ request }) => {
    const { refreshToken } = await request.json();

    try {
      // Simple mock token validation
      const [, body] = refreshToken.split(".");
      const payload = JSON.parse(atob(body));

      if (payload.tokenType !== "refresh") {
        throw new Error("Invalid token type");
      }

      const response: AuthResponse = {
        accessToken: generateToken({ userId: payload.userId }),
        refreshToken: generateToken({
          userId: payload.userId,
          tokenType: "refresh",
        }),
        expiresIn: 3600,
      };

      return new Response(JSON.stringify(response), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Refresh token error:", error);
      return new Response(
        JSON.stringify({
          error: "Invalid refresh token",
        }),
        { status: 401 },
      );
    }
  }),
];

// Utility for tests
export const resetAuthMocks = () => {
  users = [
    {
      id: 1,
      email: "user@example.com",
      password: "P@ssw0rd123",
      name: "Test User",
      createdAt: new Date().toISOString(),
    },
  ];
};
