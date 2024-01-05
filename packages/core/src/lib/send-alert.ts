import nodemailer from 'nodemailer'

export const EMAIL_FROM = process.env.EMAIL_FROM || ''
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
export const EMAIL_TO = process.env.EMAIL_TO || ''

export const mailOptions = {
  from: `Docuconvo <${EMAIL_FROM}>`,
  to: EMAIL_TO
}

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_FROM,
    pass: EMAIL_PASSWORD
  }
})

export const sendAlert = (mailOptions: {
  from: string
  to: string
  subject: string
  text: string
}) => {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}
