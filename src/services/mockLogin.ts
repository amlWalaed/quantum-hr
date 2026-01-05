const VALID_EMAIL = "q@quantum.io";
const VALID_PASSWORD = "qTask123#";

const MOCK_TOKENS: AuthTokens = {
  access: "fake-token",
  refresh: "fake-refresh",
};

export const mockLogin = (
  credentials: LoginCredentials
): Promise<AuthTokens> => {
  return new Promise((resolve, reject) => {
    const delay = 1000 + Math.random() * 1000;

    setTimeout(() => {
      const { email, password } = credentials;

      if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        resolve(MOCK_TOKENS);
      } else {
        reject(new Error("Invalid email or password. Please try again."));
      }
    }, delay);
  });
};

export const mockLogout = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};

export const validateToken = (token: string): boolean => {
  return token === MOCK_TOKENS.access;
};
