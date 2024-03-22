import { api } from "@/services/axios";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";

const user = {
        id: v4(),
        email:'relaie22@gmail.com',
        name:'relaie',
        password: 'Desenhos1', 
        update_at: new Date().toISOString(),
        created_at: new Date().toISOString()
}
const users = [user]

const sign =  async (req: NextApiRequest, res: NextApiResponse) => {
    const {email, password} = await req.body;
    console.log("estou em sign")
    const userExists = users.find(u => u.email === email && u.password === password);
    
    if(!userExists) {
        return res.status(400).json({message: 'Email or Password is Incorrect'});    
    }
    return res.redirect(307,"/");
    // res.status(200).json({
    //     user: {
    //         id: user.id,
    //         email: user.email,
    //         name: user.name
    //     },
    //     token: '1234567'
    // })
} 
export default sign;