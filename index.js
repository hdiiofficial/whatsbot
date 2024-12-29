/**
   * @febbyadityan
   * github.com/FebbAdityaN
   * Please don't delete it, to respect the author.
   * Recode by thisdiex
*/

"use strict";
const {
	default: makeWASocket,
	makeInMemoryStore,
	DisconnectReason,
	useMultiFileAuthState,
	PHONENUMBER_MCC,
	generateWAMessageFromContent,
	makeCacheableSignalKeyStore,
	Mimetype
} = require("@whiskeysockets/baileys")
const {
  Boom
} = require('@hapi/boom');
const figlet = require("figlet");
const fs = require("fs");
const moment = require('moment')
const chalk = require('chalk')
const logger = require('pino')
const clui = require('clui')
const path = require("path");
const { Spinner } = clui
const { serialize } = require("./lib/myfunc");
const { color, mylog, infolog } = require("./lib/color");
const time = moment(new Date()).format('HH:mm:ss DD/MM/YYYY')
// let setting = JSON.parse(fs.readFileSync('./config.json'));

const store = makeInMemoryStore({
  logger: logger().child({
    level: 'silent',
    stream: 'store'
  })
});

const readlineConfig = {
    input: process.stdin,
    output: process.stdout
};

const readline = require('readline');
const rl = readline.createInterface(readlineConfig);
const question = (text) => new Promise((resolve) => rl.question(text, resolve));
const pairingCodeEnabled = true || process.argv.includes('--use-pairing-code');
const useMobileAPI = process.argv.includes('--mobile');


const startWhatsapp() {}

conn.ev.on('connection.update', (update) => {
          if (global.qr !== update.qr) {
           global.qr = update.qr
          }
          const { connection, lastDisconnect } = update
            if (connection === 'close') {
                lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut ? startWhatsApp() : console.log('connection logged out...')
            }
        })
	conn.ev.on('creds.update', await saveCreds)


function title() {
      console.clear()
	  console.log(chalk.bold.green(figlet.textSync('Bot Keishu', {
		font: 'Standard',
		horizontalLayout: 'default',
		verticalLayout: 'default',
		width: 80,
		whitespaceBreak: false
	})))
	console.log(chalk.yellow(`\n                      ${chalk.yellow('[ Created By Febb ]')}\n\n${chalk.red('WhatsApp Bot')} : ${chalk.white('Keishu')}\n${chalk.red('Follow Insta Dev')} : ${chalk.white('@febbyadityan')}\n${chalk.red('Message Me On WhatsApp')} : ${chalk.white('+62 857-7026-9605')}\n`))
}

/**
* Uncache if there is file change;
* @param {string} module Module name or path;
* @param {function} cb <optional> ;
*/
function nocache(module, cb = () => { }) {
	// console.log(`Module ${module} sedang diperhatikan terhadap perubahan`) 
	fs.watchFile(require.resolve(module), async () => {
		await uncache(require.resolve(module))
		cb(module)
	})
}
/**
* Uncache a module
* @param {string} module Module name or path;
*/
function uncache(module = '.') {
	return new Promise((resolve, reject) => {
		try {
			delete require.cache[require.resolve(module)]
			resolve()
		} catch (e) {
			reject(e)
		}
	})
}

const status = new Spinner(chalk.cyan(` Booting WhatsApp Bot`))
const starting = new Spinner(chalk.cyan(` Preparing After Connect`))
const reconnect = new Spinner(chalk.redBright(` Reconnecting WhatsApp Bot`))

	title()
	
	/* Auto Update */
	require('./lib/myfunc')
	require('./message/msg')
	nocache('./lib/myfunc', module => console.log(chalk.greenBright('[ WHATSAPP BOT ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
	nocache('./message/msg', module => console.log(chalk.greenBright('[ WHATSAPP BOT ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
	
	conn.multi = true
	conn.nopref = false
	conn.prefa = 'testing'
	conn.ev.on('messages.upsert', async m => {
		if (!m.messages) return;
		var msg = m.messages[0]
		try { if (msg.message.messageContextInfo) delete msg.message.messageContextInfo } catch { }
		msg = serialize(conn, msg)
		msg.isBaileys = msg.key.id.startsWith('BAE5')
		require('./message/msg')(conn, msg, m)
	})

	conn.reply = (from, content, msg) => conn.sendMessage(from, { text: content }, { quoted: msg })
    
	conn.sendMessageFromContent = async(jid, message, options = {}) => {
		var option = { contextInfo: {}, ...options }
		var prepare = await generateWAMessageFromContent(jid, message, option)
		await conn.relayMessage(jid, prepare.message, { messageId: prepare.key.id })
		return prepare
	 }

	return conn
}

startWhatsApp()
.catch(e => console.log(e))
