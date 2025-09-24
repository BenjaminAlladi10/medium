import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createPostInput ,updatePostInput } from "@nikhil-duduka/commonzod";
import { GoogleGenerativeAI } from "@google/generative-ai";

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
    //@ts-ignore
        c.set('userId', payload.id);
        await next()
});

bookRouter.post('/', async (c) => {
        const userId = c.get('userId');
        const prisma = new PrismaClient({
                datasourceUrl: c.env?.DATABASE_URL      ,
        }).$extends(withAccelerate());

        const body = await c.req.json();
    const {success} = createPostInput.safeParse(body);
    if(!success){
        c.status(413);
        return c.json({ error: "error in blog.ts post route" });

    }
        try{
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId, 
                createdAt : body.createdAt
            }
        });
        return c.json({
            id: post.id
        });
    }catch(error){
        c.status(413);
        return c.json({ error: "could not post check blog.ts backend dir" });
    }
})

bookRouter.put('/', async(c) => {
    const body = await c.req.json();
    const {success} = createPostInput.safeParse(body);
    if(!success){
        c.status(413);
        return c.json({ error: "error in blog.ts post route" });
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        });
        return c.json({
            id: body.id
        });
    } catch(e) {
        console.log(e);
        return c.text("error updating");
    }
});

    //pagination could be good
    bookRouter.get('/bulk', async(c) => {
        const prisma = new PrismaClient({
                datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany({
        select : {
            content : true ,
            title : true ,
            id : true ,
            author : {
                select : {
                    name : true
                }
            } , 
            createdAt : true
        }
    });
    return c.json({"blogs" : blogs})
});

    bookRouter.get("/:id" , async(c)=>{
        const prisma = new PrismaClient({
                datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
    
        const id = c.req.param("id");
        try{
            const blog  = await prisma.post.findFirst({
                where : {
                    id : id
                },select : {
                    content : true ,
                    title : true ,
                    id : true ,
                    author : {
                        select : {
                            name : true
                        }
                    },
                    createdAt:true
                }
            })
            return c.json({
                blog
            })
        }catch(e){
            console.log(e);
            return c.status(422);
            c.text("unable to fetch")
        }
    })


    bookRouter.post('/summary', async (c) => {
        try {
            const prisma = new PrismaClient({
                datasourceUrl: c.env?.DATABASE_URL,
            }).$extends(withAccelerate());
    
            const body = await c.req.json();
            
            // Ensure API key is correctly referenced from environment
            const genAI = new GoogleGenerativeAI("Removed api key");
            const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    
            const prompt = `Generate a breif and short summary of the following blog content. 
            The summary should capture the main ideas, key points, and core message:
            ${body.content}`;
    
            const result = await model.generateContent(prompt);
            const summary = result.response.text();
            
            return c.json({ summary });
        } catch (error) {
            console.error("Error in generating summary:", error);
            c.status(500);
            return c.json({ error: "Error in generating summary" });
        }
    });
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
