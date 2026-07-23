import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApolloProvider } from '@apollo/client/react'
import { client } from './client/client.js'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { PaginationContextProvider } from './context/PaginationContext.jsx'

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <PaginationContextProvider>
      <AuthContextProvider>
        <StrictMode>
          <App />
        </StrictMode>,
      </AuthContextProvider>
    </PaginationContextProvider>
  </ApolloProvider>
)
