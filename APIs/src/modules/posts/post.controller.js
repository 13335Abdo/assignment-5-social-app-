import { Router } from "express"

import * as postServices from "./post.service.js"

const router = Router()

router.post("/createpost", postServices.createPost)

router.delete("/deletepost/:postId", postServices.deletePost)

router.get("/details", postServices.getPostsDetails)

router.get("/comment-count", postServices.getPostsWithCommentsCount)

export default router