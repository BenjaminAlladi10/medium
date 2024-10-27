// import { Hono } from 'hono'
// import { PrismaClient } from '@prisma/client/edge'
// import { withAccelerate } from '@prisma/extension-accelerate'
// import { decode, sign, verify } from 'hono/jwt'
// import { use } from 'hono/jsx'

// interface JWTPayload {
//     id: string;
// }

// type Variables = {
//     message: string
// }

// export const blogRouter = new Hono<{
//     Bindings: {
//         DATABASE_URL: string,
//         JWT_SECRET: string
//     },
//     Variables: {
//         userId: string;
//     };
// }>();



// blogRouter.use("*", async (c, next) => {
//     const authHeader = c.req.header("authorization");
    
//     if (!authHeader) {
//         c.status(401);
//         return c.json({ 
//             error: "Authorization header missing",
//             msg: "You are not logged in" 
//         });
//     }

//     // Remove "Bearer " if present
//     const token = authHeader.replace("Bearer ", "");
    
//     try {
//         const user = await verify(token, c.env.JWT_SECRET);
//         if (!user) {
//             c.status(401);
//             return c.json({ 
//                 error: "Invalid token",
//                 msg: "You are not logged in" 
//             });
//         }

//         // Set the userId in context
//         c.set('userId', String(user.id));
//         await next();
//     } catch (error) {
//         console.error("JWT verification error:", error);
//         c.status(401);
//         return c.json({ 
//             error: "Token verification failed",
//             msg: "You are not logged in" 
//         });
//     }
// });


// // blogRouter.post('/', async(c) => {
// //     const prisma = new PrismaClient({
// // 		datasourceUrl: c.env?.DATABASE_URL	,
// // 	}).$extends(withAccelerate());

// // 	const body = await c.req.json();
// //     const authorId = c.get('userId');
// // 	try{
// //         const blog  = await prisma.post.create({
// //             data : {
// //                 title : body.title , content : body.content ,
// //                 authorId : authorId
// //             }
// //         })
// //         return c.json({id : blog.id})
// //     }catch(e){
// //         console.log(e);
// //         return c.text("unable to post blog");
// //     }
// // })

// blogRouter.post('/', async (c) => {
// 	const userId = c.get('userId');
// 	const prisma = new PrismaClient({
// 		datasourceUrl: c.env?.DATABASE_URL	,
// 	}).$extends(withAccelerate());

// 	const body = await c.req.json();
// 	const post = await prisma.post.create({
// 		data: {
// 			title: body.title,
// 			content: body.content,
// 			authorId: userId
// 		}
// 	});
// 	return c.json({
// 		id: post.id
// 	});
// })

// blogRouter.put('/blog', async(c) => {
//     const prisma = new PrismaClient({
// 		datasourceUrl: c.env?.DATABASE_URL,
// 	}).$extends(withAccelerate());

// 	const body = await c.req.json();

//     try{
//         const updt = prisma.post.update({
//             where : {
//                 id : body.id
//             },
//             data :{
//                 title : body.title , 
//                 content : body.content
//             }
//         })
//         return c.json({
//             id : body.id
//         })
//     }
//     catch(e){
//         console.log(e);
//         return c.text("error updating");
//     }
// })

// blogRouter.get("/:id" , async(c)=>{
//     const prisma = new PrismaClient({
// 		datasourceUrl: c.env?.DATABASE_URL,
// 	}).$extends(withAccelerate());

// 	const id = c.req.param("id");
//     try{
//         const blog  = await prisma.post.findFirst({
//             where : {
//                 id : id
//             } ,
//         })
//         return c.json({
//             blog
//         })
//     }catch(e){
//         console.log(e);
//         return c.status(422);
//         c.text("unable to fetch")
//     }
// })

// //should be adding pagination here 
// blogRouter.get('/bulk', async(c) => {
// 	const prisma = new PrismaClient({
// 		datasourceUrl: c.env?.DATABASE_URL,
// 	}).$extends(withAccelerate());
//     const blogs = prisma.post.findMany();
//     return c.json({blogs})
// });

// blogRouter.get('/nik', async(c) => {
// 	const prisma = new PrismaClient({
// 		datasourceUrl: c.env?.DATABASE_URL,
// 	}).$extends(withAccelerate());
//     // const authorId = c.get('userId');
//     // console.log(authorId);
//     return c.json({data : "hii"})
// });


// blogRouter.get('/test-token', async (c) => {
//     const testToken = await sign({ id: "15daedbd-db02-4608-a9d1-f18bc3905199-id" }, c.env.JWT_SECRET);
//     return c.json({
//         token: testToken
//     });
// });

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const bookRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
    }
}>();

bookRouter.use(async (c, next) => {
    const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.JWT_SECRET);
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	c.set('userId', String(payload.id));
	await next()
});

bookRouter.post('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId
		}
	});
	return c.json({
		id: post.id
	});
})

bookRouter.put('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post');
});

bookRouter.get('/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const post = await prisma.post.findUnique({
		where: {
			id
		}
	});

	return c.json(post);
})