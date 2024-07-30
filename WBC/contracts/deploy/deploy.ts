import Web3 from "web3";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const privateKeyHex: string | undefined = process.env.PRIVATE_KEY;
const publicAddressHex: string | undefined = process.env.PUBLIC_KEY;
const infuraUrl: string | undefined = process.env.INFURA_URL;
const ganacheUrl: string | undefined = process.env.GANACHE_URL;

if (!privateKeyHex || !publicAddressHex || !infuraUrl || !ganacheUrl) {
    throw new Error("Environment variables are not set correctly.");
}

const privateKey = Buffer.from(privateKeyHex, "hex");
const publicAddress = Buffer.from(publicAddressHex, "hex");

// Read the compiled contract code
const contractPath = path.resolve(
    __dirname,
    "build",
    "LawfulContractFactory.bin"
);
const abiPath = path.resolve(__dirname, "build", "LawfulContractFactory.abi");
const bytecode = fs.readFileSync(contractPath, "utf8");
const abi = JSON.parse(fs.readFileSync(abiPath, "utf8"));

// Deploy the contract
const deployGanache = async () => {
    const web3 = new Web3(ganacheUrl);

    try {
        const accounts = await web3.eth.getAccounts();
        console.log("Deploying from account:", accounts[0]);

        const contract = new web3.eth.Contract(abi);

        const result = await contract
            .deploy({
                data: bytecode,
                arguments: [publicAddress],
            })
            .send({ from: accounts[0], gas: "6721975" });

        console.log("Contract deployed to:", result.options.address);
    } catch (error) {
        console.error("Error deploying contract:", error);
    }
};
// deployGanache();

/**
 * Deploy the contract to the Ethereum network
 * addresses of deployed instances:
 * - Sepolia: 0x241696C6232Fd70C28D7a0332e7f1f759b8bDAA2
 */
const deployFactoryToSepolia = async () => {
    const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
    try {
        const account = web3.eth.accounts.privateKeyToAccount(privateKeyHex);
        web3.eth.accounts.wallet.add(account);
        web3.eth.defaultAccount = account.address;

        console.log("Deploying from account:", account.address);

        // Fetch the current gas price
        const gasPrice = await web3.eth.getGasPrice();
        console.log("Current gas price:", gasPrice);

        // Check account balance
        const balance = await web3.eth.getBalance(account.address);
        console.log("Account balance:", balance);

        console.log(
            "Needed balance would be:",
            BigInt(6721975) * BigInt(gasPrice)
        );

        const contract = new web3.eth.Contract(abi);

        const result = await contract
            .deploy({
                data: bytecode,
                arguments: [publicAddress],
            })
            .send({
                from: account.address,
                gas: "6721975",
                gasPrice: gasPrice,
            });

        console.log("Contract deployed to:", result.options.address);
    } catch (error) {
        console.error("Error deploying contract:", error);
    }
};
