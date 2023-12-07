import React, {useRef, useState} from 'react';
import axios from 'axios';
import {ChevronDoubleRightIcon} from '@heroicons/react/24/solid'
import DoubleArrowButton from "../double-arrow-button/double-arrow-button";
import {DIRECTIONS} from "../../constants/directions";

import './des-page.css';

const DesPage = () => {
    const textToEncryptRef = useRef();
    const encryptKeyRef = useRef();
    const codeToDecryptRef = useRef();

    const [isEncodeTextFieldLoading, setEncodeTextFieldLoading] = useState(false);
    const [isDecodeTextFieldLoading, setDecodeTextFieldLoading] = useState(false);
    const [roundKeys, setRoundKeys] = useState(null);
    const [entropy, setEntropy] = useState(null);


    const encodeText = async () => {
        setDecodeTextFieldLoading(true);
        const result = await axios.post('http://localhost:8000/api/encode/', {
            string: textToEncryptRef.current.value,
            key: encryptKeyRef.current.value
        })
        setDecodeTextFieldLoading(false);
        codeToDecryptRef.current.value = result.data.cipher_text;
        setEntropy(result.data.entropy)
        setRoundKeys(result.data.round_keys_binary)
    }

    const decodeText = async () => {
        setEncodeTextFieldLoading(true);
        const result = await axios.post('http://localhost:8000/api/decode/', {
            string: codeToDecryptRef.current.value,
            key: encryptKeyRef.current.value
        })
        setEncodeTextFieldLoading(false)
        textToEncryptRef.current.value = result.data.decoded_text.trim();
        setEntropy(result.data.entropy)
        setRoundKeys(result.data.round_keys_binary)
    }

    const clearFields = () => {
        textToEncryptRef.current.value = null;
        codeToDecryptRef.current.value = null;
        encryptKeyRef.current.value = null;
        setRoundKeys(null)
        setEntropy(null)
    }

    const formatNumber = number => (Math.round(number * 100) / 100).toFixed(2);

    const renderEntropyRow = (entropiesPerRound, tableIndex, blockIndex) => {
        let className = "px-3 py-4 font-medium whitespace-nowrap ";
        className = blockIndex % 2 === 0 ? className + ` text-gray-900 dark:text-white` : className + ` text-yellow-300 dark:text-yellow`

        let digitClass = "px-3 py-4";
        digitClass = blockIndex % 2 === 0 ? digitClass + ` text-gray-900 dark:text-white` : digitClass + ` text-yellow-300 dark:text-yellow`

        return (
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row"
                    className={className}>
                    {tableIndex === 0 ? 'Initial entropy' : tableIndex}
                </th>
                <td className={digitClass}>
                    {formatNumber(entropiesPerRound[0])}
                </td>

                <td className={digitClass}>
                    {formatNumber(entropiesPerRound[1])}
                </td>

                <td className={digitClass}>
                    {formatNumber(entropiesPerRound[2])}
                </td>

                <td className={digitClass}>
                    {formatNumber(entropiesPerRound[3])}
                </td>

                <td className={digitClass}>
                    {formatNumber(entropiesPerRound[4])}
                </td>

                <td className={digitClass}>
                    {formatNumber(entropiesPerRound[5])}
                </td>

                <td className={digitClass}>
                    {formatNumber(entropiesPerRound[6])}
                </td>

                <td className={digitClass}>
                    {formatNumber(entropiesPerRound[7])}
                </td>

            </tr>
        )
    }

    const renderEntropyBlock = (entropyBlock, blockIndex) => {
        return entropyBlock.map((entropiesPerRound, i) => renderEntropyRow(entropiesPerRound, i, blockIndex));
    }

    const renderEntropyTable = () => {
        return (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-1/2 h-full">
                <table className="w-full h-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-3 py-3">
                            Entropy(Round)
                        </th>
                        <th scope="col" className="px-3 py-3">
                            1
                        </th>
                        <th scope="col" className="px-3 py-3">
                            2
                        </th>
                        <th scope="col" className="px-3 py-3">
                            3
                        </th>
                        <th scope="col" className="px-3 py-3">
                            4
                        </th>
                        <th scope="col" className="px-3 py-3">
                            5
                        </th>
                        <th scope="col" className="px-3 py-3">
                            6
                        </th>
                        <th scope="col" className="px-3 py-3">
                            7
                        </th>
                        <th scope="col" className="px-3 py-3">
                            8
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {entropy.map((entropyBlock, blockIndex) => renderEntropyBlock(entropyBlock, blockIndex))}
                    </tbody>
                </table>
            </div>

        )
    }

    const renderRoundKeyRow = (roundKey, tableIndex) => (
        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <th scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {tableIndex + 1}
            </th>
            <td className="px-6 py-4">
                {roundKey}
            </td>
        </tr>
    )

    const renderRoundKeysTable = () => {
        return (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-1/3">
                <table className="w-full h-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Round
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Key
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {roundKeys.map((roundKey, i) => renderRoundKeyRow(roundKey, i))}
                    </tbody>
                </table>
            </div>

        )
    }


    return (
        <div className="flex h-full flex-col bg-white dark:bg-slate-900">
            <div className="flex h-3/5 flex-row flex-nowrap bg-white dark:bg-slate-900 justify-around p-10">
                <div
                    className="flex flex-col h-full w-1/4 justify-between items-center rounded-md drop-shadow-md bg-gray-200 dark:bg-white text-xl p-1 hover:shadow-gray-500 duration-100">
                    <textarea className="w-full h-full focus:outline-none rounded-md resize-none auto-8-spacing"
                              ref={textToEncryptRef}/>
                </div>
                <div className="flex flex-col justify-around items-center h-full">
                    <DoubleArrowButton direction={DIRECTIONS.RIGHT} label="Encode text" onClick={encodeText}/>
                    <div className="flex flex-col h-1/4 w-full justify-around items-center">
                        {/*<h3 className="text-amber-50 font-sans">Enter the 1-byte key (8 chars, 64 bits):</h3>*/}
                        <div
                            className="flex h-3/4 w-full rounded-md drop-shadow-md bg-gray-200 dark:bg-white text-2xl p-1 shadow-md hover:shadow-gray-500 duration-100">
                            <textarea className="w-full focus:outline-none rounded-md resize-none" rows={1}
                                      maxLength={8} ref={encryptKeyRef}
                                      placeholder="Enter the 1-byte key (8 chars, 64 bits):"/>
                        </div>
                    </div>
                    <DoubleArrowButton direction={DIRECTIONS.LEFT} label="Decode text" onClick={decodeText}/>
                </div>
                <div
                    className="flex h-full w-1/4 rounded-md drop-shadow-md bg-gray-200 dark:bg-white shadow-md hover:shadow-gray-500 duration-100">
                <textarea className="w-full focus:outline-none rounded-md resize-none auto-8-spacing"
                          ref={codeToDecryptRef}/>
                </div>
            </div>
            <div className="flex h-16 justify-center items-center">
                <button onClick={clearFields}
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2
                     overflow-hidden text-sm font-medium text-gray-900
                     rounded-lg group bg-gradient-to-br
                     from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400
                      hover:text-white dark:text-white focus:ring-4 focus:outline-none
                       focus:ring-pink-200 dark:focus:ring-pink-800">
                    <span
                        className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-44 h-full">
                    Reset
                    </span>
                </button>
            </div>
            <div className="flex h-2/5 justify-around flex-row mt-10">
                {
                    entropy && renderEntropyTable()
                }
                {
                    roundKeys && renderRoundKeysTable()
                }
            </div>
        </div>

    );
};

export default DesPage;
