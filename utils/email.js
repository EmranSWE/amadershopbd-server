//Another way to send email to user using mailgun for free One month
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: 'api',
    key: '04ef4ec5b57a0b40891a36b615732af8-30344472-0dc04693',
});


module.exports.sendMailWithMailGun = async (data) => {
    const result = await mg.messages
        .create("sandbox6a50ef7acf59487a81469ce3c8c3df64.mailgun.org", {
            from: "mdemran.swe@gmail.com",
            to: data.to,
            subject: data.subject,
            text: data.text,
        });
    return result.id;
}

const mailjet = require('node-mailjet').apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
)
module.exports.sendEmailJet = async (data) => {
    try {
        const request = mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    'From': {
                        'Email': 'mdemran.swe@gmail.com',
                        'Name': 'amadershopbd'
                    },
                    'To': [
                        {
                            'Email': `${data.to}`,
                            'Name': 'Recipient'
                        }
                    ],
                    'Subject': `${data.subject}`,
                    'TextPart': 'Hello, this is a test email sent using Mailjet API',
                    'HTMLPart': `
                    <div>
        <h1 style="color:'red'"> Activate your account using below link </h1>   
        <h3 style="color:'green'">${data.text}</h3>
        <p>Thank you!</p>
        </div>
                    `
                }
            ],
        })

    } catch (error) {
        console.log(err.statusCode)
    }
}

