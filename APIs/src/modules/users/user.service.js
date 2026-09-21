import { User } from "../../DB/models/Users.js";

export const createUser = async (req, res) => {

    try {
        const { name, email, password, rePassword } = req.body

        if (!name || !email || !password || !rePassword) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password !== rePassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "Email already exists" });
        }

        const newUser = await User.create({
            name,
            email,
            password
        });
        res.status(201).json({ message: "User created successfully", newUser });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const createORUpdateUser = async (req, res) => {

    try {
        const { id } = req.params;
        const { name, email, password, rePassword } = req.body;


        if (!name || !email || !password || !rePassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findByPk(id);

        if (!existingUser) {

            const existingEmailUser = await User.findOne({ where: { email } });
            if (existingEmailUser) {
                return res.status(409).json({ message: "Email already exists" });
            }
            const newUser = await User.create({
                name,
                email,
                password
            });
            res.status(201).json({ message: "User created successfully", newUser });
        } else {

            await existingUser.update({
                name,
                email,
                password
            });
            res.status(200).json({ message: "User updated successfully", existingUser });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const findUserByEmail = async (req, res) => {

    try {
        const {email} = req.query

        if (!email) {
            res.status(400).json({ message: "give me an Email" });
        }
        
        const user =await User.findOne({where : {email}})

        console.log(user);
        
        if (user) {
            
            res.status(200).json({ message: "This is a user" , user });
            
        } else {
            
            res.status(404).json({ message: "user not found" });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
export const findUserByID = async (req, res) => {

    try {
        const {id} = req.params

        if (!id) {
            res.status(400).json({ message: "give me an Email" });
        }
        
        const user =await User.findByPk(id)
        
        if (user) {
            
            res.status(200).json({ message: "This is a user" , user });
            
        } else {
            
            res.status(404).json({ message: "user not found" });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

