import type { AppProps } from 'next/app'
import React from 'react'
import { setupStore } from '../components/store/store';
import { Provider } from 'react-redux';
import ErrorBoundary from '../components/ErrorBoundary/Error';
import { App } from '../App';
//import '../App.css'
import '../styles/global.css'
 
const store = setupStore();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
  //<Component {...pageProps} />
  <React.StrictMode>
  <ErrorBoundary>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>
</React.StrictMode>
  )
}