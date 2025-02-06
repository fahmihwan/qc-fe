import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react';
import routes from './routes/index.jsx'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/app/store.js'


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <p className='text-4xl'>Loading ...</p>
        </div>
      }>
        <RouterProvider router={routes} />
      </Suspense>
    </PersistGate>
  </Provider>

)
