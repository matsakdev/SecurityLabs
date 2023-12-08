import React from 'react'
import logo from './logo.svg';
import './App.css';
import DesPage from "./components/des-page/des-page";
import {useState} from "react";
import {WINDOWS} from "./constants/shared";
import RsaPage from "./components/rsa-page/rsa-page";

function App() {
    const [currentWindow, setCurrentWindow] = useState(WINDOWS.DES)
    const toggleWindow = () => {
        setCurrentWindow(currentWindow === WINDOWS.DES ? WINDOWS.RSA : WINDOWS.DES)
    }

    return (
        <div className="App dark min-h-screen h-screen flex flex-col">
            {
                currentWindow === WINDOWS.DES && (
                    <React.Fragment>
                        <header className="App-header h-32 cursor-pointer" onClick={toggleWindow}>
                            <img src={logo} className="App-logo" alt="logo"/>
                            <p>
                                React <code className="text-3xl">DES ALGO</code> app.
                            </p>
                        </header>
                        <DesPage/>
                    </React.Fragment>
                )
            }
            {
                currentWindow === WINDOWS.RSA && (
                    <React.Fragment>
                        <header className="App-header h-32 cursor-pointer" onClick={toggleWindow}>
                            <img src={logo} className="App-logo" alt="logo"/>
                            <p>
                                React <code className="text-3xl">RSA ALGO</code> app.
                            </p>
                        </header>
                        <RsaPage/>
                    </React.Fragment>
                )
            }
        </div>
    );
}

export default App;
