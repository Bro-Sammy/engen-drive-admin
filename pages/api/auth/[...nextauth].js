import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials' 
import connectMongo from "../../../utils/connectDB";
import Admin from "../../../models/Admin";
import bcrypt from 'bcrypt'
connectMongo()

export default NextAuth({
    secret: process.env.NEXTAUTH_SECRET,

    providers:[
        
        CredentialsProvider({
            
            async authorize(credentials, req){
            //    return console.log(credentials)
               const email = credentials.email;
               const password = credentials.password;
               const user = await Admin.findOne({email})
               if(!user){
                   return registerNewAdmin({email, password})
               }
               if(user){
                //    console.log("MONGODB FIRST Found",user)
                   return signInUser({password, user})
               }
            }
        })
    ],
    callbacks:{
        
        async jwt({token, user}){
            if(user){
                token.id = user.id;
                token.name = {username: user.username}
                // console.log("JWT", token)
            }
            return token
        },
        async redirect({ url, baseUrl}){ 
            return baseUrl
        },
        async session({session, token, user}){
            if(token){
                session.id = token.id
                session.name = {username:token.name.username}
                // console.log("SESSION", session)
            }
            return session
        }, 
        
    },
    
    jwt: {
        secret: process.env.NEXTAUTH_SECRET
    },
    pages:{
        signIn: '/',
        signOut:'/'
    }
})

const signInUser = async ({password, user})=>{
    if(password === ''){
        throw new Error('Please enter password')
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error('Password does not match')
    }
 
    return user
}

const registerNewAdmin = async ({email, password}) => {
   
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    password = await bcrypt.hash(password, salt);
  //   console.log(password)

  // create new farmer
  const user = await Admin.create({email, password})

  return user
}