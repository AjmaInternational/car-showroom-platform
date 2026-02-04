export const runtime = "nodejs"

import { NextResponse } from "next/server"
import * as nodemailer from "nodemailer"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const { name, email, vehicle, message } = await req.json()
  const today = new Date().toISOString().slice(0, 10)

  const { count } = await supabase
    .from("contact_requests")
    .select("*", { count: "exact", head: true })
    .eq("email", email)
    .eq("date", today)

  if ((count ?? 0) >= 5) {
    return NextResponse.json(
      { error: "Daily limit reached for this email." },
      { status: 429 }
    )
  }

  await supabase.from("contact_requests").insert({
    name,
    email,
    vehicle,
    message,
    date: today,
  })

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  await transporter.sendMail({
    to: "info@rslankamotors.com",
    subject: "New Website Inquiry",
    text: `Name: ${name}\nEmail: ${email}\nVehicle: ${vehicle}\n\n${message}`,
  })

  return NextResponse.json({ success: true })
}
