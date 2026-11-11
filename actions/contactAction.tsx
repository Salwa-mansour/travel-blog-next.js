'use server'

export async function submitContactForm(prevState: any, formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const message = formData.get('message')
  const botcheck = formData.get('botcheck')

  // Honeypot check
  if (botcheck) {
    return { success: false, message: 'Spam detected.' }
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_KEY, // Can safely stay private on the server!
        name,
        email,
        message,
      }),
    })

    const result = await response.json()

    if (result.success) {
      return { success: true, message: 'Thank you! Your message has been sent successfully.' }
    } else {
      return { success: false, message: result.message || 'Something went wrong.' }
    }
  } catch (error) {
    return { success: false, message: 'Network error. Please try again.' }
  }
}