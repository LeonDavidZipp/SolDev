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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeypairFromFile = getKeypairFromFile;
const web3_js_1 = require("@solana/web3.js");
const helpers_1 = require("@solana-developers/helpers");
const bs58_1 = __importDefault(require("bs58"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mint_1 = require("./mint");
const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)('testnet'), 'confirmed');
function getKeypairFromFile(filePath) {
    const fileContent = fs_1.default.readFileSync(filePath, 'utf8');
    const { privateKey } = JSON.parse(fileContent);
    const secretKey = Uint8Array.from(privateKey);
    return web3_js_1.Keypair.fromSecretKey(secretKey);
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const keys = yield getKeypairFromFile(path_1.default.resolve(__dirname, '../../keypair.json'));
        console.log(`✅ Generated private key: ${bs58_1.default.encode(keys.secretKey)}`);
        console.log(`✅ Generated public key: ${keys.publicKey.toBase58()}`);
        const mint = yield (0, mint_1.newMint)(connection, keys, 2, 1000);
        console.log(`✅ Mint: ${(0, helpers_1.getExplorerLink)("address", mint.mint.toString(), "testnet")}`);
        console.log(`✅ Token Account: ${(0, helpers_1.getExplorerLink)("address", mint.tokenAccount.toString(), "testnet")}`);
        console.log(`✅ Transaction: ${(0, helpers_1.getExplorerLink)("tx", mint.transactionSignature, "testnet")}`);
    });
}
main();
