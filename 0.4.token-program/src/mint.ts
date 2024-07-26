import { Connection, clusterApiUrl, PublicKey, Transaction, Keypair, SystemProgram } from '@solana/web3.js';
import { MINT_SIZE, TOKEN_PROGRAM_ID, createAssociatedTokenAccount, createInitializeAccountInstruction, createInitializeMintInstruction, createMint, getAccountLenForMint, getMinimumBalanceForRentExemptAccount, getMinimumBalanceForRentExemptMint, getMint, getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';

async function newMint(
    connection: Connection,
    ownerKeyPair: Keypair,
): Promise<any> {
    const mint = await createMint(
        connection,
        ownerKeyPair, // payer
        ownerKeyPair.publicKey, // mint authority
        ownerKeyPair.publicKey, // freeze authority
        10 // digits of token
    );

    // token account (associated with minting account)
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        ownerKeyPair, // payer
        mint, // mint account
        ownerKeyPair.publicKey, // owner
    );

    // const tokenAccount = await createAssociatedTokenAccount(
    //     connection,
    //     ownerKeyPair,
    //     mint,
    //     ownerKeyPair.publicKey
    // )

    const transactionSignature = await mintTo(
        connection,
        ownerKeyPair,
        mint,
        tokenAccount.address,
        ownerKeyPair,
        100
    )

    return {
        mint,
        tokenAccount: tokenAccount.address,
        transactionSignature
    };
}
