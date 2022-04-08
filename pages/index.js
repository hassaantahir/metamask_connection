import { useWeb3React } from "@web3-react/core";
import { injected } from "../components/wallet/Connectors";
import Web3 from 'web3';
import { ethers } from "ethers";
import {useEffect, useState} from "react";

export default function Home() {
    const { active, account, library, connector, activate, deactivate } = useWeb3React();
    const web3 = new Web3(Web3.givenProvider);
    // const provider = new ethers.providers.Web3Provider(window.ethereum)

    const [balance, setBalance] = useState('');
    const [provider, setProvider] = useState({});
    const [singer, setSinger] = useState({});

    const [accountAddress, setAccountAddress] = useState('');

    useEffect(() => {
        const Provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(Provider);
        setSinger(Provider.getSigner());
    }, []);

    const connect = async () => {
        try {
            await provider.send("eth_requestAccounts", [])
                .then(res => setAccountAddress(res[0]));
                // activate(injected);
        } catch (ex) {
            console.log(ex)
        }
    }

    const disconnect = async () => {
        try {
            deactivate();
            setBalance('');
        } catch (ex) {
            console.log(ex)
        }
    }

    const getBalance = async () => {
        try {
            await provider.getBalance(accountAddress).then(res => {
                setBalance(ethers.utils.formatEther(res));
            });
            // await web3.eth.getBalance(account)
            // .then((res) => setBalance(web3.utils.fromWei(res,"ether")));
        } catch (ex) {
            console.log(ex)
        }
    }

    const sendAmount = async () => {
        try {
            await web3.eth.sendTransaction({
                to: '0x92FF5b10A02585045C66953bA17aB7b589c190f6',
                from: account,
                value: web3.utils.toWei('0.1', 'ether'),
            }).then((res) => console.log(res));
        } catch (ex) {
            console.log(ex)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <button onClick={connect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Connect to MetaMask</button>
            {active || accountAddress ?
                <>
                    <span>Connected with <b>{account || accountAddress}</b></span>
                    <button onClick={getBalance} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Show Wallet Balance</button>
                    {balance && <span className="mb-10 mt-2">Current Balance is <b>{balance}</b></span>}
                    <button onClick={sendAmount} className="py-2 mt-2 mb-4 text-lg font-bold text-white rounded-lg w-96 bg-blue-600 hover:bg-blue-800">Send Amount to Other Wallet</button>
                </>
            :
                <span>Not connected</span>
            }
            <button onClick={disconnect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Disconnect</button>
        </div>
    )
}
