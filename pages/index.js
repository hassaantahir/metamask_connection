import { useWeb3React } from "@web3-react/core";
import { injected } from "../components/wallet/Connectors";

export default function Home() {
    const { active, account, library, connector, activate, deactivate } = useWeb3React()

    const connect = async () => {
        try {
            await activate(injected)
        } catch (ex) {
            console.log(ex)
        }
    }

    const disconnect = async () => {
        try {
            deactivate()
        } catch (ex) {
            console.log(ex)
        }
    }

    const getBalance = async () => {
        try {
            const balance = Web3.getBalance(account);
            console.log(balance);
        } catch (ex) {
            console.log(ex)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <button onClick={connect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Connect to MetaMask</button>
            {active ?
                <>
                    <span>Connected with <b>{account}</b></span>
                    <button onClick={getBalance} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Show Wallet Balance</button>
                </> :
                <span>Not connected</span>
            }
            <button onClick={disconnect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Disconnect</button>
        </div>
    )
}
