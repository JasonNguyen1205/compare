
import './globals.css'
import { Titillium_Web } from 'next/font/google'
import "bootstrap/dist/css/bootstrap.min.css"



const titillium_Web = Titillium_Web({ subsets: ['latin'],weight:'400' })

export const metadata = {
  title: 'Visual Inspection',
  description: 'FRIWO Visual Inspection Helper',
}



export default function RootLayout({ children }) {
 
  return (
   <html className="dark m-0 p-0">
    <head>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"></script>
    </head>
      <body className={titillium_Web.className}>
        {children}
      </body>
    </html>
  )
}
