'use client'

import { useActionState } from 'react'
import { submitContactForm } from '@/actions/contactAction' // path to your action

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, null)

  return (
    <form action={formAction} className="contact-form">
      {/* Hidden Honeypot Spam Protection */}
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

      <div className="form-group">
        <input type="text" id="name" name="name" required placeholder="Your Name" />
      </div>

      <div className="form-group">
        <input type="email" id="email" name="email" required placeholder="Your Email" />
      </div>

      <div className="form-group">
        <textarea id="message" name="message" rows={5} required placeholder="Write your message here..."></textarea>
      </div>

      <button type="submit" className="hero-button" disabled={isPending}>
        {isPending ? 'Sending...' : 'Send Message'}
      </button>

      {state && (
        <p className={`form-status ${state.success ? 'success' : 'error'}`} style={{ color: '#333' }}>
          {state.message}
        </p>
      )}
    </form>
  )
}