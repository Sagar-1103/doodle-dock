import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import { randomUUID } from "crypto";
import { JWT } from "next-auth/jwt";
import { DefaultSession, DefaultUser, NextAuthOptions, Session } from "next-auth";
import { importJWK,JWTPayload,SignJWT } from "jose";
import { cookies } from "next/headers";
import prismaClient from "./db";

declare module "next-auth" {
  interface Session {
    user:{
      id?:string;
    } & DefaultSession["user"];
    jwtToken?:string;
  }

  interface User extends DefaultUser {
    id?: string;
    jwtToken?:string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    accessToken?: string;
    jwtToken?: string;
  }
}


const generateJWT = async (payload:JWTPayload)=>{
    const secret = process.env.JWT_SECRET;

    const jwk = await importJWK({k:secret,alg:'HS256',kty:"oct"});

    const jwt = await new SignJWT({
      ...payload,
      iat:Math.floor(Date.now()/1000),
      jti:randomUUID(),
    })
    .setProtectedHeader({alg:'HS256'})
    .setExpirationTime('365d')
    .sign(jwk);
    return jwt;
}

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.NEXTAUTH_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.NEXTAUTH_GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET as string,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages:{
    signIn: "/signin",
  },
  session:{
    strategy:"jwt"
  },
    callbacks:{
      async signIn({user}){
        try {          
          if(!user.email || !user.name) return false;
          const createdUser = await prismaClient.user.upsert({
            where:{email:user.email},
            update:{},
            create:{
              email:user.email,
              name:user.name,
              image:user.image,
            }
          })
          const payload = {id:createdUser.id};
          const jwt = await generateJWT(payload);

          const cookieStore = await cookies();

          cookieStore.set('jwtToken',jwt,{
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
          })
          user.jwtToken = jwt;
        } catch (error) {
          console.log(error);
        }
        return true;
      },
      async jwt({token,user,account}){
        const newToken:JWT = token;
        if(account && user){
          newToken.accessToken = account.access_token; 
          newToken.id = user.id;
          newToken.jwtToken = user.jwtToken || newToken.jwtToken ;
        }
        return newToken;
      },
      async session({session,token}){
        const newSession:Session = session;
        if(token){
          session.user.id = token.id;
          session.jwtToken = token.jwtToken;
        }
        return newSession;
      }
  }
} satisfies NextAuthOptions