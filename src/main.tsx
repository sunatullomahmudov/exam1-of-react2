import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { Provider as JotaiProvider } from 'jotai'
import store from './store/store.ts'
import { BrowserRouter, Route, Routes } from 'react-router'
import Info from './Info.tsx'
import App from "./App.tsx"
import TodoApp from './TodoApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <JotaiProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/info/:id" element={<Info />} />
            <Route path="/todo" element={<TodoApp />} />
          </Routes>
        </BrowserRouter>
      </JotaiProvider>
    </Provider>
  </StrictMode>,
)
