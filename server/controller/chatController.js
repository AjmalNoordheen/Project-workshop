const UserSchema = require("../Model/userSchema")
const chatSchema = require('../Model/chatSchema')
const proSchema = require('../Model/mechanicSchema')


const loadChat = async(req,res)=>{
    try {
        const {email,proId,type,id} = req.query
        let user
        if(type=='user'){
            user = await UserSchema.findOne({email:email})
            const chat = await chatSchema.findOne({
                $and:[
                    {user:user._id},
                    {professional:proId}
                ]
            })
            if(chat){
                
                res.status(200).json({chat})
            }else{
                const chat = await chatSchema.create({
                    user:user._id,
                    professional:proId,
                    read_at:true
                })
    
                res.status(200).json({chat})
            }
            // if Professional sends the messege
        }
        
        // else if(type=='proffesional'){
        //     proId = await proSchema.findOne({email:email})
        //     const chat = await chatSchema.findOne({
        //         $and:[
        //             {user:user._id},
        //             {professional:proId}
        //         ]
        //     })
        //     if(chat){
        //         res.status(200).json({chat})
        //     }else{
        //         const chat = await chatSchema.create({
        //             user:user._id,
        //             professional:proId,
        //             read_at:true
        //         })
    
        //         res.status(200).json({chat})
        //     }
        // }
       

      
    } catch (error) {
        res.status(500).json({ errMsg: 'Server error' })
    }
}


const listChatProf = async(req,res)=>{
    try {
        const id = req.query.id
        const chat = await chatSchema.findOne({_id:id})
        if(chat){
            res.json(chat)
        }
    } catch (error) {
        
    }
}

// ==============================addMessage or send MEssage==================
const addMessage = async(req,res)=>{
    try {
        const {message,chatId,UserDataEmail,userType} = req.body
        let  UserData
        if(userType=='user'){
            UserData = await UserSchema.findOne({email:UserDataEmail})
        }else{
            UserData = await proSchema.findOne({email:UserDataEmail})
        }
        const updateChat = await chatSchema.updateOne({_id:chatId},{$push:{
            messages:{
                text:message,
                senderType:userType,
                senderId:UserData._id,
            }
        }})
        if(updateChat){
            const chat = await chatSchema.findOne({_id: chatId})
            res.json(chat)
        }
    } catch (error) {
        
    }
}
// =====================listChat==================

const listChat = async(req,res)=>{
    try {
        const {email} = req.query
        const pro = await proSchema.findOne({email:email})

        const list = await chatSchema.find({professional:pro._id}).populate('user')
        if(list){
            res.status(200).json({list})
        }
    } catch (error) {
        
    }
}

module.exports={loadChat,addMessage,listChat,listChatProf}