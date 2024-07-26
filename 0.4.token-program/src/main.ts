import { Keypair, Connection, clusterApiUrl } from '@solana/web3.js'

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

async function main() {
    const keys = Keypair.generate();
    await connection.requestAirdrop(keys.publicKey, 2);
}
