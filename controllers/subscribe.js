const subscriberModel = require("../models").subscriber;

var Errors = {
    SQLError: Error("Failed to process request")
}

async function subscriberExists(email) {
    let count = 1;
    try {
        let count = subscriberModel.count({
            where: {
               "email": email 
            }
        });
    } catch (error) {
        console.error(error);
        throw Errors.SQLError;
    }
    if (count === 0) {
        return false;
    }
    return true;
}

async function createSubscriber(data){
    try {
        await subscriberModel.create({
            "email": data.email,
            "longtitude": data.lon,
            "latitude": data.lat,
            "agreed_to_subscribe": data.agreed
        });
    } catch (error) {
        console.error(error);
        throw Errors.SQLError;
    }
}

async function validateData(data) {
    if (!data.agreed) {
        return false;
    }
    return true;
}

async function handleSubscribtion(data){
    
    let ok = validateData(data);
    if (!ok) {
        return false;
    }

    let exists = false;

    try {
        exists = await subscriberExists(data.email);
    } catch (error) {
        throw error;
    }

    if (exists) {
        return false;
    }

    try {
        await createSubscriber(data);
    } catch (error) {
        throw error;
    }

    return true;
}

module.exports = {
    subscriberExists: subscriberExists,
    createSubscriber: createSubscriber,
    handleSubscribtion: handleSubscribtion
}