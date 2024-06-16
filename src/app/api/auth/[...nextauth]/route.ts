import NextAuth from "next-auth/next";
import { authOptions } from "./options";

// Creating the handler for the NextAuthOptions object
const handler = NextAuth(authOptions);

// handler should be exported as POST and GET its mandatory
export { handler as GET, handler as POST };