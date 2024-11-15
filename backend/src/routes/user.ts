import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { use } from 'hono/jsx'
import { signupInput, signinInput } from "@nikhil-duduka/commonzod";
export const userRouter = new Hono<{
    Bindings : {
      DATABASE_URL : string , 
      JWT_SECRET : string
    }
  }>()

userRouter.post('signup', async (c) => {
  const body = await c.req.json();
  const {success} = signupInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      msg : "invalid signup inputs pw should be more than 6 digits , email shud have @gmail.com"
    })
  }
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password
			}
		});
		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ jwt });
	} catch(e) {
		c.status(403);
		return c.json({ error: "error while signing up" });
	}
})

userRouter.post('/signin', async (c) => {
  const body = await c.req.json();
  const {success} = signinInput.safeParse(body);
  if(!success){
    c.status(411);
    c.json({
      msg : "check sign in user.ts"
    })
  }
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	try{
    const user = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    });
  
    if (!user) {
      c.status(403);
      return c.json({ error: "Incorrect Creds" });
    }
  
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  }catch(e){
    console.log(e);
    c.status(403);
    return c.text("invalid");
  }
}); 
