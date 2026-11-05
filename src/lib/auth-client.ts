

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://studiospace-server-nine-psi.vercel.app",
  fetchOptions: {
    credentials: "include",
  },
});
