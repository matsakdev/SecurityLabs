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

    const encodeText = async () => {
        setDecodeTextFieldLoading(true);
        const result = await axios.post('http://localhost:8000/api/encode/', {
            string: textToEncryptRef.current.value,
            key: encryptKeyRef.current.value
        })
        setDecodeTextFieldLoading(false);
        codeToDecryptRef.current.value = result.data.cipher_text;
        console.log(result)
    }

    const decodeText = async () => {
        setEncodeTextFieldLoading(true);
        const result = await axios.post('http://localhost:8000/api/decode/', {
            string: codeToDecryptRef.current.value,
            key: encryptKeyRef.current.value
        })
        setEncodeTextFieldLoading(false)
        textToEncryptRef.current.value = result.data.decoded_text.trim();
        console.log(result)
    }


    return (
        <div className="flex flex-1 flex-row flex-nowrap bg-white dark:bg-slate-900 justify-around p-10">
            <div className="flex flex-col h-1/2 w-1/4 justify-between items-center">
                <div
                    className="flex h-1/2 w-full rounded-md drop-shadow-md bg-gray-200 dark:bg-white text-xl p-1 shadow-md hover:shadow-gray-500 duration-100">
                    <textarea className="w-full focus:outline-none rounded-md resize-none" ref={textToEncryptRef}/>
                </div>

                <div className="flex flex-col h-1/4 w-full justify-around items-center">
                    <h3 className="text-amber-50 font-sans">Enter the 1-byte key (8 chars, 64 bits):</h3>
                    <div
                        className="flex h-full w-full rounded-md drop-shadow-md bg-gray-200 dark:bg-white text-xl p-1 shadow-md hover:shadow-gray-500 duration-100">
                        <textarea className="w-full focus:outline-none rounded-md resize-none" ref={encryptKeyRef}/>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-around items-center h-1/2">
                <DoubleArrowButton direction={DIRECTIONS.RIGHT} label="Encode text" onClick={encodeText}/>
                <DoubleArrowButton direction={DIRECTIONS.LEFT} label="Decode text" onClick={decodeText}/>
            </div>
            <div
                className="flex h-1/2 w-1/4 rounded-md drop-shadow-md bg-gray-200 dark:bg-white shadow-md hover:shadow-gray-500 duration-100">
                <textarea className="w-full focus:outline-none rounded-md resize-none auto-8-spacing"
                          ref={codeToDecryptRef}/>
            </div>
        </div>
    );
};

export default DesPage;
