import {
    Connection,
    SystemProgram,
    Transaction,
    LAMPORTS_PER_SOL,
    clusterApiUrl,
} from "@solana/web3.js";
import { getExplorerLink } from "@solana-developers/helpers";
import { PhantomProvider } from "./interfaces";

const connection = new Connection(clusterApiUrl("testnet"), "confirmed");

declare global {
    interface Window {
        solana: any;
    }
}

export function GetProvider(): PhantomProvider | undefined {
    if ("solana" in window) {
        const { provider } = window.solana;
        if (provider.isPhantom) {
            return provider as PhantomProvider;
        }
    }
    return undefined;
}

export async function ConnectPhantom(): Promise<string> {
    const { solana } = window;
    if (solana) {
        try {
            const response = await solana.connect();
            console.log(response.publicKey.toString());
            return response.publicKey.toString();
        } catch (e) {
            console.error(e);
            return ("");
        }
    } else {
        console.error("Phantom wallet not found");
        return "";
    }
}

export async function DisconnectPhantom(walletKey: string): Promise<boolean> {
    const { solana } = window;

    if (walletKey && solana) {
        await (solana as PhantomProvider).disconnect();
        return true;
    }
    return false;
}
// Function to sign a transaction
async function SignTx() {
    const provider = await ConnectPhantom();
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
        console.log(
            `Transaction sent: ${getExplorerLink("tx", signature, "testnet")}`
        );
    } else {
        console.error("Phantom wallet not found");
    }
}
