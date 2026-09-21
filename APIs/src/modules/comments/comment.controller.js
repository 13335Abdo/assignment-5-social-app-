import { Router } from "express"
import * as commentServices from "./comment.service.js"


 const router = Router()


 router.patch("/createComment" ,commentServices.createComment )

 router.post("/updateComment/:commentId" ,commentServices.updateComment )
 
 router.post("/find-or-create/:commentId" ,commentServices.findOrCreate )
 
 router.post("/search" ,commentServices.search )
 
 router.post("/newest/:postId" ,commentServices.newest )
 
 router.get("/specificComment/:commentId" ,commentServices.specificComment )

export default router