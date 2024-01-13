import { emailTransport } from '../../config/nodemailer'
import { generateHtmlEmailConfirmAccount } from './generateHtmlEmailConfirmAccount'

type SendMailProps = {
  to: string
  subject: string
  token: string
}

const EMAIL_NO_REPLY = process.env.EMAIL_NO_REPLY

const FRONT_BASE_URL = process.env.FRONT_BASE_URL

const COMPANY_NAME = process.env.COMPANY_NAME

const sendMailAccount = async ({ to, token, subject }: SendMailProps) => {
  const html = generateHtmlEmailConfirmAccount({
    companyName: COMPANY_NAME!,
    link: FRONT_BASE_URL!,
    token
  })
  emailTransport.sendMail({
    to,
    from: EMAIL_NO_REPLY,
    subject,
    html
  })
}

export { sendMailAccount }
