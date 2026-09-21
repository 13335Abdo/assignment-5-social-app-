import { DBConnection, squlaizeConnection } from "./DB/connection.js"
import { User } from "./DB/models/Users.js"
import { posts } from "./DB/models/Posts.js"
import { comments } from "./DB/models/Comments.js"
import "./DB/models/associations.js"; 
import { commentRouter, postRouter, userRouter } from "./modules/index.js";

export const bootstrap = async (app, express) => {
    app.use(express.json())

    await DBConnection()
    await squlaizeConnection()

    app.get("/",(req , res)=>{        
        res.status(200).json({msg : "Hello World!"})
    })


    app.use("/api/v1/users", userRouter)
    app.use("/api/v1/posts", postRouter)
    app.use("/api/v1/comments",commentRouter)




    app.all("/*dummy",(req , res)=>{
        res.status(404).json({msg : "this route isn't found"})
    })

}



