import * as React from 'react'

import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Text
} from '@react-email/components'

interface DocuConvoEmailProps {
  userFirstname: string
}

export const DocuConvoWelcomeEmail = ({
  userFirstname = 'Awesome Human'
}: DocuConvoEmailProps) => (
  <Html>
    <Head />
    <Preview>Making Documentations Fun and quick.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://pfp-for-social-struggle.s3.ap-south-1.amazonaws.com/apple-touch-icon.png`}
          width='170'
          height='170'
          alt='Logo'
          style={logo}
        />
        <Text style={paragraph}>Hey {userFirstname},</Text>
        <Text style={paragraph}>
          Welcome to DocuConvo, the perfect solution for getting things done
          quickly with Documentation!!
        </Text>
        <Text style={paragraph}>
          {'  '} {'  '} {'  '} We are Extremely Delited to have you onboard,
          hang tight we will be launching Soon
        </Text>
        <Text style={paragraph}>
          Best,
          <br />
          The DocuConvo team {' ❤️'}
        </Text>
        <Hr style={hr} />
        <Text style={footer}>New Delhi, Delhi </Text>
      </Container>
    </Body>
  </Html>
)

export default DocuConvoWelcomeEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px'
}

const logo = {
  margin: '0 auto'
}

const paragraph = {
  fontSize: '16px',
  color: '#000',
  lineHeight: '26px'
}

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0'
}

const footer = {
  color: '#8898aa',
  fontSize: '12px'
}
