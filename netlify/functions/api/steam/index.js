import { configDotenv } from "dotenv"

class Steam {
  /**
   * Steam API client for interacting with the Steam Web API.
   */

  constructor() {
    configDotenv()
    this.apiKey = process.env.STEAM_API_TOKEN
    this.params = {
      key: this.apiKey,
    }
    this.fetchInstance = async (path, params = {}) => {
      const paramsQuery = new URLSearchParams({...this.params, ...params}).toString()
      const res = await fetch(`https://api.steampowered.com${path}?${paramsQuery}`)
      return res.json()
    }
  }

  async getRequest(req, params = {}) {
    const resp = await this.fetchInstance(req, params)
    return resp
  }
}

export class SteamAPIv1 extends Steam {
  /**
   * Steam API v1 client for interacting with the Steam Web API.
   */
  constructor() {
    super()
  }

  async getPlayerSteamID64(nickname) {
    /**
     * Get the SteamID64 of a player by their vanity URL (nickname).
     * @param {string} nickname - The vanity URL (nickname) of the player.
     * @returns {Promise<string|number>} - The SteamID64 of the player or -1 if not found.
     */

    const req = `/ISteamUser/ResolveVanityURL/v0001/`
    const resp = await this.getRequest(req, {vanityurl: nickname})
    if (resp.response.success === 42) return -1
    return resp.response.steamid
  }

  async getFriendList(steamid, relationship="all") {
    const req = `/ISteamUser/GetFriendList/v0001/`
    const resp = await this.getRequest(req, {relationship: relationship, steamid: steamid})
    return resp.friendslist || -1
  }

  async getRecentlyPlayedGames(steamid, count=5) {
    const req = `/IPlayerService/GetRecentlyPlayedGames/v0001/`
    const resp = await this.getRequest(req, {steamid: steamid, count: count})
    return resp.response || -1
  }

  async getOwnedGames(steamid, include_appinfo=true, include_played_free_games=true, appids_filter=[]) {
    const filter = Array.isArray(appids_filter) && appids_filter.length > 0 ? `&appids_filter=${appids_filter.join(",")}` : ""
    const req = `/IPlayerService/GetOwnedGames/v0001/`
    const resp = await this.getRequest(req, {steamid: steamid, include_appinfo: include_appinfo, include_played_free_games: include_played_free_games, appids_filter: filter})
    return resp.response || -1
  }
}

export class SteamAPIv2 extends Steam {
  /**
   * Steam API v2 client for interacting with the Steam Web API.
   */
  constructor() {
    super()
  }

  async getPlayerSummaries(steamids) {
    const ids = Array.isArray(steamids) ? steamids.join(",") : steamids
    const req = `/ISteamUser/GetPlayerSummaries/v0002/`
    const resp = await this.getRequest(req, {steamids: ids})
    return resp.response.players
  }
}

export default {
  SteamAPIv1,
  SteamAPIv2
}
