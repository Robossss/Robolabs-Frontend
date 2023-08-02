import { Suspense } from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import Loading from './loading'
import ToastProvider from './toast.provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Robolabs',
  description: '3D Robotics Simulation Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Suspense fallback={<Loading/>}/>
      <body className={inter.className}>
        {/* <main> */}

<ToastProvider>

        {children}
</ToastProvider>
        {/* </main> */}
        {/* <footer className=' h-16 bg-gray-900 flex items-center justify-center'>
        2023 RoboLabs All rights reserved
        </footer> */}
            
        </body>
    </html>
  )
}
