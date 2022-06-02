async function sendMail() {
    Email = req.body.email;
    //EmailFrom =req.body.mailfrom;

   try {
        console.log(">>", req.body.email)
        const  Email  = req.body.email;
        const Subject =req.body.subject;
        const Text = req.body.text;

        if (!req.body.email) {
            res.status(400).json({
                code: globalMessage.BadCode,
                status: globalMessage.NotSuccess,
                message: globalMessage.ContentEmpty,
            });
        }

        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: 'nettie.conn46@ethereal.email',
                pass: 'T1VzbFBnK2uZyw92Uz'
            }
        });
      
        // Message object
        console.log(">>", req.body.email)
        let message = {
            from: 'nettie.conn46@ethereal.email',
            to: Email,
            subject: Subject,
            text: Text,
            
        };

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }

            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            res.send("Email send !!");
        });


    } catch (error) {
        return res.status(500).send({
            success: globalMessage.NotSuccess,
            code: globalMessage.ServerCode,
            status: globalMessage.SeverErrorMessage,
            message: error.message,
        });
    }

    sendMail().then(result => console.log('Email sent ...', result))
        .catch((error) => console.log(error.message));
}