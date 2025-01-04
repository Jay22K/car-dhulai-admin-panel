const axios = require('axios');
require('dotenv').config;

const sendSMS = async (phoneNumber, otp) => {

    try {
        // Define the API URL and query parameters
        const url = process.env.SMS_URL;
        const params = {
            api_key: process.env.SMS_API_KEY,
            pass: process.env.SMS_API_PASS,
            senderid: process.env.SMS_SENDER_ID,
            dlttempid: process.env.SMS_TEMPLATE_ID,
            dlttagid: '',
            message: `Dear User, Your OTP for logging in TapToWash is ${otp} Please do not share with anyone, thank you.`,
            dest_mobileno: phoneNumber,
            mtype: 'TXT'
        };

        // Call the API using Axios
        const smsResponse = await axios.post(url, {}, {
            params,
            headers: {
                'Content-Type': 'application/json'  // Or any other content type you need
            }
        })
        console.log("Response:", smsResponse.data);

    } catch (error) {
        console.log("Catch error while sending sms:", error);
    }
}


module.exports = { sendSMS };