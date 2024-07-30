import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './components/form';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
              <Form
                  title="Complaint about company..."
                  description="Note: This information will be safely
                             & immutably stored on the Base Blockchain. Your identity cannot be traced."
              />
      </div>
      
    </>
  )
}

export default App
