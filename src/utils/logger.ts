import {Amplify, AWSCloudWatchProvider, Logger} from "aws-amplify";



export function getLogger(name:string)
{
    const logger = new Logger(name);
    Amplify.register(logger);
    logger.addPluggable(new AWSCloudWatchProvider());
    return logger;
}


