const fetch = require('node-fetch');
const cheerio = require('cheerio');
const Table = require('cli-table3');

function addStatusText(pnrStatus) {
        let pnrStatusText;
        switch (pnrStatus) {
                case `W/L`:
                        pnrStatusText = `${pnrStatus} (Waiting List)`;
                        return pnrStatusText;
                case `CNF`:
                        pnrStatusText = `${pnrStatus} (Confirmed)`;
                        return pnrStatusText;
                default:
                        return pnrStatus;
        }
}

exports.getStatus = async function(pnr) {
        const fetchData = await fetch(`https://www.railyatri.in/pnr-status/${pnr}`);
        const data = await fetchData.text();
        const $ = cheerio.load(data);
        const titleNode = $('.pnr-bold-txt', '.pnr-search-result-title');
        const infoNode = $('.pnr-bold-txt', '.pnr-search-result-info');

        const pnrNumber = titleNode
                .slice(0)
                .eq(0)
                .text();
        const pnrStatus = titleNode
                .slice(1)
                .eq(0)
                .text();
        const trainName = infoNode
                .slice(0)
                .eq(0)
                .text();

        const table = new Table();
        table.push({ PNR: pnrNumber }, { 'PNR STATUS': addStatusText(pnrStatus) }, { 'TRAIN NAME': trainName });
        // eslint-disable-next-line no-console
        console.log(table.toString());
};
