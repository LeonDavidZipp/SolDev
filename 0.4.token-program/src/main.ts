import { Keypair, Connection, clusterApiUrl, BlockheightBasedTransactionConfirmationStrategy, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { getExplorerLink } from '@solana-developers/helpers';
import bs58 from 'bs58';
import fs from 'fs';
import path from 'path';
import { newMint } from './mint'

const connection = new Connection(clusterApiUrl('testnet'), 'confirmed');

export function getKeypairFromFile(filePath: string): Keypair {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { privateKey } = JSON.parse(fileContent);
    const secretKey = Uint8Array.from(privateKey);
    return Keypair.fromSecretKey(secretKey);
}

async function main() {
    const keys = await getKeypairFromFile(path.resolve(__dirname, '../../keypair.json'));
    console.log(`✅ Generated private key: ${bs58.encode(keys.secretKey)}`);
    console.log(`✅ Generated public key: ${keys.publicKey.toBase58()}`);

    const mint = await newMint(
        connection,
        keys,
        2,
        1000
    );
    console.log(`✅ Mint: ${getExplorerLink("address", mint.mint.toString(), "testnet")}`);
    console.log(`✅ Token Account: ${getExplorerLink("address", mint.tokenAccount.toString(), "testnet")}`);
    console.log(`✅ Transaction: ${getExplorerLink("tx", mint.transactionSignature, "testnet")}`);
}

main();
