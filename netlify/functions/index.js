import { Telegraf, Markup } from "telegraf";
import { configDotenv } from "dotenv";

import { Steam, Faceit } from "./core/format.js";
import {SteamAPIv1, SteamAPIv2} from "./api/steam/index.js";
import {PlayersAPI, RankingsAPI} from "./api/faceit/index.js";

configDotenv();

const bot = new Telegraf(process.env.TELEGRAM_TOKEN, { parse_mode: "Markdown" });
const steamAPI = {
  v1: new SteamAPIv1(),
  v2: new SteamAPIv2()
}
const faceitAPI = {
  players: new PlayersAPI(),
  rankings: new RankingsAPI()
}

const formatLocal = (content) => {
  const steam = new Steam(content)
  const faceit = new Faceit(content)
  return {
    friendList: () => steam.friendList(),
    playedGames: () => steam.playedGames(),
    ownedGames: () => steam.ownedGames(),
    playerSummaries: () => steam.playerSummaries(),
    csgo: () => faceit.csgo(),
    cs2: () => faceit.cs2(),
    faceitGeneral: () => faceit.faceitGeneral(),
    statsFor20Matches: () => faceit.statsFor20Matches(),
    statsForMatches: () => faceit.statsForMatches(),
    rankings: () => faceit.rankings(),
    rankOfPlayer: () => faceit.rankOfPlayer()
  }
}

bot.start(async ctx => {
  await ctx.reply(`Give me link to Steam account for send stats.\nSend link to steam account and receive info about faceit account\n[#] Commands:\n/faceit_nickname [nickname] (without space) ex: /faceit_nickname deko-_-\n/steam_nickname [nickname] (without space) ex: /steam_nickname grteamboss`)
})

bot.help(async ctx => {
  await ctx.reply("Commands:\n/donate\n/help\n/about\n/faceit_nickname [nickname] (without space) ex: /faceit_nickname deko-_-\n/faceit_id [id] (without space) ex: /faceit_id 12345678-1234-1234-1234-123456789012\n/faceit_recent_matches [nickname] (without space) ex: /faceit_recent_matches deko-_-\n/faceit_history [nickname] (without space) ex: /faceit_history deko-_-\n/faceit_ranking [game] [region] ex: /faceit_ranking cs2 EU\n/faceit_player_rank [game] [region] [playerId or profile link] ex: /faceit_player_rank cs2 EU deko-_- or /faceit_player_rank cs2 EU 12345678-1234-1234-1234-123456789012 or /faceit_player_rank cs2 EU https://www.faceit.com/en/players/deko-_-\n\n/steam_player_info [nickname or profile link or steamID64] (without space) ex: /steam_player_info grteamboss or /steam_player_info https://steamcommunity.com/id/grteamboss or /steam_player_info 76561198034392384\n/steam_played_games [nickname or profile link or steamID64] (without space) ex: /steam_played_games grteamboss or /steam_played_games https://steamcommunity.com/id/grteamboss or /steam_played_games 76561198034392384\n/steam_friend_list [nickname or profile link or steamID64] (without space) ex: /steam_friend_list grteamboss or /steam_friend_list https://steamcommunity.com/id/grteamboss or /steam_friend_list 76561198034392384\n/steam_owned_games [nickname or profile link or steamID64] (without space) ex: /steam_owned_games grteamboss or /steam_owned_games https://steamcommunity.com/id/grteamboss or /steam_owned_games 76561198034392384\n\nOr just send me link to Steam account and receive info about faceit account")
})

bot.command("donate", async ctx => {
  await ctx.reply("If you want to support the development of this bot, you can donate via [DonationAlerts](https://www.donationalerts.com/grteamboss).\nThank you!")
})

bot.command("about", async ctx => {
  await ctx.reply("This bot was created by grteamboss\(dev account\).\nYou can find the source code on [GitHub](https://github.com/grteamboss/faceit_webapp_telegram_bot).")
})

// Steam

bot.command("steam_player_info", async ctx => {
  if (ctx.message.text.split(" ").slice(1).length > 1) {
    await ctx.reply(`/steam_player_info ${ctx.message.text.split(" ").slice(1).join("")} - without space!`)
  } else {
    const steamID64 = (await steamAPI.v1.getPlayerSteamID64(ctx.message.text.split(" ")[1]))
    if (steamID64 === -1) {
      await ctx.reply(`${ctx.message.text.split(" ")[1]} steam nickname not found!\n Trying to find if this SteamID64.`)
    } else {
      const data = await steamAPI.v2.getPlayerSummaries(steamID64)
      if (data === -1) {
        await ctx.reply(`${ctx.message.text.split(" ")[1]} steam profile not found on Steam!`)
      } else {
        const playerInfo = await formatLocal(data).playerInfo()
        await ctx.reply(String(playerInfo))
      }
    }
  }
})

