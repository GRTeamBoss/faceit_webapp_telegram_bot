import { configDotenv } from "dotenv"
import axios from "axios"

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
    this.axiosInstance = axios.create({
      baseURL: "https://api.steampowered.com",
      params: this.params
    })
  }

  async getRequest(req) {
    const resp = await this.axiosInstance.get(req)
    return resp.data
  }
}

class SteamAPIv1 extends Steam {
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
    this.axiosInstance.defaults.params.vanityurl = nickname
    const resp = await this.getRequest(req)
    if (resp.response.success === 42) return -1
    return resp.response.steamid
  }

  async getFriendList(steamid, relationship="all") {
    const req = `/ISteamUser/GetFriendList/v0001/`
    this.axiosInstance.defaults.params.relationship = relationship
    this.axiosInstance.defaults.params.steamid = steamid
    const resp = await this.getRequest(req)
    return resp.friendslist || -1
  }

  async getRecentlyPlayedGames(steamid, count=5) {
    const req = `/IPlayerService/GetRecentlyPlayedGames/v0001/`
    this.axiosInstance.defaults.params.steamid = steamid
    this.axiosInstance.defaults.params.count = count
    const resp = await this.getRequest(req)
    return resp.response || -1
  }

  async getOwnedGames(steamid, include_appinfo=true, include_played_free_games=true, appids_filter=[]) {
    const filter = Array.isArray(appids_filter) && appids_filter.length > 0 ? `&appids_filter=${appids_filter.join(",")}` : ""
    const req = `/IPlayerService/GetOwnedGames/v0001/`
    this.axiosInstance.defaults.params.steamid = steamid
    this.axiosInstance.defaults.params.include_appinfo = include_appinfo
    this.axiosInstance.defaults.params.include_played_free_games = include_played_free_games
    this.axiosInstance.defaults.params.appids_filter = filter
    const resp = await this.getRequest(req)
    return resp.response || -1
  }
}

class SteamAPIv2 extends Steam {
  /**
   * Steam API v2 client for interacting with the Steam Web API.
   */
  constructor() {
    super()
  }

  async getPlayerSummaries(steamids) {
    const ids = Array.isArray(steamids) ? steamids.join(",") : steamids
    const req = `/ISteamUser/GetPlayerSummaries/v0002/`
    this.axiosInstance.defaults.params.steamids = ids
    const resp = await this.getRequest(req)
    return resp.response.players
  }
}

export default {
  SteamAPIv1,
  SteamAPIv2
}
