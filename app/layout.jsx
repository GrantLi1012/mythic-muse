import '@styles/globals.css';

export const metadata = {
    title: "MythicMuse",
    description: 'Discover & Share AI Prompts For Fantasy Tabletop RPG'
};

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
        <body>
            <div className='main'>
                <div className='gradient' />
            </div>
            <main className='app'>
                {children}
            </main>
        </body>
    </html>
  )
}

export default RootLayout;