//By:  T???? M?????
//https://t.me/Tha_Healer
//https://github.com/anonphoenix007

const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: ICON_TECH,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("baileys-pro");
const { Octokit } = require("@octokit/core")
const octokit = new Octokit({
    auth: "" //GitHub token here
});

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function ICON_TECH_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let ICON_TECH_SESSION = ICON_TECH({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			ICON_TECH_SESSION.ev.on('creds.update', saveCreds)
			ICON_TECH_SESSION.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
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
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					ICON_TECH_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await ICON_TECH_CODE()
});
module.exports = router
