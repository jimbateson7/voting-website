import {Amplify, AWSCloudWatchProvider, Logger} from "aws-amplify";

Amplify.configure({
    Logging: {
        logGroupName: 'our-people',
        logStreamName: '1-our-people',
    },
    //...awsExports todo?
});

export function getLogger(name:string)
{
    const logger = new Logger(name);
    Amplify.register(logger);
    logger.addPluggable(new AWSCloudWatchProvider());
    return logger;
}