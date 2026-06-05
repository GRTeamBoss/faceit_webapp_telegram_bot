import { configDotenv } from "dotenv";
import { Request } from "./../../core/request"

class Faceit {
  constructor() {
    configDotenv()
    this.apiKey = process.env.FACEIT_API_TOKEN
    this.path = "https://open.faceit.com/data/v4"
    this.header = {"Authorization": `Bearer ${this.apiKey}`} 
  }

  async getRequest(endpoint, params = {}) {
    const request = new Request()
    const response = await request.get(this.path, endpoint, params, this.header)
    return response
  }
}

export class PlayersAPI extends Faceit {

  constructor() {
    super()
  }

  async getPlayerviaNickname(nickname) {
    return await this.getRequest(`/players`, {nickname: nickname, game: "cs2"})
  }

  async getPlayerviaSteamID(steamID64) {
    return await this.getRequest(`/players`, {game_player_id: steamID64, game: "cs2"})
  }

  async getPlayerviaPlayerID(playerID) {
    return await this.getRequest(`/players/${playerID}`)
  }

  async getPlayerStatisticsFor20matches(data) {
    return await this.getRequest(`/players/${data.player_id}/games/cs2/stats`)
  }

  async getPlayerStatistics(data) {
    return await this.getRequest(`/players/${data.player_id}/history`, {game: "cs2", limit: "100"})
  }
}

export class RankingsAPI extends Faceit {

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