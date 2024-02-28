import CryptoJS from 'crypto-js';

const SECRET = 'd50088343aaac6c5263e8a238bedb5e5'; // Replace with your actual secret key
const IV = 'd50088343aaac6c5'; // Replace with your actual initialization vector
export const Encryption = async (data) => {

    // const encryptData = async (data) => {
    try {
        // console.log("data", (typeof (data)));
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET, { iv: IV }).toString();
        return encryptedData;
    } catch (error) {
        console.log("error", error);
        return '';
    }
    // };

    // const decryptData = async (data) => {
    //     try {
    //         return CryptoJS.AES.decrypt(data, SECRET, { iv: IV }).toString(CryptoJS.enc.Utf8);
    //     } catch (error) {
    //         console.log("error", error);
    //         return '';
    //     }
    // };

    // // Example usage
    // // const myData = { "name": 'Piyush' };
    // const myData = "";
    // encryptData(myData).then((result) => {
    //     console.log('Encrypted Data:', result);
    //     // You can use the encrypted data as needed
    // });
    // const decrypt_data = "U2FsdGVkX197PLhKAN6XO3ZnyYvpZOh3FTPQNL3PzfM="
    // decryptData(decrypt_data).then((result) => {
    //     console.log('Decrypt Data:', result);
    //     // You can use the encrypted data as needed
    // });

    // return (
    //     <div>
    //         <h1>Hello</h1>
    //     </div>
    // );
};
export const DecryptData = async (data) => {
    try {
        return CryptoJS.AES.decrypt(data, SECRET, { iv: IV }).toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.log("error", error);
        return '';
    }
};

// export default Encryption;
