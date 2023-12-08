import React from 'react';

const ControlButtons = ({changeRsaLocally, getPublicKey}) => {
    return (
        <React.Fragment>
            <button onClick={changeRsaLocally}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden
                 text-2xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400
                  group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4
                   focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"><span
                className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white
                 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">Change RSA Locally</span>
            </button>
            <button onClick={getPublicKey}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden
                text-2xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500
                group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4
                focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"><span
    className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white
    dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">Get Server RSA Key</span>
            </button>
        </React.Fragment>
    );
};

export default ControlButtons;
