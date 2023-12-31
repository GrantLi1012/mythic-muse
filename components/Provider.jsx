"use client";

import { SessionProvider } from 'next-auth/react';

// higher order component
const Provider = ({children, session}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider