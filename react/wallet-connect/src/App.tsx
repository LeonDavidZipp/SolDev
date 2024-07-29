import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ConnectPhantom, DisconnectPhantom, GetProvider, SignTx } from "./functions";
import { PhantomProvider } from "./interfaces";

function App() {
    const [provider, setProvider] = useState<PhantomProvider | undefined>(
        undefined
    );
    const [walletKey, setWalletKey] = useState<string>("");

    useEffect(() => {
        const provider = GetProvider();

        if (provider) {
            setProvider(provider);
        } else {
            setProvider(undefined);
        }
    }, []);

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>Please connect your Wallet</h1>
            <div className="card">
                <div className="buttonContainer">
                    {walletKey == "" && (
                        <button
                            onClick={async () => {
                                const publicKey = await ConnectPhantom();
                                setWalletKey(publicKey);
                            }}
                        >
                            Connect Wallet
                        </button>
                    )}
                    {walletKey != "" && (
                        <>
                            <button
                                onClick={async () => {
                                    const success = await DisconnectPhantom(
                                        walletKey
                                    );
                                    if (success) setWalletKey("");
                                }}
                            >
                                Disconnect Wallet
                            </button>
                            <button onClick={async () => {
                                
                                await SignTx(provider);
                            }}>
                                Sign Example Transaction
                            </button>
                        </>
                    )}
                </div>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
}

export default App;
