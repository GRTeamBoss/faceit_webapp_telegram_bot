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
  await ctx.reply(`Give me link to Steam account for send stats.\nSend link to steam account and receive info about faceit account\n[#] Commands:\n/faceit_nickname [nickname] (without space) ex: /faceit_nickname deko-_-\n/steam_nickname [nickname] (without space) ex: /steam_nickname grteamboss`)
})

bot.help(async ctx => {
  await ctx.reply("Send link to steam account and receive info about faceit account\n[#] Commands:\n/faceit_nickname [nickname] (without space) ex: /faceit_nickname deko-_-\n/steam_nickname [nickname] (without space) ex: /steam_nickname grteamboss")
})

bot.command("faceit_nickname", async ctx => {
  if (ctx.message.text.split(" ").slice(1).length > 1) {
    await ctx.reply(`/faceit_nickname ${ctx.message.text.split(" ").slice(1).join("")} - without space!`)
  } else {
    const faceitInfo = await faceitAPI.getPlayerID(ctx.message.text.split(" ")[1])
    if (faceitInfo === false) {
      await ctx.reply(`${ctx.message.text.split(" ")[1]} faceit nickname not found!`)
    } else {
      const faceitStats = await playerAPI.getPlayer(faceitInfo.payload.platforms.steam.id64)
      const img = faceitStats.avatar
      const cs2form = await formatLocal.cs2(faceitStats.games.cs2)
      const csgoform = await formatLocal.csgo(faceitStats.games.csgo)
      const generalform = await formatLocal.faceitGeneral(faceitStats)
      await ctx.replyWithPhoto({url: img}, {caption: String(generalform + cs2form + csgoform), parse_mode: "HTML"})
    }
  }
})

bot.command("steam_nickname", async ctx => {
  if (ctx.message.text.split(" ").slice(1).length > 1) {
    await ctx.reply(`/steam_nickname ${ctx.message.text.split(" ").slice(1).join("")} - without space!`)
  } else {
    const steamID64 = (await steamAPI.getSteamIDviaNickname(ctx.message.text.split(" ")[1])).id64
    if (steamID64 === undefined) {
      await ctx.reply(`${ctx.message.text.split(" ")[1]} steam nickname not found!`)
    } else {
      const faceitStats = await playerAPI.getPlayer(steamID64)
      if (faceitStats === false) {
        await ctx.reply(`${ctx.message.text.split(" ")[1]} steam nickname not found on Faceit!`)
      } else {
        const img = faceitStats.avatar
        const cs2form = await formatLocal.cs2(faceitStats.games.cs2)
        const csgoform = await formatLocal.csgo(faceitStats.games.csgo)
        const generalform = await formatLocal.faceitGeneral(faceitStats)
        await ctx.replyWithPhoto({url: img}, {caption: String(generalform + cs2form + csgoform), parse_mode: "HTML"})
      }
    }
  }
})

bot.hears(/https\:\/\/steamcommunity\.com\/.+/, async ctx => {
  const steamID64 = (await steamAPI.getSteamID(ctx.message.text)).id64
  if (steamID64 === undefined) {
    await ctx.reply(`${ctx.message.text.split(" ")[1]} steam nickname not found!`)
  } else {
    const faceitStats = await playerAPI.getPlayer(steamID64)
    if (faceitStats === false) {
      await ctx.reply(`${ctx.message.text.split(" ")[1]} steam ID not found on Faceit!`)
    } else {
      const img = faceitStats.avatar
      const cs2form = await formatLocal.cs2(faceitStats.games.cs2)
      const csgoform = await formatLocal.csgo(faceitStats.games.csgo)
      const generalform = await formatLocal.faceitGeneral(faceitStats)
      await ctx.replyWithPhoto({url: img}, {caption: String(generalform + cs2form + csgoform), parse_mode: "HTML"})
    }
  }
})



exports.handler = async function(event, context) {
  await bot.handleUpdate(JSON.parse(event.body))
  return {statusCode: 200, body: ""}
}

// bot.launch()

process.once("SIGINT", () => {bot.stop("SIGINT")})
process.once("SIGTERM", () => {bot.stop("SIGTERM")})