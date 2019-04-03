const fetch = require('node-fetch');
const Discord = require(`discord.js`);
const Jimp = require(`jimp`);
const mysql = require('mysql');
const client = new Discord.Client();
const config = require('./config.json');
var cooldowns = {};
var con = mysql.createConnection({
	host: config.db_host,
	user: config.db_user,
	password: config.db_pass,
	database: config.db
});
var guilds_settings = {};

setInterval(() => {
	for (var i = 0; i < Object.keys(cooldowns).length; i++) {
		cooldowns[Object.keys(cooldowns)[i]] -= 1;
		if (cooldowns[Object.keys(cooldowns)[i]] == 0) {
			delete cooldowns[Object.keys(cooldowns)[i]];
		}
	}
}, 1000);

con.connect(function (err) {
	if (err) return console.log(err);
	console.log('MYSQL is READY!');
	client.on('ready', () => {
		console.log('CLIENT is READY!');
		setInterval(() => {
			var rnd = Math.floor(Math.random() * 2);
			switch (rnd) {
				case 1:
					{
						client.user.setActivity('+setchannel', {
							type: 'WATCHING'
						});
					}
					break
				default:
					{
						client.user.setActivity('Reset work channel, new DB.', {
							type: 'WATCHING'
						});
					}
			}
		}, 5000)
	});
	setInterval(() => {
		con.query(`SELECT 1`);
	}, 20000);
	con.query('SELECT * FROM `guilds`', (err, data) => {
		if (err) throw err;
		data.map((e) => {
			guilds_settings[e.guild_id] = e.workchannel;
		});
	});

	client.on('guildCreate', (guild) => {
		guild.channels.find((ch) => ch.position == 0 || ch.type == 'text').send({
			embed: {
				title: `Hi guys :D`,
				description: 'To set work channnel: **+setchannel #chat_name**\n' +
					'example: +setchannel ' +
					guild.channels.find((ch) => ch.position == 0 || ch.type == 'text') +
					'\nIf you wonna add me to another server: [Click here](https://discordapp.com/oauth2/authorize?client_id=559247918280867848&scope=bot&permissions=52288)',
				footer: {
					icon_url: client.user.displayAvatarURL,
					text: `Ony admins can use that command!`
				}
			}
		});
	});

	client.on('message', (msg) => {
		if (msg.author.bot) return;
		if (msg.content.toLowerCase().startsWith('+setchannel')) {
			if (msg.member.hasPermission('KICK_MEMBERS') || msg.author.id == '449924162920906753') {
				if (cooldowns[msg.guild.id])
					return msg.channel.send(
						`This command is on cooldown on this server. Please wait **${cooldowns[msg.guild.id]} sec.**`
					);
				cooldowns[msg.guild.id] = 20;
				console.log(cooldowns);
				var chn = msg.content.split(' ')[1];
				if (!chn)
					return msg.channel.send({
						embed: {
							color: 0xff0000,
							description: `:interrobang: Syntax: **+setchannel ${msg.guild.channels.find(
								(ch) => ch.position == 1 || ch.type == 'text'
							)}**`
						}
					});
				chn = chn.replace(/</gi, '').replace(/>/gi, '').replace(/#/gi, '');
				if (!chn || chn.length !== 18 || msg.guild.channels.find((ch) => ch.id == chn) == null)
					return msg.channel.send({
						embed: {
							color: 0xff0000,
							description: `:interrobang: Syntax: **+setchannel ${msg.guild.channels.find(
								(ch) => ch.position == 1 || ch.type == 'text'
							)}**`
						}
					});
				if (guilds_settings[msg.guild.id]) {
					con.query("UPDATE `guilds` SET workchannel = '" + chn + "' WHERE guild_id='" + msg.guild.id + "'", (err) => {
						if (err) return console.log(err)
						guilds_settings[msg.guild.id] = chn;
					});
				} else {
					con.query("INSERT INTO `guilds` VALUES ('" + msg.guild.id + "','" + chn + "')", (err) => {
						if (err) return msg.react('⁉');
						guilds_settings[msg.guild.id] = chn;
					});
				}
				msg.react('👌');
				msg.guild.channels
					.find((ch) => ch.id == chn)
					.send(
						'__**<:animePodsos:559025418221518850>ANIME-HUNTER IS HERE, GIMME UR ANIME SCREENSHOTS<:animePodsos:559025418221518850>**__ '
					);
			} else {
				msg.channel.send(`You don't have enough permissions.`);
			}
		}
		if (msg.channel.id !== guilds_settings[msg.guild.id]) return;
		const img_formats = ['png', 'jpeg', 'jpg'];
		var attch = msg.attachments.first();
		if (
			msg.content.indexOf('.') > -1 &&
			msg.content.startsWith('http') &&
			img_formats.indexOf(msg.content.split('.')[msg.content.split('.').length - 1]) > -1
		) {
			attch = msg.content;
		}
		if (attch) {
			var url = attch.url ? attch.url : attch;
			var urlToArr = url.toLowerCase().split('.');
			if (img_formats.indexOf(urlToArr[urlToArr.length - 1]) == -1) return;
			Jimp.read(url, function (err, img) {
				if (err) return;
				img.resize(720, 480).getBase64(Jimp.AUTO, function (e, img64) {
					console.log('resize')
					if (e) return;
					fetch(`https://trace.moe/api/search?token=${config.trace_moe_token}`, {
							method: 'POST',
							body: JSON.stringify({
								image: img64
							}),
							headers: {
								'Content-Type': 'application/json'
							}
						})
						.then((res) => {
							return res.json();
						})
						.then((result) => {
							if (result.limit == 0)
								return msg.channel.send(
									`Ugh.. i'm overwhelmed with requests, please wait for **${result.limit_ttl}** sec.`
								);
							var unique = function (arr) {
								let newarr = [];
								arr.map((e) => {
									if (newarr.indexOf(e) == -1) newarr = [...newarr, e];
								});
								return newarr;
							};
							if (!result.docs) return;
							for (i in result.docs) {
								var e = result.docs[i];
								if (e.similarity > 0.98) {
									var video_url = `https://media.trace.moe/video/${e.anilist_id}/${encodeURIComponent(e.filename)}?t=${e.at}&token=${e.tokenthumb}`.replace(/[)]/g, '%29')

									return msg.channel.send({
										embed: {
											title: e.title_romaji,
											color: 7589871,
											footer: {
												icon_url: msg.author.displayAvatarURL,
												text: `requested by ${msg.author.username}, author: wnm#1663`
											},
											thumbnail: {
												url: `https://trace.moe/thumbnail.php?anilist_id=${e.anilist_id}&file=${encodeURIComponent(e.filename)}&t=${e.at}&token=${e.tokenthumb}`
											},
											description: `Anime: **${e.title_romaji}**\n` +
												`Episode: **${e.episode}**\n` +
												`Timestamp: **${~~(e.at / 60)}:${~~(e.at % 60)}**\n` +
												`MyAnimeList: [Click!](https://myanimelist.net/anime/${e.mal_id})\n` +
												`Video: [Click!](${video_url})\n` +
												`NSFW: ${e.is_adult? '**Yes! Yes! Yes!**' : '**No 😫**'}`
										}
									});
								}
							}
							var rawdesc = result.docs.map((e, i) => {
								return `[${e.title_romaji}](https://myanimelist.net/anime/${e.mal_id})`;
							});
							rawdesc = unique(rawdesc);

							msg.channel.send({
								embed: {
									title: `There's some results:`,
									description: rawdesc.join(`\n`),
									color: 7589871,
									thumbnail: {
										url: url
									},
									footer: {
										icon_url: msg.author.displayAvatarURL,
										text: `requested by ${msg.author.username}, author: wnm#1663`
									}
								}
							});
						});
				});
			});
		}
	});
});
client.login(config.bot_token);