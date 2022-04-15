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
    const [transactionDetails, setTransactionDetails] = useState('');
    const [loader, setLoader] = useState(false);

    const [accountAddress, setAccountAddress] = useState('');

    useEffect(() => {
        const Provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(Provider);
        setSinger(Provider.getSigner());
    }, []);

    const connect = async () => {
        try {
                await activate(injected);
            // await provider.send("eth_requestAccounts", [])
            //     .then(res => setAccountAddress(res[0]));
        } catch (ex) {
            console.log(ex)
        }
    }

    const disconnect = async () => {
        try {
            deactivate();
            setBalance('');
            setTransactionDetails('');
        } catch (ex) {
            console.log(ex)
        }
    }

    const getBalance = async () => {
        try {
            await web3.eth.getBalance(account)
            .then((res) => setBalance(web3.utils.fromWei(res,"ether")));
            // await provider.getBalance(accountAddress).then(res => {
            //     setBalance(ethers.utils.formatEther(res));
            // });
        } catch (ex) {
            console.log(ex)
        }
    }

    const sendAmount = async () => {
        setLoader(true);
        try {
            await web3.eth.sendTransaction({
                to: '0x92FF5b10A02585045C66953bA17aB7b589c190f6',
                from: account,
                value: web3.utils.toWei('0.01', 'ether'),
            }).then((res) => {
                setTransactionDetails(res);
                getBalance();
                setLoader(false);
            });
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
                    <button onClick={getBalance} className="py-2 mt-12 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Show Wallet Balance</button>
                    {balance && <span>Current Balance is <b>{parseFloat(balance).toFixed(4)}</b> ETH</span>}
                    <button onClick={sendAmount} className="py-2 mt-12 mb-4 text-lg font-bold text-white rounded-lg w-96 bg-blue-600 hover:bg-blue-800">Send Amount to My Other Account</button>
                    {(loader || transactionDetails) &&
                        <div className={'border-double border-4 border-blue-800 p-10'}>
                            {loader ?
                                <button type="button" className="font-bold text-blue" disabled>
                                    Processing...
                                </button> :
                                <>
                                    <div className={'font-extrabold text-center text-2xl mb-2 underline'}>Details</div>
                                    &nbsp;
                                    <p className={'flex'}>
                                        <span className={'w-56'}><b>From Wallet Address:</b></span> &nbsp;
                                        <span className={'w-auto'}>{transactionDetails.from}</span>
                                    </p>
                                    <p className={'flex'}>
                                        <span className={'w-56'}><b>To Wallet Address:</b></span>&nbsp;
                                        <span className={'w-auto'}>{transactionDetails.to}</span>
                                    </p>
                                    <p className={'flex'}>
                                        <span className={'w-56'}><b>Gas Used:</b></span> &nbsp;
                                        <span className={'w-auto'}>{transactionDetails.gasUsed}</span>
                                    </p>
                                    <p className={'flex'}>
                                        <span className={'w-56'}><b>Block Number:</b></span> &nbsp;
                                        <span className={'w-auto'}>{transactionDetails.blockNumber}</span>
                                    </p>
                                    <p className={'flex'}>
                                        <span className={'w-56'}><b>Block Hash:</b></span> &nbsp;
                                        <span className={'w-auto'}>{transactionDetails.blockHash}</span>
                                    </p>
                                    <p className={'flex'}>
                                        <span className={'w-56'}><b>Cumulative Gas Used:</b></span> &nbsp;
                                        <span className={'w-auto'}>{transactionDetails.cumulativeGasUsed}</span>
                                    </p>
                                    <p className={'flex'}>
                                        <span className={'w-56'}><b>Effective Gas Price:</b></span> &nbsp;
                                        <span className={'w-auto'}>{transactionDetails.effectiveGasPrice}</span>
                                    </p>
                                    <p className={'flex'}>
                                        <span className={'w-56'}><b>Transaction Hash:</b></span> &nbsp;
                                        <span className={'w-auto'}>{transactionDetails.transactionHash}</span>
                                    </p>
                                    <p className={'flex'}>
                                        <span className={'w-56'}><b>Transaction Index:</b></span> &nbsp;
                                        <span className={'w-auto'}>{transactionDetails.transactionIndex}</span>
                                    </p>
                                </>
                            }
                        </div>
                    }
                </>
            :
                <span>Not connected</span>
            }
            <button onClick={disconnect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Disconnect</button>
        </div>
    )
}
