import { configDotenv } from "dotenv";

class Faceit {
  constructor() {
    configDotenv()
    this.apiKey = process.env.FACEIT_API_KEY
    this.fetchInstance = async (path, params = {}) => {
      const res = await fetch(`https://open.faceit.com/data/v4${path}`, {
        headers: {
          "Authorization": `Bearer ${this.apiKey}`
        },
        params: {...params}
      })
      return res.json()
    }
  }

  async getRequest(endpoint, params = {}) {
      const response = await this.fetchInstance(endpoint, { ...params })
      return response.data || -1
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