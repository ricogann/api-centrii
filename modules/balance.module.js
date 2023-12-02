const prisma = require("../helpers/database");

class Balance {
    getBalance = async (id) => {
        try {
            const balance = await prisma.balance.findFirst({
                where: {
                    id: parseInt(id),
                },
            });

            return { status: true, code: 200, data: balance };
        } catch (error) {
            console.error("balance module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };
}

module.exports = new Balance();
