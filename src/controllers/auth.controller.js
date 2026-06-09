import { UserModel } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

async function RegisterUser(req, res) {

try {

    const { username, email, password } = req.body

    if(!username || !email || !password) {
        return res.status(400).json({
            message : "All Fields are Required"
        })
    }
    
    const existingUser = await UserModel.findOne({
        $or : [
            { username }, { email }
        ]
    })

    if(existingUser) {
        if (existingUser.username === username) {
        return res.status(400).json({ message: "Username is already taken." });
    }
        if (existingUser.email === email) {
        return res.status(400).json({ message: "Email is already registered." });
    }
    }

const hashPassword = await bcrypt.hash(password, 10)

const user = await UserModel.create({
    username, email, password : hashPassword
})

const token = jwt.sign({
    id : user._id,
    email : user.email
}, process.env.JWT_SECRET, { expiresIn: "7d" })

res.cookie("token", token, {
    httpOnly: true,
    secure: true,        // REQUIRED in production (HTTPS)
    sameSite: "none",    // REQUIRED for cross-site cookies
    maxAge: 7 * 24 * 60 * 60 * 1000,
});

res.status(201).json({
    message : "User Registered Successfully",
    user : {
        id: user._id,
        username: user.username,
        email: user.email
    }
})

}catch(err) {
    console.log(`User Registration Err ${err}`);
    res.status(500).json({
        message : "Server Internal Problem"
    })
}

}


async function LoginUser(req, res) {

try {



    const { email, password } = req.body

    const user =  await UserModel.findOne({
        email
    })

    if(!user) {
        return res.status(401).json({
            message : "Email Does Not Exist!! Register it."
        })
    }
    
    const isMatched = await bcrypt.compare(password , user.password)

    if(!isMatched) {
        return res.status(401).json({
            message : "Wrong Password"
        })
    }

    const token = jwt.sign({
    id : user._id,
    email : user.email
}, process.env.JWT_SECRET, { expiresIn: "7d" })

res.cookie("token", token, {
    httpOnly: true,
    secure: true,        // REQUIRED in production (HTTPS)
    sameSite: "none",    // REQUIRED for cross-site cookies
    maxAge: 7 * 24 * 60 * 60 * 1000,
});

    res.status(200).json({
        massege : "Succesfully Login",
        username : user.username,
        email : user.email
    })

} catch(err) {
    res.status(500).json({
        message : "Internal Server Error"
    })

}
}

async function LogoutUser(req, res) {
  try {
    res.clearCookie("token");

    res.status(200).json({
      message: "Logged out successfully"
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
}


async function isLoggedIn(req, res) {

try {

        if (!req.user) {
            return res.status(401).json({
                isLoggedIn: false,
                user: null
            });
        }

        return res.status(200).json({
            isLoggedIn: true,
            user: req.user
        });

} catch(err){
res.status(500).json({
    message : "Internal server Err"
})
}



}


export default { RegisterUser, LoginUser, isLoggedIn, LogoutUser}
