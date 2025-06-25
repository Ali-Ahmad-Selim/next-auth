import user from "@/Models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
export const sendEmail = async ({ email, emailType, userid }: any) => {
  try {
    const hashedToken= await bcryptjs.hash(userid.tostring(), 10);

    if (emailType === "VERIFY") {
      await user.findOneAndUpdate(userid, {
        VerifyToken :hashedToken,VerifyTokenExpiry:Date.now()+3600000
      });

    }
    else if(emailType === "RESET"){
        await user.findOneAndUpdate(userid, {
         forgotPasswordToken :hashedToken, forgotPasswordTokenExpiry:Date.now()+3600000
      });
    }
 // Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "fc9bd1c68738ec",
    pass: "774a31635f38fa"
  }
});

    const mailOptions = {
      from: "ali539306ahmad@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html:` <p>click <a href={${process.env.DOMAIN}}>here</a> to ${emailType === 'VERIFY' ? "VErify your email":"RESET your password"} 
      or copy paste the link below in your browser
      <br>
      </p> ` , // HTML body
    };
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error();
  }
};
