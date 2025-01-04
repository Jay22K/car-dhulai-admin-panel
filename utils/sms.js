const axios = require('axios');

const sendSMS = async (phoneNumber, otp) => {

    try {
        // Define the API URL and query parameters
        const url = 'https://www.easygosms.in/api/url_api.php';
        const params = {
            api_key: 'i1hOFSytXLK6nQUp',
            pass: 'M7YjI48NST',
            senderid: 'TAPTWO',
            dlttempid: '1707172802688179560',
            dlttagid: '',
            message: `Dear User, Your OTP for logging in TapToWash is ${otp} Please do not share with anyone, thank you.`,
            dest_mobile: "+91" + phoneNumber,
            mtype: 'TXT'
        };

        // Call the API using Axios
        const smsResponse = await axios.get(url, {
            params,
            headers: {
                'Content-Type': 'application/json'  // Or any other content type you need
            }
        })
        console.log("Response:", smsResponse);

    } catch (error) {
        console.log("Catch error while sending sms:", error);
    }
}


module.exports = { sendSMS };