import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configure from './redux/store/configureStore'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // TanStack Query
import { PersistGate } from 'redux-persist/integration/react'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Toaster } from 'sonner'
import { ModalProvider } from './components'
import { Router } from './routes/routes'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60,
      refetchOnWindowFocus: true,
    },
  },
})

function App() {
  const { persistor, store } = configure

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ModalProvider />
            <Toaster
              theme="dark"
              position="top-center"
              toastOptions={{
                style: {
                  backgroundColor: 'rgba(18, 18, 18, 0.7)',
                  color: '#fff',
                  borderRadius: '12px',
                  padding: '12px 20px',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                },
              }}
            />
            <ToastContainer pauseOnFocusLoss={false} />
            <Router />
          </BrowserRouter>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
