import connect from "@/Mongodb/mongodbCongfig";
import user from "@/Models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, username, password } = reqBody;
    //validation
    const present = await user.findOne({ email });

    if (present) {
      return NextResponse.json(
        { error: "user already exists" },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);

   const NewUSer= new present({
       username,email,password:hash
    })
     
    await NewUSer.save()


console.log(NewUSer);

await sendEmail({email,emailType:'VERIFY',userid:NewUSer._id})
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
