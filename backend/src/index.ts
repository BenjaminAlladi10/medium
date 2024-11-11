import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { use } from 'hono/jsx'
import { userRouter } from './routes/user'
// import { blogRouter } from './routes/blog'
import { bookRouter } from './routes/blog'


const app = new Hono<{
  Bindings : {
    DATABASE_URL : string , 
    JWT_SECRET : string
  }
}>()

app.use('/api/v1/blog/*', async (c, next) => {
  //Bearer token is the format for authorization token
  const header = c.req.header("authorization") || "";
  console.log(header);
  const token = header.split(" ")[1];
  console.log(token);
  const response = await verify(token,c.env.JWT_SECRET);
  console.log(response);
  // @ts-ignore
  if(response.id){
    await next();
  }else{
    c.status(403);
    return c.json({error : "unauthorised"})
  }
})

// app.use('/api/v1/blog/*', async (c, next) => {
//   const header = c.req.header("authorization") || "";
//   console.log(header);
  
//   const token = header.split(" ")[1]; // Bearer token extraction
//   if (!token) {
//     c.status(403);
//     return c.json({ error: "unauthorized, no token provided" });
//   }

//   try {
//     const response = verify(token, c.env.JWT_SECRET); // Use `await` if `verify` is async
//     // Check if the response contains a valid `id`
//     if (response && response.id) {
//       await next();
//     } else {
//       c.status(403);
//       return c.json({ error: "unauthorized" });
//     }
//   } catch (e) {
//     console.error("Token verification failed:", e);
//     c.status(403);
//     return c.json({ error: "unauthorized, token verification failed" });
//   }
// });


app.get("/",(c)=>{ //c stands for context it consists of all the req,res,next params
  return c.text("hono");
})

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", bookRouter);

export default app






