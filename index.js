#!/usr/bin/env node

// pnr 4506793545
const { getStatus } = require('./checkPnrStatus');

if (!process.argv[2]) {
        // eslint-disable-next-line no-console
        console.log(`pnr [input]`);
} else if (process.argv[2].length === 10) {
        getStatus(process.argv[2]);
} else {
        // eslint-disable-next-line no-console
        console.log('Please enter a valid 10 Digit PNR Number');
}
