import React, {useEffect, useState} from 'react';
import LoginForm from "../login-form/login-form";
import {getPublicKey, sendLoginRequest} from "../../controllers/rsa";
import InfoContainer from "../info-container/info-container";

const RsaPage = () => {
    const [key, setKey] = useState(null);
    const [encryptedEmail, setEncryptedEmail] = useState(null);
    const [encryptedPassword, setEncryptedPassword] = useState(null);
    const [receivedPassword, setReceivedPassword] = useState(null);
    const [receivedEmail, setReceivedEmail] = useState(null);
    const [formStatus, setFormStatus] = useState(null);

    useEffect(() => {
        try {
            getPublicKey().then(response => {
                console.log(response.data);
                setKey(response.data.key);
            })
        } catch (err) {
            alert('Cannot connect to the host!')
        }
    }, [])

    const setEncryptedInfo = (email, password) => {
        setEncryptedEmail(email);
        setEncryptedPassword(password);
    }

    const loginRequest = (email, password) => {
        sendLoginRequest(email, password, key, setEncryptedInfo)
            .then(response => {
                const emailFromResponse = response.data.email;
                const passwordFromResponse = response.data.password;
                console.log(response)
                setReceivedEmail(emailFromResponse);
                setReceivedPassword(passwordFromResponse);
                setFormStatus("ok");
            })
            .catch(err => {
                console.error(err);
                alert('Network connection fail!');
            })
    }

    return (
        <div className="flex flex-col bg-white dark:bg-slate-900">
            <div className="flex flex-col h-1/3 justify-start items-center mt-16">
                <LoginForm formStatus={formStatus} onSubmitForm={loginRequest} />
            </div>
            <div className="flex flex-col justify-start align-start w-full p-24">
                <InfoContainer encryptedEmail={encryptedEmail} encryptedPassword={encryptedPassword}
                               receivedEmail={receivedEmail} receivedPassword={receivedPassword} rsaKey={key} />
            </div>
        </div>
    );
};

export default RsaPage;