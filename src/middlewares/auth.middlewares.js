import { ApiError } from "../utils/apiError.js";

export const verifyUser = async (req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if(!token) return res.status(401).json(new ApiError(401, "Unauthorized Access","Token not found"))
        if(token==="12345678") next();
        else return res.status(401).json(new ApiError(401, "Invalid Access Token"))
    } 
    catch (error) {
            return res.status(401).json(
                new ApiError(401,error)
            )
            
        }
}