bot.command("steam_played_games", async ctx => {
  if (ctx.message.text.split(" ").slice(1).length > 1) {
    await ctx.reply(`/steam_played_games ${ctx.message.text.split(" ").slice(1).join("")} - without space!`)
  } else {
    const steamID64 = (await steamAPI.v1.getPlayerSteamID64(ctx.message.text.split(" ")[1]))
    if (steamID64 === -1) {
      await ctx.reply(`${ctx.message.text.split(" ")[1]} steam nickname not found!\n Trying to find if this SteamID64.`)
    } else {
      const data = await steamAPI.v1.getRecentlyPlayedGames(steamID64)
      if (data === -1) {
        await ctx.reply(`${ctx.message.text.split(" ")[1]} steam profile not found on Steam!`)
      } else {
        const playedGames = await formatLocal(data).playedGames()
        await ctx.reply(String(playedGames))
      }
    }
  }
})

bot.command("steam_friend_list", async ctx => {
  if (ctx.message.text.split(" ").slice(1).length > 1) {
    await ctx.reply(`/steam_friend_list ${ctx.message.text.split(" ").slice(1).join("")} - without space!`)
  } else {
    const steamID64 = (await steamAPI.v1.getPlayerSteamID64(ctx.message.text.split(" ")[1]))
    if (steamID64 === -1) {
      await ctx.reply(`${ctx.message.text.split(" ")[1]} steam nickname not found!\n Trying to find if this SteamID64.`)
    } else {
      const data = await steamAPI.v1.getFriendList(steamID64)
      if (data === -1) {
        await ctx.reply(`${ctx.message.text.split(" ")[1]} steam profile not found on Steam!`)
      } else {
        const friendsList = await formatLocal(data).friendList()
        await ctx.reply(String(friendsList))
      }
    }
  }
})

bot.command("steam_owned_games", async ctx => {
  if (ctx.message.text.split(" ").slice(1).length > 1) {
    await ctx.reply(`/steam_owned_games ${ctx.message.text.split(" ").slice(1).join("")} - without space!`)
  } else {
    const steamID64 = (await steamAPI.v1.getPlayerSteamID64(ctx.message.text.split(" ")[1]))
    if (steamID64 === -1) {
      await ctx.reply(`${ctx.message.text.split(" ")[1]} steam nickname not found!\n Trying to find if this SteamID64.`)
    } else {
      const data = await steamAPI.v1.getOwnedGames(steamID64)
      if (data === -1) {
        await ctx.reply(`${ctx.message.text.split(" ")[1]} steam profile not found on Steam!`)
      } else {
        const gamesList = await formatLocal(data).ownedGames()
        await ctx.reply(String(gamesList))
      }
    }
  }
})

// Faceit

bot.command("faceit_nickname", async ctx => {
  if (ctx.message.text.split(" ").slice(1).length > 1) {
    await ctx.reply(`/faceit_nickname ${ctx.message.text.split(" ").slice(1).join("")} - without space!`)
  } else {
    if (ctx.message.text.split(" ").length === 1) {
      await ctx.reply(`Faceit nickname must be not empty.`)
    } else {
      const data = await faceitAPI.players.getPlayerviaNickname(ctx.message.text.split(" ")[1])
      if (data === -1) {
        await ctx.reply(`${ctx.message.text.split(" ")[1]} faceit nickname not found!`)
      } else {
        const cs2 = await formatLocal(data.games.cs2).cs2()
        const csgo = await formatLocal(data.games.csgo).csgo()
        const faceitGeneral = await formatLocal(data).faceitGeneral()
        await ctx.replyWithPhoto({url: data.avatar}, {caption: String(faceitGeneral + cs2 + csgo)})
      }
    }
  }
})

bot.command("faceit_id", async ctx => {
  if (ctx.message.text.split(" ").slice(1).length > 1) {
    await ctx.reply(`/faceit_id ${ctx.message.text.split(" ").slice(1).join("")} - without space!`)
  } else {
    const data = await faceitAPI.players.getPlayerviaID(ctx.message.text.split(" ")[1])
    if (data === -1) {
      await ctx.reply(`${ctx.message.text.split(" ")[1]} faceit ID not found!`)
    } else {
      const cs2 = await formatLocal(data.games.cs2).cs2()
      const csgo = await formatLocal(data.games.csgo).csgo()
      const faceitGeneral = await formatLocal(data).faceitGeneral()
      await ctx.replyWithPhoto({url: data.avatar}, {caption: String(faceitGeneral + cs2 + csgo)})
    }
  }
})

