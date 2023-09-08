import '@styles/globals.css';

import Nav from '@components/Nav';
import Providers from '@components/Providers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'Promptify',
  description: 'prompting tool for modern world to discover, create and share creative prompts',
}

export default function RootLayout({ children }) {

  return (
    <html lang='en'>
      <link rel="shortcut icon" href="https://i.ibb.co/1qVqt5S/logo.png" type="image/x-icon" />
      <body>
        <Providers>

          <div className='main'>
            <div className='gradient' />
          </div>
          <main className='app'>
            <Nav />
            {children}
          </main>
          <ToastContainer />
        </Providers>

      </body>
    </html>
  )
}
