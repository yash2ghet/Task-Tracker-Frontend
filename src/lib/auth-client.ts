// import { createAuthClient } from "better-auth/react";
// import { adminClient } from "better-auth/client/plugins";
// import { ac, admin, manager, employee } from "@/lib/permission";

// export const authClient = createAuthClient({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,

//   fetchOptions: {
//     credentials: "include",
//   },

//   plugins: [
//     adminClient({
//       ac,
//       roles: {
//         admin,
//         manager,
//         employee,
//       },
//     }),
//   ],
// });

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  fetchOptions: {
    credentials: "include",
  },
});