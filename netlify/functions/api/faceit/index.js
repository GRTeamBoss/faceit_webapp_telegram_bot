import { configDotenv } from "dotenv";
const axios = require("axios")

class Faceit {
  constructor() {
    configDotenv()
    this.apiKey = process.env.FACEIT_API_KEY
    this.axiosInstance = axios.create({
      baseURL: "https://open.faceit.com/data/v4",
      headers: {
        "Authorization": `Bearer ${this.apiKey}`
      }
    })
  }

  async getRequest(endpoint) {
      const response = await this.axiosInstance.get(endpoint)
      return response.data || -1
  }
}

class PlayersAPI extends Faceit {

  constructor() {
    super()
  }

  async getPlayerviaNickname(nickname) {
    this.axiosInstance.defaults.params.nickname = nickname
    this.axiosInstance.defaults.params.game = "cs2"
    return await this.getRequest(`/players`)
  }

  async getPlayerviaSteamID(steamID64) {
    this.axiosInstance.defaults.params.game_player_id = steamID64
    this.axiosInstance.defaults.params.game = "cs2"
    return await this.getRequest(`/players`)
  }

  async getPlayerviaPlayerID(playerID) {
    return await this.getRequest(`/players/${playerID}`)
  }

  async getPlayerStatisticsFor20matches(data) {
    return await this.getRequest(`/players/${data.player_id}/games/cs2/stats`)
  }

  async getPlayerStatistics(data) {
    this.axiosInstance.defaults.params.game = "cs2"
    this.axiosInstance.defaults.params.limit = "100"
    return await this.getRequest(`/players/${data.player_id}/history`)
  }
}

class RankingsAPI extends Faceit {

  constructor() {
    super()
  }

  async getRankings(game, region) {
    return await this.getRequest(`/rankings/games/${game}/regions/${region}`)
  }

  async getRankOfPlayer(game, region, playerId) {
    return await this.getRequest(`/rankings/games/${game}/regions/${region}/players/${playerId}`)
  }
}


export default {
  PlayersAPI,
  RankingsAPI
}