bot.command("faceit_recent_matches", async ctx => {
  if (ctx.message.text.split(" ").slice(1).length > 1) {
    await ctx.reply(`/faceit_recent_matches ${ctx.message.text.split(" ").slice(1).join("")} - without space!`)
  } else {
    const data = await faceitAPI.players.getPlayerviaNickname(ctx.message.text.split(" ")[1])
    if (data === -1) {
      await ctx.reply(`${ctx.message.text.split(" ")[1]} faceit nickname not found!`)
    } else {
      const data = await faceitAPI.players.getPlayerviaID(data.faceit_id)
      if (data === -1) {
        await ctx.reply(`${ctx.message.text.split(" ")[1]} faceit ID not found!`)
      } else {
        const recentMatches = await faceitAPI.players.getPlayerStatisticsFor20matches(data)
        const stats = await formatLocal(recentMatches).statsFor20Matches()
        await ctx.reply(String(stats))
      }
    }
  }
})

bot.command("faceit_history", async ctx => {
  if (ctx.message.text.split(" ").slice(1).length > 1) {
    await ctx.reply(`/faceit_history ${ctx.message.text.split(" ").slice(1).join("")} - without space!`)
  } else {
    const data = await faceitAPI.players.getPlayerviaNickname(ctx.message.text.split(" ")[1])
    if (data === -1) {
      await ctx.reply(`${ctx.message.text.split(" ")[1]} faceit nickname not found!`)
    } else {
      const data = await faceitAPI.players.getPlayerviaID(data.faceit_id)
      if (data === -1) {
        await ctx.reply(`${ctx.message.text.split(" ")[1]} faceit ID not found!`)
      } else {
        const history = await faceitAPI.players.getPlayerMatchHistory(data)
        const stats = await formatLocal(history).statsForMatches()
        await ctx.reply(String(stats))
      }
    }
  }
})

bot.command("faceit_ranking", async ctx => {
  const {game, region} = ctx.message.text.split(" ").slice(1,3)
  const data = await faceitAPI.rankings.getRankings(game, region)
  if (data === -1) {
    await ctx.reply(`${game} ${region} rankings not found!`)
  } else {
    const result = await formatLocal(data).rankings()
    await ctx.reply(String(result))
  }
})

bot.command("faceit_player_rank", async ctx => {
  let {game, region, playerId} = ctx.message.text.split(" ").slice(1,4)
  if (playerId.contains("https://steamcommunity.com/")) {
    playerId = playerId.split("/").slice(-1)
    let data = await faceitAPI.players.getPlayerviaID(playerId)
    if (data === -1) {
      await ctx.reply(`${playerId} steam ID not found!`)
    } else {
      const dataRank = await faceitAPI.rankings.getRankOfPlayer(game, region, data.player_id)
      const result = await formatLocal(dataRank).rankOfPlayer()
      await ctx.reply(String(result))
    }
  } else if (playerId.contains("https://www.faceit.com/")) {
    playerId = playerId.split("/").slice(-1)
    let data = await faceitAPI.players.getPlayerviaNickname(playerId)
    if (data === -1) {
      await ctx.reply(`${playerId} faceit nickname not found!`)
    } else {
      const dataRank = await faceitAPI.rankings.getRankOfPlayer(game, region, data.player_id)
      const result = await formatLocal(dataRank).rankOfPlayer()
      await ctx.reply(String(result))
    }
  } else {
    let data = await faceitAPI.players.getPlayerviaID(playerId)
    if (data === -1) {
      await ctx.reply(`${playerId} faceit ID not found!`)
    } else {
      data = await faceitAPI.players.getPlayerviaNickname(playerId)
      const dataRank = await faceitAPI.rankings.getPlayerRank(game, region, data.player_id)
      const result = await formatLocal(dataRank).rankOfPlayer()
      await ctx.reply(String(result))
    }
  }
})

// General

bot.hears(/https\:\/\/steamcommunity\.com\/.+/, async ctx => {
  const steamID64 = await steamAPI.v1.getPlayerSteamID64(ctx.message.text.split("https://steamcommunity.com/")[1].replace(/\/(.*)/, ""))
  if (steamID64 === -1) {
    await ctx.reply(`${ctx.message.text.split(" ")[1]} steam nickname not found! Trying to find if this SteamID64.`)
  } else {
    const faceitStats = await faceitAPI.players.getPlayerviaID(steamID64)
    if (faceitStats === -1) {
      await ctx.reply(`${ctx.message.text.split(" ")[1]} steam ID not found on Faceit!`)
    } else {
      const img = faceitStats.avatar
      const cs2form = await formatLocal.cs2(faceitStats.games.cs2) || "CS2 history doesn't exist."
      const csgoform = await formatLocal.csgo(faceitStats.games.csgo) || "CS:GO history doesn't exist."
      const generalform = await formatLocal.faceitGeneral(faceitStats)
      await ctx.replyWithPhoto({url: img}, {caption: String(generalform + cs2form + csgoform)})
    }
  }
})



exports.handler = async function(event, context) {
  await bot.handleUpdate(JSON.parse(event.body))
  return {statusCode: 200, body: "OK"}
}

// bot.launch()

process.once("SIGINT", () => {bot.stop("SIGINT")})
process.once("SIGTERM", () => {bot.stop("SIGTERM")})