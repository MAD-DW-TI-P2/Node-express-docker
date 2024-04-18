import Jwt  from "jsonwebtoken";

//VERIFIES THE TOKEN CAN BE FOUND IN THE HEADER "AUTH-TOKEN"

const verifyToken = (req, res, next) => {
    
    const token = req.header("auth-token")

    if(!token) return res.status(401).json({ message: "Acess Denied" })

    try {
        const verified = Jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
        
    } catch(error) {
        res.status(400).json({ message: "Invalid credentials" })
    }
}

export default verifyToken