/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'James Bugden'

interface ContactConfirmationProps {
  name?: string
}

const ContactConfirmationEmail = ({ name }: ContactConfirmationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Thanks for reaching out to {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brandMark}>JAMES BUGDEN</Text>
        <Heading style={h1}>
          {name ? `Thank you, ${name}!` : 'Thank you for reaching out!'}
        </Heading>
        <Text style={text}>
          We have received your message and will get back to you as soon as
          possible.
        </Text>
        <Text style={text}>
          In the meantime, feel free to explore our free career guides and tools.
        </Text>
        <Text style={footer}>Best regards, The {SITE_NAME} Team</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactConfirmationEmail,
  subject: 'Thanks for contacting us',
  displayName: 'Contact confirmation',
  previewData: { name: 'Jane' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'DM Sans', Arial, sans-serif" }
const container = { padding: '40px 32px', maxWidth: '480px' as const }
const brandMark = {
  fontSize: '13px',
  fontWeight: '600' as const,
  letterSpacing: '0.15em',
  color: '#1B3A2F',
  margin: '0 0 32px',
}
const h1 = {
  fontSize: '24px',
  fontWeight: 'bold' as const,
  fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
  color: '#1B3A2F',
  margin: '0 0 20px',
}
const text = {
  fontSize: '15px',
  color: '#4A4A4A',
  lineHeight: '1.6',
  margin: '0 0 24px',
}
const footer = { fontSize: '12px', color: '#999999', margin: '32px 0 0' }
