const nodemailer = require('nodemailer')

const sendMail = async(FullName, Email)=>{
    const contactTemplate = `<div>
    <div>
      <h2 style="color: #00a859;">Welcome to Stackplus Technology</h2>
    </div>
    <ul>
      <li>Name: ${FullName}</li>
      <li>Email: ${Email}</li>
    </ul>
    <div>
      <p>
        Dear ${FullName},
      </p>
      <p>
        Welcome to our community! We are thrilled to have you on board.
      </p>
      <p>
        With your new account, you can explore all the features our website has to offer.
      </p>
      <p>
        If you have any questions or need assistance, feel free to contact us.
      </p>
    </div>
    <p style="color: #00a859;"><i>Stackplus Technology</i></p>
  </div>
`;




const transporter = nodemailer.createTransport({
    service:"gmail",
    auth : {
        user : process.env.GOOGLE_EMAIL,
        pass : process.env.GOOGLE_PASSWORD
    }
});


const mailOptions={
    from : process.env.GOOGLE_EMAIL,
    to : Email,
    subject:"welcome to world",
    html: contactTemplate,
    text:"welcome to world"
};

try {
    await transporter.sendMail(mailOptions)
    console.log("Email send Successful")
} catch (error) {
    // res.statue(500).send({message:"internal server error"})
    console.log( "error sending email",error);
    throw error
}


}



module.exports = sendMail