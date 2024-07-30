import {
    Connection,
    SystemProgram,
    Transaction,
    LAMPORTS_PER_SOL,
    clusterApiUrl,
} from "@solana/web3.js";
import { PhantomProvider } from "./interfaces";

const connection = new Connection(clusterApiUrl("testnet"), "confirmed");

/**
 * Retrieves the Phantom Provider from the window object
 * @returns {PhantomProvider | undefined} a Phantom provider if one exists in the window
 */
export const getProvider = (): PhantomProvider | undefined => {
    if ("phantom" in window) {
        const anyWindow = window as any;
        const provider = anyWindow.phantom?.solana;

        console.log("provider found");
        if (provider?.isPhantom) {
            return provider;
        }
    }

    window.open("https://phantom.app/", "_blank");
};

export const ConnectPhantom = async (
    provider: PhantomProvider | undefined,
    setPubKey: Function,
    setIsConnected: Function
) => {
    const publicKey = await provider?.connect();
    setPubKey(publicKey?.publicKey.toString() || "");
    setIsConnected(true);
};

export const DisconnectPhantom = async (
    provider: PhantomProvider | undefined,
    setIsConnected: Function,
    setPubKey: Function
) => {
    if (!provider) {
        console.error("Phantom wallet not found");
        return false;
    }
    setIsConnected(false);
    setPubKey("");
};

export const CheckConnected = (
    provider: PhantomProvider | undefined
): boolean => {
    return !!provider;
};

// Function to sign a transaction
export async function SignTx(provider: PhantomProvider | undefined) {
    console.log(provider);
    if (provider && provider.publicKey) {
        console.log(`Connected to cluster:`);
        const tx = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: provider.publicKey,
                toPubkey: provider.publicKey,
                lamports: 0.5 * LAMPORTS_PER_SOL,
            })
        );
        console.log(`Connected to cluster2:`);
        const signedTx = await provider.signTransaction(tx);
        const serializedTx = signedTx.serialize();
        const signature = await connection.sendRawTransaction(serializedTx);
    } else {
        console.error("Phantom wallet not found");
    }
}
