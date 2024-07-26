// api/jira.js
const fetch = require('node-fetch');

const JIRA_URL = 'https://jhtnaee.atlassian.net';
const JIRA_USERNAME = 'maxnguyen@johnsonfitness.com';
const JIRA_API_TOKEN = 'ATATT3xFfGF0vcCjF2mRFTLhIrXakvU1bV01LvwhuXH_ijtw6g-2LBG54Dnh3tB5vj1kyynidyZQWY8cvZpggrvpthp173OxuWHqfDVPkcbKXDJuXRkKsfuUFWJqMuuLmXQragrySOB4Zlzy808s8WODYhxlubcXCuohJ8GIUXA0c62yvvD2Uik=35EB8AD9';

module.exports = async (req, res) => {
    const { jql, startAt = 0, maxResults = 50 } = req.query;
    const searchUrl = `${JIRA_URL}/rest/api/2/search?jql=${encodeURIComponent(jql)}&startAt=${startAt}&maxResults=${maxResults}`;

    try {
        const response = await fetch(searchUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${JIRA_USERNAME}:${JIRA_API_TOKEN}`).toString('base64'),
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            res.status(200).json(data);
        } else {
            res.status(response.status).json({ message: response.statusText });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
