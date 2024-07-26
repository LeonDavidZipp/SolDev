import { Connection, clusterApiUrl, PublicKey, Transaction, Keypair, SystemProgram } from '@solana/web3.js';
import { MINT_SIZE, TOKEN_PROGRAM_ID, createAssociatedTokenAccount, createInitializeAccountInstruction, createInitializeMintInstruction, createMint, getAccountLenForMint, getMinimumBalanceForRentExemptAccount, getMinimumBalanceForRentExemptMint, getMint, getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

async function main() {
    // payer && owner keypair of minting account
    const keys = Keypair.generate();
    await connection.requestAirdrop(keys.publicKey, 2);
    console.log(`Generated mint account with public address: ${keys.publicKey.toBase58()}`)

    // minting account
    const mint = await createMint(
        connection,
        keys, // payer
        keys.publicKey, // mint authority
        keys.publicKey, // freeze authority
        10 // digits
    );

    // token account (associated with minting account)
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        keys, // payer
        mint, // mint account
        keys.publicKey, // owner
    )
}
main();
