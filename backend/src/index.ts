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
  const token = header.split(" ")[1];
  const response = verify(header,c.env.JWT_SECRET);
  // @ts-ignore
  if(response.id){
    next();
  }else{
    c.status(403);
    return c.json({error : "unauthorised"})
  }
})

app.get("/",(c)=>{ //c stands for context it consists of all the req,res,next params
  return c.text("hono");
})

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", bookRouter);

app.get('/api/v1/blog/:id', (c) => {
	const id = c.req.param('id')
	console.log(id);
	return c.text('get blog route')
})

app.post('/api/v1/blog', (c) => {

	return c.text('signin route')
})

app.put('/api/v1/blog', (c) => {
	return c.text('signin route')
})

export default app






