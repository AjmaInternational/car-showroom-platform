"use client"

import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailtoLink = `mailto:owner@rslankamotors.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`
    window.location.href = mailtoLink
    alert("Email client opened.")
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <input name="name" placeholder="Name" onChange={handleChange} required style={{ padding: '10px' }} />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required style={{ padding: '10px' }} />
        <input name="subject" placeholder="Subject" onChange={handleChange} required style={{ padding: '10px' }} />
        <textarea name="message" placeholder="Message" rows={5} onChange={handleChange} required style={{ padding: '10px' }} />
        <button type="submit" style={{ padding: '10px', background: '#000', color: '#fff', cursor: 'pointer' }}>Send Email</button>
      </form>
    </div>
  )
}
