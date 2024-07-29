import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ConnectPhantom } from './functions'
import { PhantomProvider } from './interfaces'

function App() {
    const [count, setCount] = useState(0)
    const [wallet, setProvider] = useState<PhantomProvider | undefined>();

    useEffect(() => {
        const provider = await ConnectPhantom();

        if (provider) setProvider(provider);
        else setProvider(undefined);
    }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Please connect your Wallet</h1>
          <div className="card">
              <div className="buttonContainer">
                  {wallet == "" && (<button onClick={() => setProvider((wallet) => {
        })}>
          Connect Wallet
        </button>)}
                  {wallet != "" &&
                      (<><button onClick={() => setCount((count) => count + 1)}>
          Disconnect Wallet
              </button>
        <button onClick={() => setCount((count) => count + 1)}>
        Sign Example Transaction
                </button></>)}
                </div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
