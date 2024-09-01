import { Router } from './routes/routes'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import configure from './redux/store/configureStore'
import { QueryClient, QueryClientProvider } from 'react-query'
import { PersistGate } from 'redux-persist/integration/react'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient()

function App() {
  const { persistor, store } = configure

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ToastContainer pauseOnFocusLoss={false} />
            <Router />
          </BrowserRouter>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
