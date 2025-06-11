import { Telegraf, Markup } from "telegraf";

import { Faceit, PlayerAPI, Steam } from "./core/api.js";
import { Format } from "./core/format.js";

const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

const faceitToken = process.env.FACEIT_API_TOKEN

const playerAPI = new PlayerAPI(faceitToken)
const faceitAPI = new Faceit(faceitToken)
const steamAPI = new Steam()
const formatLocal = new Format()

bot.start(async ctx => {
  await ctx.reply(`Give me link to Steam account for send stats.`)
})

bot.help(async ctx => {
  await ctx.reply("Send link to steam account and receive info about faceit account\n[#] Commands:\n/faceit_nickname [nickname]\n/steam_nickname [nickname]")
})

bot.command("faceit_nickname", async ctx => {
  const faceitInfo = await faceitAPI.getPlayerID(ctx.message.text.split(" ")[1])
  const faceitStats = await playerAPI.getPlayer(faceitInfo.payload.platforms.steam.id64)
  const img = faceitStats.avatar
  const cs2form = await formatLocal.cs2(faceitStats.games.cs2)
  const csgoform = await formatLocal.csgo(faceitStats.games.csgo)
  const generalform = await formatLocal.faceitGeneral(faceitStats)
  await ctx.replyWithPhoto({url: img}, {caption: String(generalform + cs2form + csgoform), parse_mode: "HTML"})
})

bot.command("steam_nickname", async ctx => {
  const steamID64 = (await steamAPI.getSteamIDviaNickname(ctx.message.text.split(" ")[1])).id64
  const faceitStats = await playerAPI.getPlayer(steamID64)
  const img = faceitStats.avatar
  const cs2form = await formatLocal.cs2(faceitStats.games.cs2)
  const csgoform = await formatLocal.csgo(faceitStats.games.csgo)
  const generalform = await formatLocal.faceitGeneral(faceitStats)
  await ctx.replyWithPhoto({url: img}, {caption: String(generalform + cs2form + csgoform), parse_mode: "HTML"})
})

bot.hears(/https\:\/\/steamcommunity\.com\/.+/, async ctx => {
  const steamID64 = (await steamAPI.getSteamID(ctx.message.text)).id64
  const faceitStats = await playerAPI.getPlayer(steamID64)
  const img = faceitStats.avatar
  const cs2form = await formatLocal.cs2(faceitStats.games.cs2)
  const csgoform = await formatLocal.csgo(faceitStats.games.csgo)
  const generalform = await formatLocal.faceitGeneral(faceitStats)
  await ctx.replyWithPhoto({url: img}, {caption: String(generalform + cs2form + csgoform), parse_mode: "HTML"})
})



exports.handler = async function(event, context) {
  await bot.handleUpdate(JSON.parse(event.body))
  return {statusCode: 200, body: ""}
}

// bot.launch()

process.once("SIGINT", () => {bot.stop("SIGINT")})
process.once("SIGTERM", () => {bot.stop("SIGTERM")})