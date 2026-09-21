import { comments } from "../../DB/models/Comments.js"
import { posts } from "../../DB/models/Posts.js"
import { User } from "../../DB/models/Users.js"

export const createPost = async (req, res) => {


    try {
        const { content, title, userId } = req.body

        if (!content || !title || !userId) {

            return res.status(400).json({ message: "you must give me userId , content and title" })

        }

        const user = await User.findByPk(userId)

        if (!user) {

            return res.status(400).json({ message: "we don't find the user" })

        }


        const newPost = new posts({
            title,
            content,
            userId
        })

        await newPost.save()

        return res.status(201).json({ message: "post created", newPost })




    } catch (error) {

        return res.status(400).json({ message: error.message })

    }
}

export const deletePost = async (req, res) => {

    try {
        const { postId } = req.params

        if (!postId) {
            return res.status(404).json({ message: "post id isn't found" })
        }

        const { userId } = req.body

        if (!userId) {
            return res.status(404).json({ message: "user id isn't found" })
        }

        const post = await posts.findByPk(postId)

        if (!post) {
            return res.status(404).json({ message: "post isn't found" })
        } else {
            if (userId != post.userId) {
                return res.status(400).json({ message: "user doesn't have this post" })
            } else {

                await posts.destroy({ where: { id: postId } })

                return res.status(200).json({ message: "post was Deleted", post })

            }

        }
    } catch (error) {

        return res.status(400).json({ message: error.message })

    }
}

export const getPostsDetails = async (req, res) => {
    try {
        const allPosts = await posts.findAll({
            attributes: ["id", "title", "content"],
            include: [
                {
                    model: User,
                    attributes: ["id", "name"]
                },
                {
                    model: comments,
                    attributes: ["id", "content"]
                }
            ]
        });

        return res.status(200).json({ message: "Posts retrieved successfully", posts: allPosts });


    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

export const getPostsWithCommentsCount = async (req, res) => {
    try {
        const allPosts = await posts.findAll({
            attributes: ["id", "title"],
            include: {
                model: comments,
                attributes: ["id"],
            }
        })

        const postsWithComments = allPosts.map((post) => {
            return { id: post.id, title: post.title, commentCount: post.comments.length };
        })

        return res.status(200).json({ message: "OK" , postsWithComments})

    } catch (error) {
        return res.status(400).json({ message: "API erorr" })
    }
}


