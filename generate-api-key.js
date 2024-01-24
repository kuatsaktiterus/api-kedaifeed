"use strict";
const readline = require('readline');
const ApiKey = require('./models/api/ApiKey.model');
const mongoose = require('mongoose');
require('dotenv').config();

const generateApiKey = require('generate-api-key').default;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

mongoose.connect(process.env.DB_CONNECTION);

rl.write(`Generating api key and save it to database please fill the name of who is gonna use the api key.\n`);

rl.question("Name: ", async (name) => {
    const generatedApiKey = generateApiKey({length: 60});
    const apiKey = new ApiKey({
        name: name,
        key: generatedApiKey
    });
    const successMSG = `Success generating api-key \n\nName:\t ${name} \nApi-key: ${generatedApiKey}`;

    await (async function() {
        try {
            await apiKey.save();
            console.log(successMSG);
        } catch (error) {
            console.log(`error ${error}`);
        }
        return;
    })();

    console.log('\npress ctrl+c to exit');
    rl.close();
});