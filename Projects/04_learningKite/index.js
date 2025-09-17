
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import axios from 'axios';
import fs from 'fs';
import crypto from 'crypto';
import inquirer from 'inquirer';

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const PORT = process.env.PORT || 3000;
console.log('API_KEY:', API_KEY);
const TOKEN_FILE = './request_token.json';

function saveRequestToken(t) {
    fs.writeFileSync(TOKEN_FILE, JSON.stringify(t, null, 2));
}

function loadRequestToken() {
    if (fs.existsSync(TOKEN_FILE)) return JSON.parse(fs.readFileSync(TOKEN_FILE));
    return null;
}

// --- Server to handle /callback and exchange request_token ---
function startLoginServer() {
    const app = express();

    app.get('/callback', async (req, res) => {
        const request_token = req.query.request_token;
        if (!request_token) return res.status(400).send('No request_token');
        console.log('request token: ', request_token)
        try {
            const checksum = crypto
                .createHash('sha256')
                .update(API_KEY + request_token + API_SECRET)
                .digest('hex');



            console.log('Exchanging token with:');
            console.log('api_key:', API_KEY);
            console.log('request_token:', request_token);
            console.log('checksum:', checksum);    



            const resp = await axios.post('https://api.kite.trade/session/token',
                                            new URLSearchParams({
                                                api_key: API_KEY,  
                                                request_token,
                                                checksum
                                            }),
                                            { headers: { 'X-Kite-Version': '3' } }
                                        );

            saveRequestToken(resp.data.data);
            console.log('\n✅ Access token saved!\n');

            // Respond to the browser without killing the server
            res.send('<h2>Login successful! You can close this tab.</h2>');

        } catch (err) {
            console.error(err.response?.data || err.message);
            res.status(500).send('Error exchanging token');
        }
    });

    app.listen(PORT, () => {
        console.log(`\n🚀 Server running on http://localhost:${PORT}`);
        console.log(`Open this URL in your browser to login:\n` +
            `https://kite.zerodha.com/connect/login?v=3&api_key=${API_KEY}\n`);
    });
}

// --- CLI actions ---
async function viewProfile() {
    const token = loadRequestToken();
    if (!token?.access_token) {
        console.log('❌ No token found. Please login first.');
        return;
    }
    try {
        const resp = await axios.get('https://api.kite.trade/user/profile', {
            headers: { Authorization: `token ${API_KEY}:${token.access_token}` }
        });
        console.log('\n👤 Profile:\n', resp.data.data, '\n');
    } catch (e) {
        console.error(e.response?.data || e.message);
    }
}

async function 
viewPositions() {
    const token = loadRequestToken();
    if (!token?.access_token) {
        console.log('❌ No token found. Please login first.');
        return;
    }
    try {
        const resp = await axios.get('https://api.kite.trade/portfolio/positions', {
            headers: { Authorization: `token ${API_KEY}:${token.access_token}` }
        });
        console.log('\n📊 Positions:\n', resp.data.data, '\n');
    } catch (e) {
        console.error(e.response?.data || e.message);
    }
}

// --- Interactive menu ---
async function mainMenu() {
    while (true) {
        const { choice } = await inquirer.prompt([{
            type: 'list',
            name: 'choice',
            message: 'Select an action:',
            choices: [
                { name: '🔑 Login to Zerodha', value: 'login' },
                { name: '👤 View Profile', value: 'profile' },
                { name: '📊 View Positions', value: 'positions' },
                { name: '🚪 Exit', value: 'exit' }
            ]
        }]);

        if (choice === 'login') {
            startLoginServer();
            console.log('Waiting for login callback...');
            // Don't break; allow user to interact or just open browser manually
        } else if (choice === 'profile') {
            await viewProfile();
        } else if (choice === 'positions') {
            await viewPositions();
        } else if (choice === 'exit') {
            console.log('👋 Goodbye!');
            process.exit(0);
        }
    }
}

mainMenu();
