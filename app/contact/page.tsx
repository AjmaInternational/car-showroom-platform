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

    const mailtoLink = `mailto:owner@rslankamotors.com?subject=${encodeURIComponent(
      formData.subject || "New Inquiry from Website"
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`

    window.location.href = mailtoLink
    alert("Your email client will now open to send the enquiry. Thank you!")
  }

  return (
    <div className="min-h-screen bg-[#001f3f] text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-[#ff851b] text-center">Contact Us</h1>
        <p className="text-gray-300 text-center mb-12">
          Have a question or want to book a viewing? Send us a message and we&apos;ll get back to you shortly.
        </p>

        <div className="bg-[#003366] p-8 rounded-2xl border border-[#ff851b]/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#001f3f] border border-[#004d99] rounded-lg px-4 py-3 focus:outline-none focus:border-[#ff851b] transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Your Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#001f3f] border border-[#004d99] rounded-lg px-4 py-3 focus:outline-none focus:border-[#ff851b] transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-[#001f3f] border border-[#004d99] rounded-lg px-4 py-3 focus:outline-none focus:border-[#ff851b] transition-colors"
                placeholder="Inquiry about BMW M4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-[#001f3f] border border-[#004d99] rounded-lg px-4 py-3 focus:outline-none focus:border-[#ff851b] transition-colors resize-none"
                placeholder="Tell us more about your inquiry..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#ff851b] hover:bg-[#e67616] text-[#001f3f] font-bold py-4 rounded-xl transition-colors text-lg"
            >
              Send Enquiry
            </button>
          </form>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-[#ff851b] text-3xl mb-2">📍</div>
            <h3 className="font-bold mb-1">Our Location</h3>
            <p className="text-gray-400 text-sm">Kingston, London, United Kingdom</p>
          </div>
          <div>
            <div className="text-[#ff851b] text-3xl mb-2">📞</div>
            <h3 className="font-bold mb-1">Phone</h3>
            <p className="text-gray-400 text-sm">+44 7385 934662</p>
          </div>
          <div>
            <div className="text-[#ff851b] text-3xl mb-2">✉️</div>
            <h3 className="font-bold mb-1">Email</h3>
            <p className="text-gray-400 text-sm">info@rslankamotors.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
