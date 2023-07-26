import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: 'Visual Inspection',
  description: 'FRIWO Visual Inspection Helper',
}

export default function RootLayout({ children }) {
  return (
   <html className="dark m-0 p-0">
			<body className="bg-white dark:bg-slate-800 text-black dark:text-white  m-0 p-0 h-full">
       {children}
      </body>
    </html>
  )
}
