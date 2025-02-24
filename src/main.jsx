import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react';
import routes from './routes/index.jsx'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/app/store.js'
import { SidebarProvider } from './context/SidebarContext.jsx';
import { RingLoader } from 'react-spinners';


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SidebarProvider>
      <Suspense fallback={
        <div className="flex justify-center dark:bg-dark-mode-bg items-center h-screen  text-white text-2xl">
          <RingLoader 
              size={60}
              color='#33A02C'
          />
        </div>
      }>
        <RouterProvider router={routes} />
      </Suspense>
      </SidebarProvider>
    </PersistGate>
  </Provider>

)
