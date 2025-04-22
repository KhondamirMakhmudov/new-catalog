// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       id: "eimzo",
//       name: "eimzo",
//       credentials: {},
//       async authorize(credentials, req) {
//         const { company_name, company_stir, company_ceo } = credentials;
//         const res = await fetch("https://backend.mkinfo.uz/api/imzo", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             company_name,
//             company_stir,
//             company_ceo,
//           }),
//         });

//         const user = await res.json();

//         if (res.ok && user) {
//           return user;
//         } else return null;
//       },
//     }),

//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         code: { label: "Code", type: "text" },
//       },
//       async authorize(credentials) {
//         try {
//           console.log("Received code:", credentials.code);
//           const res = await fetch(
//             `https://backend.mkinfo.uz/fastapi/auth/callback/?code=${credentials.code}`,
//             {
//               method: "GET",
//               headers: { "Content-Type": "application/json" },
//             }
//           );

//           if (!res.ok) throw new Error("Failed to fetch");

//           const data = await res.json();
//           console.log("Parsed Data:", data);

//           if (data.token) {
//             return {
//               token: data.token,
//               id: data.id,
//               full_name: data.full_name,
//               pin: data.pin,
//               role: data.role,
//             };
//           } else {
//             return null; // Authentication failed
//           }
//         } catch (error) {
//           console.error("Authentication error:", error);
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.accessToken = user.token;
//         token.id = user.id;
//         token.full_name = user.full_name;
//         token.pin = user.pin;
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user = {
//         id: token.id,
//         full_name: token.full_name,
//         pin: token.pin,
//         role: token.role,
//       };
//       session.accessToken = token.accessToken;
//       return session;
//     },
//   },
//   // session: {
//   //     strategy: "jwt"
//   // },
//   pages: {
//     signIn: "/auth/e-imzo",
//     // login: "/auth/login",
//   },
//   secret:
//     process.env.NEXTAUTH_SECRET ||
//     "Ey7nTKnggBc0bRN8WUjyShw2qzOZ6KW4fUyqcKBePxY=",
// };
// export default NextAuth(authOptions);

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "eimzo",
      name: "eimzo",
      credentials: {},
      async authorize(credentials, req) {
        const { company_name, company_stir, company_ceo, pkcs7 } = credentials;
        const formData = new FormData();
        formData.append("pkcs7", pkcs7);
        const res = await fetch("https://mk.shaffofqurilish.uz/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: formData,
        });

        const user = await res.json();

        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {},
        password: {},
        captcha_response: {},
        captcha_key: {},
      },
      async authorize(credentials, req) {
        debugger;
        const { email, password, captcha_response, captcha_key } = credentials;
        const res = await fetch("https://backend.mkinfo.uz/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            captcha_response,
            captcha_key,
          }),
        });

        const user = await res.json();

        if (res.ok) {
          return user;
        } else return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  // session: {
  //     strategy: "jwt"
  // },
  pages: {
    signIn: "/auth/e-imzo",
    // login: "/auth/login",
  },
  secret:
    process.env.NEXTAUTH_SECRET ||
    "Ey7nTKnggBc0bRN8WUjyShw2qzOZ6KW4fUyqcKBePxY=",
};
export default NextAuth(authOptions);
