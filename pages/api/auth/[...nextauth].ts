import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', placeholder: 'Username' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (creds) => {
        // console.log(creds);

        // BD lookup
        const promiseData = await new Promise((resolve) => {
          setTimeout(() => {
            resolve('done');
          }, 100);
        });

        return {
          id: 123,
          username: 'Simas',
          userData: { prop1: 'abc', extraData: promiseData },
        };

        // login failed
        return null;
      },
    }),
  ],

  secret: process.env.JWT_SECRET,

  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },

  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
});
