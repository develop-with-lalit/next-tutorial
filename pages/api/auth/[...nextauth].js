import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import fs from "fs";
import path from "path";

const saveTo = path.join(process.cwd(), "data", "users");

export function readUsersFromFile() {
  let fileDataString = fs.readFileSync(saveTo).toString();
  fileDataString = "[" + fileDataString.slice(0, -2) + "]";
  return JSON.parse(fileDataString);
}

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      //   credential: {
      authorize: async (credentials) => {
        const allUserList = readUsersFromFile();
        const userData = allUserList.find(
          (user) => user.email === credentials.email
        );
        console.log(userData);
        if (userData?.email && userData?.password) {
          if (userData.password === credentials.password) {
            return userData;
          } else {
            throw new Error("Wrong password");
          }
        } else {
          throw new Error("No user found");
        }
        // },
      },
    }),
  ],
});
