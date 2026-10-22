import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import './styles/index.css'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root element #root was not found in index.html')
}

/**
 * Marks the document as script-enabled before React renders anything.
 *
 * The scroll-reveal styles hide `[data-reveal]` elements only when `.js` is
 * present, so without JavaScript nothing is ever hidden. Because this runs
 * before the first render there is also no flash of hidden content.
 */
document.documentElement.classList.add('js')

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
