import {
    Transaction, Connection,
    LAMPORTS_PER_SOL, clusterApiUrl, SystemProgram
} from '@solana/web3.js';
import { PhantomProvider } from './interfaces';
import { getExplorerLink } from '@solana-developers/helpers';

const connection = new Connection(clusterApiUrl('testnet'), 'confirmed');

// Function to connect to Phantom wallet
async function ConnectPhantom(): Promise<PhantomProvider | undefined> {
    const solana = (window as any).solana;
    if (solana) {
        try {
            const response = await solana.connect();
            console.log(response.publicKey.toString());
            return response;
        } catch (e) {
            console.error(e);
        }
    } else {
        console.error('Phantom wallet not found');
        return undefined;
    }
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
                lamports: 0.5 * LAMPORTS_PER_SOL
            })
        );
        console.log(`Connected to cluster2:`);
        const signedTx = await provider.signTransaction(tx);
        const serializedTx = signedTx.serialize();
        const signature = await connection.sendRawTransaction(serializedTx);
        console.log(`Transaction sent: ${getExplorerLink("tx", signature, "testnet")}`);
    } else {
        console.error('Phantom wallet not found');
    }
}

// (window as any).ConnectPhantom = ConnectPhantom;
// (window as any).SignTx = SignTx;