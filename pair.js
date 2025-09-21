//By:  Tᴀɪʀᴀ Mᴀᴋɪɴᴏ
//https://t.me/Tha_Healer
//https://github.com/anonphoenix007

const {makeid} = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
    makeWASocket,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require("baileys-pro");
const { Octokit } = require("@octokit/core")
const octokit = new Octokit({
    auth: process.env.GH_TOKEN //GitHub token here
});

function removeFile(FilePath){
    if(!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true })
 };
router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
        async function ICON_TECH_CODE() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState('./temp/'+id)
     try {
            let ICON_TECH_SESSION= makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({level: "fatal"}).child({level: "fatal"})),
                },
                printQRInTerminal: false,
                logger: pino({level: "silent"}).child({level: "silent"}),
                /*browser: ["Chrome (Linux)", "", ""],
                version: [2, 3000, 1023223821]*/
                //version: [2, 3000, 1025091846]
                version: [2, 3000, 1023223821],
                browser: Browsers.ubuntu("Edge")
             });
             if(!ICON_TECH_SESSION.authState.creds.registered) {
                await delay(1500);
                        num = num.replace(/[^0-9]/g,'');
                            let code = await ICON_TECH_SESSION.requestPairingCode(num)
                            console.log(code)
                            code = code?.match(/.{1,4}/g)?.join("-") || code;
                 if(!res.headersSent){
                 await res.send({code});
                     }
                 }
            ICON_TECH_SESSION.ev.on('creds.update', saveCreds)
            ICON_TECH_SESSION.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect
                } = s;
                if (connection == "open") {
                await delay(10000);
                let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`, "utf-8")
                await delay(800);
                let a = await octokit.request("POST /gists", {
                    files: {
                        'test': {
                            content: JSON.stringify(data, null, 2)
                        },
                    },
                });
                    
                    const ss_id = a.data.url.replace('https://api.github.com/gists/', '');
                    console.log("SESSION_ID: ", ss_id)
               let session = await ICON_TECH_SESSION.sendMessage(ICON_TECH_SESSION.user.id, { text: ss_id });
               await ICON_TECH_SESSION.sendMessage(ICON_TECH_SESSION.user.id, { text: `
Telegram - https://t.me/KallmeTrust 
Follow GitHub` }, { quoted: session})
 
        await delay(100);
        await ICON_TECH_SESSION.ws.close();
        return await removeFile('./temp/'+id);
            } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    ICON_TECH_CODE();
                }
            });
        } catch (err) {
            console.log("service restated");
            await removeFile('./temp/'+id);
         if(!res.headersSent){
            await res.send({code:"Service Unavailable"});
         }
        }
    }
    return await ICON_TECH_CODE()
});
module.exports = router
