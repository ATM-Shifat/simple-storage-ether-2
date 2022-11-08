//package.json file is created after adding dependencies: solc, fs-extra, ethers
//SimpleStorage_sol_SimpleStorage.abi and SimpleSotrage_sol_SimpleStorage.bin
//These files are created after compiling  the contract using the commmand "yarn solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleStorage.sol"
//added in the package.json file in the script section

const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config() //essential to use .env variable

async function main() {
    //console.log("hi");
    //http://127.0.0.1:7545

    //const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL) // Local Blockchain address
    const provider = new ethers.providers.JsonRpcProvider(
        process.env.RPC_URL_ALCHEMY
    )
    // const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8")
    // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    //     encryptedJson,
    //     process.env.PRIVATE_KEY_PASSWORD
    // )

    // wallet = await wallet.connect(provider)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider) //address that is going to deploy the contract

    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8") // getting abi from  file  created after compiling the contract
    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf8"
    ) // getting bin from  file  created after compiling the contract

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet) //contactFactory is an object used for deploying the contract in blockchain
    console.log("Deploying, please wait....")
    const contract = await contractFactory.deploy() //await means wait here for the contract to deploy
    await contract.deployTransaction.wait(1)
    //const contract = await contractFactory.deploy({gasLimit:1000000000000 }); // specifying gas limit
    // console.log("Contract info: ");
    // console.log(contract);

    //const transactionReceipt = await contract.deployTransaction.wait(1);
    // waiting for 1 block confirmation after deployment

    // console.log("Here is the response after deployment: ");
    // console.log(contract.deployTransaction);
    //This response is gotten just after deploying the contract
    // without waiting for any block confirmation

    // console.log("Here is the transaction receipt: ");
    // console.log(transactionReceipt);
    //This response is found after waiting for any block confirmation

    // console.log("Deploying only using transaction data:");

    // const nonce = await wallet.getTransactionCount(); // returns the latest block number
    // const tx = {
    //   nonce: nonce,
    //   gasPrice: 20000000000,
    //   gasLimit: 1000000,
    //   // if this value is increase to a certain amount, we'll get exceeed gas limit error
    //   to: null,
    //   value: 0,
    //   data: "0x60806040526000805534801561001457600080fd5b50610771806100246000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80636057361d1461005c5780636f760f411461007857806395679e46146100945780639e7a13ad146100c4578063a6b7fc5b146100f5575b600080fd5b6100766004803603810190610071919061046d565b610113565b005b610092600480360381019061008d9190610411565b61011d565b005b6100ae60048036038101906100a991906103c8565b6101ad565b6040516100bb919061052a565b60405180910390f35b6100de60048036038101906100d9919061046d565b6101db565b6040516100ec929190610545565b60405180910390f35b6100fd610297565b60405161010a919061052a565b60405180910390f35b8060008190555050565b600160405180604001604052808381526020018481525090806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000015560208201518160010190805190602001906101839291906102a0565b505050806002836040516101979190610513565b9081526020016040518091039020819055505050565b6002818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b600181815481106101eb57600080fd5b90600052602060002090600202016000915090508060000154908060010180546102149061063e565b80601f01602080910402602001604051908101604052809291908181526020018280546102409061063e565b801561028d5780601f106102625761010080835404028352916020019161028d565b820191906000526020600020905b81548152906001019060200180831161027057829003601f168201915b5050505050905082565b60008054905090565b8280546102ac9061063e565b90600052602060002090601f0160209004810192826102ce5760008555610315565b82601f106102e757805160ff1916838001178555610315565b82800160010185558215610315579182015b828111156103145782518255916020019190600101906102f9565b5b5090506103229190610326565b5090565b5b8082111561033f576000816000905550600101610327565b5090565b60006103566103518461059a565b610575565b90508281526020810184848401111561037257610371610704565b5b61037d8482856105fc565b509392505050565b600082601f83011261039a576103996106ff565b5b81356103aa848260208601610343565b91505092915050565b6000813590506103c281610724565b92915050565b6000602082840312156103de576103dd61070e565b5b600082013567ffffffffffffffff8111156103fc576103fb610709565b5b61040884828501610385565b91505092915050565b600080604083850312156104285761042761070e565b5b600083013567ffffffffffffffff81111561044657610445610709565b5b61045285828601610385565b9250506020610463858286016103b3565b9150509250929050565b6000602082840312156104835761048261070e565b5b6000610491848285016103b3565b91505092915050565b60006104a5826105cb565b6104af81856105d6565b93506104bf81856020860161060b565b6104c881610713565b840191505092915050565b60006104de826105cb565b6104e881856105e7565b93506104f881856020860161060b565b80840191505092915050565b61050d816105f2565b82525050565b600061051f82846104d3565b915081905092915050565b600060208201905061053f6000830184610504565b92915050565b600060408201905061055a6000830185610504565b818103602083015261056c818461049a565b90509392505050565b600061057f610590565b905061058b8282610670565b919050565b6000604051905090565b600067ffffffffffffffff8211156105b5576105b46106d0565b5b6105be82610713565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000819050919050565b82818337600083830152505050565b60005b8381101561062957808201518184015260208101905061060e565b83811115610638576000848401525b50505050565b6000600282049050600182168061065657607f821691505b6020821081141561066a576106696106a1565b5b50919050565b61067982610713565b810181811067ffffffffffffffff82111715610698576106976106d0565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b61072d816105f2565b811461073857600080fd5b5056fea26469706673582212201d9bf7f034831f25eefe1009832d7f86ff36b3a5f2f3aa13576e2d6b6e7f093064736f6c63430008070033",
    //   chainId: 1337, // Ganache has chain id 31337 or 1337. placing network id here will result in error
    // };

    // const SignedTxResponse = await wallet.signTransaction(tx); // Only signs the transaction

    // console.log(SignedTxResponse);

    // const sentTxResponse = await wallet.sendTransaction(tx);
    // await sentTxResponse.wait(1);
    // console.log(sentTxResponse);

    console.log(`Contract Address: ${contract.address}`)
    //get the favourite number
    const currentFavoriteNumber = await contract.retrive()
    console.log(`Favorite Number is : ${currentFavoriteNumber.toString()}`) // returns number a string
    //console.log(currentFavoriteNumber); // returns as BigNumber

    // const transactionResponse = await contract.store("7")
    // const transacttionReceipt = await transactionResponse.wait(1)
    ;(await contract.store("10")).wait(1) // it's also valid
    const updatedFavoriteNumber = await contract.retrive()
    console.log(`Updated Favorite Number is: ${updatedFavoriteNumber}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
