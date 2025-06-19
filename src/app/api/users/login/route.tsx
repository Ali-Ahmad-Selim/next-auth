import connect from "@/Mongodb/mongodbCongfig"
import user from "@/Models/userModel"
import {NextRequest,NextResponse}from 'next/server'
import bcryptjs from "bcryptjs"
connect()

export async function POST(request:NextRequest){
    try {
        const reqBody=request.json()
        const{email,username,password}=reqBody
        //validation
       const present= await user.findOne({email})

       if(present){
        return NextResponse.json({error:"user already exists"},{status:400})
       }


    } catch (error : any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}