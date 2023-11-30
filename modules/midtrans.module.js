const fs = require("fs");
const midtransClient = require("midtrans-client");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
dotenv.config();

class Midtrans {
    snap = async (body) => {
        try {
            const orderId = uuidv4();
            const snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY,
                clientKey: process.env.MIDTRANS_CLIENT_KEY,
            });
            const data = {
                transaction_details: {
                    order_id: orderId,
                    gross_amount: Number(body.amount),
                    // other transaction details...
                },
                // other properties...
            };

            try {
                const response = await snap.createTransaction(data);
                const token = response.token;
                return {
                    status: true,
                    code: 200,
                    data: {
                        token,
                        orderId,
                    },
                };
            } catch (error) {
                console.error(error);
                return {
                    status: false,
                    code: 500,
                    message: error,
                };
            }
        } catch (error) {
            console.error("midtrans module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };
}

module.exports = new Midtrans();
