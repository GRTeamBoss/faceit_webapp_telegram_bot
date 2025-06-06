/**
 * Initialize Faceit API
 * @class Faceit
 */

export class Faceit {

  /**
   * Create API session
   * @param {string} token
   */

  HOST_DATA = "https://open.faceit.com"
  BASE_DATA = "/data/v4"
  HOST_API = "https://www.faceit.com"
  BASE_API = "/api/users/v1/nicknames"


  constructor(token) {
    this.header = {
      Authorization: `Bearer ${token}`
    }
    this.uriData = this.HOST_DATA + this.BASE_DATA
    this.uriApi = this.HOST_API + this.BASE_API
  }

  async getRequest(req) {
    const resp = await fetch(req, {headers: this.header}).then(resp => {return resp.json()})
    return resp
  }

  async getPlayerID(nickname) {
    const req = this.uriApi + "/" + nickname
    const resp = await fetch(req).then(resp => {return resp.json()})
    return resp
  }


}

export class DataAPI extends Faceit {

  /**
   * 
   * @param {string} token 
   */

  constructor(token) {
    super(token)
  }
}

/**
 * Child class DataAPI
 * @class
 */
export class PlayerAPI extends DataAPI {

  /**
   * 
   * @param {string} token 
   */


  constructor(token) {
    super(token)
  }

  async getPlayers(nickname = null, game = null, game_player_id = null) {
    if (nickname === null && game === null && game_player_id === null) {
      let uriRequest = this.uriData + "/players"
      const resp =  await this.getRequest(uriRequest)
      return resp
    } else { return null }
  }

  async getPlayer(playerId) {
    let uriRequest = this.uriData + "/players?game_player_id=" + playerId + "&game=cs2"
    const resp = await this.getRequest(uriRequest)
    return resp
  }
}


class ChatAPI extends Faceit {


  constructor() {
    super()
  }
}


export class Steam {


  constructor() {}

  async getRequest(req) {
    const resp = await fetch(req).then(response => {return response.text()})
    return resp
  }

  async getSteamIDviaNickname(nickname) {
    const api = "https://steamcommunity.com/id/" + nickname
    const resp = await this.getSteamID(api)
    return resp
  }

  async getSteamID(uri) {
    const resp = await this.getRequest(uri)
    const id64 = resp.split("\"steamid\":\"")[1].split("\"")[0]
    return {id64: id64}
  }
}