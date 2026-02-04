"use client"

export default function Footer() {
  return (
    <footer style={{ 
      padding: '40px', 
      textAlign: 'center', 
      borderTop: '1px solid #eee',
      marginTop: '40px'
    }}>
      <img 
        src="/RS-LANKA-LOGO.png" 
        alt="R.S Lanka Motors" 
        style={{ height: '80px', marginBottom: '10px' }} 
      />
      <p>&copy; {new Date().getFullYear()} R.S Lanka Motors. All rights reserved.</p>
    </footer>
  )
}
