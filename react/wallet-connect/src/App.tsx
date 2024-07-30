import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
    // CheckConnected,
    ConnectPhantom,
    DisconnectPhantom,
    getProvider,
    SignTx,
} from "./functions";
import { PhantomProvider } from "./interfaces";

function App() {
    const [provider, setProvider] = useState<PhantomProvider | undefined>(
        getProvider()
    );
    const [isConnected, setIsConnected] = useState<boolean>(
        () => {
        return !!provider;
    }); // New state to track connection status
    const [text, setText] = useState<string>(() => {
        return isConnected ? "Wallet is connected" : "Wallet is not connected";
    });
    const [pubKey, setPubKey] = useState<string>(() => {
        if (!provider
            || !provider.publicKey) {
            console.log("provider not there");
            return "";
        }
        return isConnected ? provider?.publicKey?.toString() : "";
    });

    useEffect(() => {
        const provider = getProvider();
        console.log("provider", provider);

        if (provider) {
            setProvider(provider);
        } else {
            setProvider(undefined);
        }
    }, []);

    

    useEffect(() => {
        // Store user's public key once they connect
        provider?.on("connect", (publicKey) => {
            setPubKey(publicKey);
            setIsConnected(true);
        });

        // Forget user's public key once they disconnect
        provider?.on("disconnect", () => {
            setPubKey("");
            setIsConnected(false);
        });

        provider?.on("accountChanged", (publicKey) => {
            if (publicKey !== "") {
                setPubKey(publicKey);
                setIsConnected(true);
                console.log(`Switched to account ${publicKey.toBase58()}`);
            } else {
                // Attempt to reconnect to Phantom
                provider?.connect().catch((error) => {
                    console.log("Failed to reconnect:", error);
                });
            }
        });
    }, [provider]);

    // debug
    // useEffect(() => {
    //     console.log("is connected", isConnected);
    //     console.log("pubKey", pubKey);
    // }, [isConnected]);

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
            <h1>{text}</h1>
            <div className="card">
                <p className="keyField">
                    <span className="textContent">{pubKey}</span>
                    {isConnected && (<button className="copyButton"
                        onClick={() => {
                            navigator.clipboard.writeText(pubKey);
                        }}
                        style={{ marginLeft: "10px" }}
                    >
                        📋
                    </button>)}
                </p>
                <div className="buttonContainer">
                    {!isConnected && (
                        <button
                            className="connectButton"
                            onClick={async () => {
                                ConnectPhantom(
                                    provider,
                                    setPubKey,
                                    setIsConnected
                                );
                                setText("Connected to Wallet:");
                            }}
                        >
                            Connect Wallet
                        </button>
                    )}
                    {isConnected && (
                        <>
                            <button
                                className="disconnectButton"
                                onClick={async () => {
                                    DisconnectPhantom(
                                        provider,
                                        setIsConnected,
                                        setPubKey
                                    );
                                    setText("Disconnected from Wallet");
                                }}
                            >
                                Disconnect Wallet
                            </button>
                            <button
                                className="signTxButton"
                                onClick={async () => {
                                    await SignTx(provider);
                                }}
                            >
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
