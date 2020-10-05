import AWS = require("aws-sdk");

AWS.config.update({ region: "eu-west-1" });

export const createMetricLogger = () => {
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
        console.log("No AWS_ACCESS_KEY_ID or AWS_SECRET_ACCESS_KEY set, not logging to Cloudwatch");

        return {
            sendGameCount: (count: number) => {}
        };
    }

    const cw = new AWS.CloudWatch();

    const sendMetric = (name: string, unit: string, value: number) => {
        const params = {
            MetricData: [
                {
                    MetricName: name,
                    Unit: unit,
                    Value: value
                },
            ],
            Namespace: "creature-chess/server"
        };

        cw.putMetricData(params, (err, data) => {
            if (err) {
                console.log("Error sending metric", err);
            } else {
                console.log("Success sending metric", JSON.stringify(data));
            }
        });
    };

    return {
        sendGameCount: (count: number) => sendMetric("game-count", "Count", count)
    };
};
