import React from 'react';
import ControlButtons from "../control-buttons/control-buttons";
import {get} from "axios";

const InfoContainer = ({encryptedEmail, encryptedPassword, receivedPassword, receivedEmail, rsaKey, changeRsaLocally, getPublicKey}) => {
    return (
        <React.Fragment>
            <label htmlFor="emailEncypted"
                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Encrypted
                email</label>
            <input type="email" id="emailEncypted" aria-describedby="helper-text-explanation"
                   value={encryptedEmail ? encryptedEmail : null}
                   className="bg-gray-50 cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 shadow-md shadow-blue-800
                   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   disabled/>

            <label htmlFor="passwordEncrypted"
                   className="block mt-8 mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Encrypted
                password</label>
            <input type="text" id="passwordEncrypted" aria-describedby="helper-text-explanation"
                   value={encryptedPassword ? encryptedPassword : null}
                   className="bg-gray-50 cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 shadow-md shadow-blue-800
                   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   disabled/>

            <div className="flex flex-row items-center w-full">
                <div className="flex flex-col justify-start items-start w-1/2">
                    <label htmlFor="emailReceived"
                           className="block mt-8 mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Received
                        email</label>
                    <input type="email" id="emailReceived" aria-describedby="helper-text-explanation"
                           value={receivedEmail ? receivedEmail : null}
                           className="bg-gray-50 cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 shadow-md shadow-emerald-500
                   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           disabled/>

                    <label htmlFor="passwordReceived"
                           className="block mt-8 mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Received
                        password</label>
                    <input type="text" id="passwordReceived" aria-describedby="helper-text-explanation"
                           value={receivedPassword ? receivedPassword : null}
                           className="bg-gray-50 cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 shadow-md shadow-emerald-500
                   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           disabled/>
                </div>
                <div className="flex flex-col items-start pl-10 w-1/2">
                    <label htmlFor="rsa" className="block mt-8 mb-2 text-sm font-medium text-gray-900 dark:text-white">Rsa
                        Key
                    </label>
                    <textarea id="rsa" rows="6" value={rsaKey ? rsaKey : null}
                              className="block resize-none cursor-not-allowed p-2.5 w-full h-full
                              text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300
                               focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
                                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              disabled></textarea>
                </div>
            </div>
            <div className="flex flex-row justify-around items-center h-24 mt-10">
                <ControlButtons changeRsaLocally={changeRsaLocally} getPublicKey={getPublicKey}/>
            </div>
        </React.Fragment>
    );
};

export default InfoContainer;
