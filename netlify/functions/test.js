import { Faceit, PlayerAPI, Steam } from "./core/api.js";
import { Format } from "./core/format.js";

const faceitToken = process.env.FACEIT_API_TOKEN

const playerAPI = new PlayerAPI(faceitToken)
const faceitAPI = new Faceit(faceitToken)
const steamAPI = new Steam()
const formatLocal = new Format()

const steamID64 = (await steamAPI.getSteamIDviaNickname("/steam_nickname grteamboss".split(" ")[1])).id64
console.log(steamID64)
const faceitStats = await playerAPI.getPlayer(steamID64)
console.log(faceitStats)
const img = faceitStats.avatar
const cs2form = await formatLocal.cs2(faceitStats.games.cs2)
const csgoform = await formatLocal.csgo(faceitStats.games.csgo)
const generalform = await formatLocal.faceitGeneral(faceitStats)
console.log(cs2form)
console.log(csgoform)
console.log(generalform)