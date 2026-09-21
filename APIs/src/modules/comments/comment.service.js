import { comments } from "../../DB/models/Comments.js"
import { posts } from "../../DB/models/Posts.js"
import { User } from "../../DB/models/Users.js"

export const createComment = async (req, res) => {
    try {
        const { content, userId, postId } = req.body

        if (!content || !userId || !postId) {

            return res.status(400).json({ message: "Give me a woman after mid night" })

        }

        const user = await User.findByPk(userId)

        if (!user)
            return res.status(400).json({ message: "user doesn't found" })

        const post = await posts.findByPk(postId)

        if (!post)
            return res.status(400).json({ message: "post doesn't found" })


        const newComment = await comments.create({ content, userId, postId })

        if (!newComment) {

            return res.status(400).json({ message: "issue" })
        }

        return res.status(200).json({ message: "comment was created", newComment })

    } catch (error) {
        return res.status(400).json({ message: "Not OK" })
    }
}


export const updateComment = async (req, res) => {
    try {
        const { content, userId } = req.body
        const { commentId } = req.params

        if (!content || !userId) {

            return res.status(400).json({ message: "Give me a woman after mid night" })

        }

        const user = await User.findByPk(userId)

        if (!user)
            return res.status(400).json({ message: "user doesn't found" })


        const commentUpdated = await comments.findByPk(commentId)

        if (commentUpdated.userId != userId)
            return res.status(400).json({ message: "you don't have  the right" })


        commentUpdated.content = content;
        await commentUpdated.save();


        return res.status(200).json({ message: "comment was updated" })

    } catch (error) {
        return res.status(400).json({ message: "Not OK" })
    }
}


export const findOrCreate = async (req, res) => {
    try {

        const { postId, userId, content } = req.body
        const { commentId } = req.params

        if (!postId || !userId || !content) {
            return res.status(400).json({ message: "give me a content , user id and post id" })
        }

        const user = await User.findByPk(userId)
        if (!user)
            return res.status(400).json({ message: "user isn't found" })

        const post = await posts.findByPk(postId)
        if (!post)
            return res.status(400).json({ message: "post isn't found" })


        const comment = await comments.findByPk(commentId)

        if (!comment) {
            await comments.create({
                postId,
                userId,
                content
            })
            return res.status(200).json({ message: "the comment was created" })
        } else {
            comment.content = content;
            await comment.save();
            return res.status(200).json({ message: "the comment was updated" })
        }

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

}

export const search = async (req, res) => {

    try {

        const { word } = req.query
        if (!word) {
            return res.status(400).json({ message: "Not OK" })
        }



        const allComments = await comments.findAll()

        const filtedComment = allComments.filter((comment) => comment.content.includes(word))

        if (filtedComment.length == 0) {
            return res.status(200).json({ message: "no comments" })
        }


        return res.status(200).json({ message: "his is the comments", filtedComment })

    } catch (error) {
        return res.status(400).json({ message: "Not OK" })
    }

}

export const newest = async (req, res) => {

    try {
        
        const { postId } = req.params
        if (!postId) {
            return res.status(400).json({ message: "Not OK" })
        }


        const allcomments = await comments.findAll({ where: {postId} })



        const newestComments = allcomments.filter((comment) => Date.now() - new Date(comment.createdAt) <= 60*60*1000)

        console.log(newestComments);


        if (newestComments) {
            return res.status(200).json({ message: "his is the comments", newestComments })

        } else {

            return res.status(200).json({ message: "no new comments" })
        }

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

}


export const specificComment = async (req, res) => {

    try {
        
        const { commentId } = req.params

        if (!commentId) {
            return res.status(400).json({ message: "Not OK" })
        }


        const comment = await comments.findByPk(commentId,{
            include:[{
                model:User,
                attributes:["id" , "name" , "email"],
            },{
                model:posts,
                attributes:["id" , "title" , "content"],
            }],
            attributes:["id" , "content"]
        })


        if (comment) {
            return res.status(200).json({ message: "his is the comments", comment })

        } else {
            return res.status(200).json({ message: "no comment" })
        }

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

}

