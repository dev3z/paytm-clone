const express = require('express');
const zod = require("zod");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const {auth} = require("./middleware");

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
    firstName: zod.string().min(3).max(50),
    lastName: zod.string().min(3).max(50)
});

router.post("/signup", async (req, res) => {
    const body = req.body;
    const{success} = signupSchema.safeParse(req.body);

    if(!success){

        return res.json({
            message: " Incorrect inputs"})
    }
    
    
    const user = User.findOne({
        username: body.username
    })

    if(user._id){
        return res.json({
            message: "mail already taken "})
    }


    const dbuser = await User.create(body);


    const userId = user._id;

		/// ----- Create new account ------

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

		/// -----  ------

    const token = jwt.sign({
        userID : dbuser._id, JWT_SECRET
    })
    
    res.json({
        message: "User created",
        token: token
    })
    })


    
    const signinBody = zod.object({
        username: zod.string(),
        password: zod.string(),
    });

router.post("/signin", async(req,res)=> {
    const {success} = signinBody.safeParse(req.body);
    if(!success){
        return res.json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if (user){
        const token = jwt.sign({
            userId : user._id
        }, JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Invalid credentials"
    })
})




const updateBody = zod.object({
    password: zod.string().min(6).optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
});


router.put("/" , auth , async (req, res)=> {
    const ( success) = updateBody.safeParse(req.body)
    if(!success){
        return res.json({
            message: "Incorrect inputs"
        })
    }
    
    await User.updateOne(req.body, {
        _id: req.userId
    })

    res.json({ message: "User updated" })

})

router.get{"/bulk", async (req, res) => {
    const filter = req.query.filter;
    const users  = await User.find({
        $or  : [{
            firstName :{
                "$regex": filter
            }
        }, 
        {
            lastName : {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id   
        }))
    })
}}
module.exports = router;