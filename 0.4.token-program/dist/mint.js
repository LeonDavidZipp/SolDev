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
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)('devnet'), 'confirmed');
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // payer && owner keypair of minting account
        const keys = web3_js_1.Keypair.generate();
        yield connection.requestAirdrop(keys.publicKey, 2);
        console.log(`Generated mint account with public address: ${keys.publicKey.toBase58()}`);
        // minting account
        const mint = yield (0, spl_token_1.createMint)(connection, keys, // payer
        keys.publicKey, // mint authority
        keys.publicKey, // freeze authority
        10 // digits
        );
        // token account (associated with minting account)
        const tokenAccount = yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(connection, keys, // payer
        mint, // mint account
        keys.publicKey);
    });
}
main();
