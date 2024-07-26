"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const spl_token_1 = require("@solana/spl-token");
function newMint(connection, ownerKeyPair, decimals, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const mint = yield (0, spl_token_1.createMint)(connection, ownerKeyPair, // payer
        ownerKeyPair.publicKey, // mint authority
        ownerKeyPair.publicKey, // freeze authority
        decimals // decimals of token
        );
        // token account (associated with minting account)
        const tokenAccount = yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(connection, ownerKeyPair, // payer
        mint, // mint account
        ownerKeyPair.publicKey);
        // const tokenAccount = await createAssociatedTokenAccount(
        //     connection,
        //     ownerKeyPair,
        //     mint,
        //     ownerKeyPair.publicKey
        // )
        const transactionSignature = yield (0, spl_token_1.mintTo)(connection, ownerKeyPair, mint, tokenAccount.address, ownerKeyPair, amount);
        return Promise.resolve({
            mint: mint,
            tokenAccount: tokenAccount.address,
            transactionSignature: transactionSignature
        });
    });
}
