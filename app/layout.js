import '@styles/globals.css';

import Nav from '@components/Nav';
import Providers from '@components/Providers';

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

        </Providers>
      </body>
    </html>
  )
}
