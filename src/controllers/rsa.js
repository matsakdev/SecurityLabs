import axios from "axios";
import {REQUEST_HEADERS, URL_HOST} from "../constants/rsa";
import {JSEncrypt} from "jsencrypt";

export function getPublicKey() {
    return axios.get(URL_HOST + "/api/Auth/api/key", { headers: REQUEST_HEADERS});
}

export async function sendLoginRequest(email, password, rsaKey, setEncryptedInfoCallback) {
    const Encrypt = new JSEncrypt();
    Encrypt.setPublicKey(rsaKey);
    const encryptedEmail = Encrypt.encrypt(email);
    const encryptedPassword = Encrypt.encrypt(password);

    setEncryptedInfoCallback(encryptedEmail, encryptedPassword);

    return axios.post(URL_HOST + "/api/Auth/api/login", { email: encryptedEmail, password: encryptedPassword })
}