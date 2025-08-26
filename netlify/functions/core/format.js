class Format {


  constructor(content) {
    this.content = content
  }
}

export class Steam extends Format {
  constructor(content) {
    super(content)
  }

  async friendList() {
    try
    {
      let res = `**Friend List**\n`
      for (const friend of this.content.friends) {
        if (friend.friend_since > 0) {
          res += `**Steam ID64**: ${friend.steamid}\n**Relationship**: ${friend.relationship}\n**Friend since**: ${new Date(friend.friend_since * 1000).toLocaleDateString("en-US")}\n\n`
        }
      }
      return res
    } catch (err)
    {
      return "No friends found or profile is private."
    }
  }

  async playedGames() {
    try
    {
      let res = `**Played Games**\n\n`
      for (const game of this.content.games) {
        res += `**Game**: ${game.name}\n**Hours Played in 2 weeks**: ${game.playtime_2weeks} minutes\n\n`
      }
      return res
    } catch (err)
    {
      return "No played games found or profile is private."
    }
  }

  async ownedGames() {
    try
    {
      let res = `**Owned Games**\n`
      for (const game of this.content.games) {
        res += `**Game**: ${game.name}\n**Hours Played**: ${game.playtime_forever} minutes\n**Hours Played in 2 weeks**: ${game.playtime_2weeks} minutes\n\n`
      }
      return res
    } catch (err)
    {
      return "No owned games found or profile is private."
    }
  }

  async playerSummaries() {
    try
    {
      let res = `**Player Summaries**\n`
      for (const player of this.content.player) {
        res += `**Player**: ${player.personaname}\n**Steam ID64**: ${player.steamid}\n**Profile URL**: ${player.profileurl}\n**Last time was online**: ${new Date(player.lastlogoff * 1000).toLocaleDateString("en-US")}\n\n`
      }
      return res
    } catch (err)
    {
      return "No player summaries found or profile is private."
    }
  }
}

export class Faceit extends Format {
  constructor(content) {
    super(content)
  }

  async csgo() {
    try
    {
      let res = `**CS:GO**\n**region**: ${this.content.region}\n**level**: ${this.content.skill_level}\n**ELO**: ${this.content.faceit_elo}\n**nickname**: ${this.content.game_player_name}\n`
      return res
    } catch (err) 
    {
      return "User not found."
    }
  }

  async cs2() {
    try
    {
      let res = `**CS 2**\n**region**: ${this.content.region}\n**level**: ${this.content.skill_level}\n**ELO**: ${this.content.faceit_elo}\n**nickname**: ${this.content.game_player_name}\n`
      return res
    } catch (err)
    {
      return "User not found."
    }
  }

  async faceitGeneral() {
    try {
      let res = `**General**\n**STEAM ID64**: ${this.content.steam_id_64}\n**STEAM nickname**: ${this.content.steam_nickname}\n**FACEIT**: ${this.content.faceit_url.replace("{lang}", this.content.settings.language)}\n**Joined at**: ${this.content.activated_at}\n`
      return res
    } catch (err) {
      return "User not found.\n"
    }
  }

  async statsFor20matches() {
    try {
      let res = `**Stats for Last 20 Matches**\n`
      const kills = []
      const deaths = []
      const rounds = []
      const duration = []
      for (let match of this.content.items) {
        match = match.stats
        // res += `**Match ID**: ${match.match_id}\n**Map**: ${match.map}\n**Score**: ${match.score}\n**Result**: ${1 === match.result ? "**Win**" : "**Loss**"}\n**Kills**: ${match.kills}\n**Deaths**: ${match.deaths}\n**Assists**: ${match.assists}\n**ADR**: ${match.adr}\n**K/D Ratio**: ${match.kills / match.deaths}\n**K/R Ratio**: ${match.kills / match.rounds}\n**Double Kills**: ${match.double_kills}\n**Triple Kills**: ${match.triple_kills}\n**Quadro Kills**: ${match.quadro_kills}\n**Penta Kills**: ${match.penta_kills}\n**Duration**: ${(match.match_finished_at*1000-match.created_at*1000)/60} minutes\n\n`
        kills.push(match.kills)
        deaths.push(match.deaths)
        rounds.push(match.rounds)
        duration.push((match.match_finished_at*1000-match.created_at*1000)/60)
      }
      res += `**Average Kills**: ${kills.reduce((a, b) => a + b, 0) / kills.length}\n**Average Deaths**: ${deaths.reduce((a, b) => a + b, 0) / deaths.length}\n**Average Rounds**: ${rounds.reduce((a, b) => a + b, 0) / rounds.length}\n**Average Duration**: ${duration.reduce((a, b) => a + b, 0) / duration.length} minutes\n\n`
      return res
    } catch (err) {
      return "No match stats found or profile is private.\n"
    }
  }

  async statsForMatches() {
    try {
      let res = `**Stats for Matches**\n`
      const kills = []
      const deaths = []
      const rounds = []
      const duration = []
      for (let match of this.content.items) {
        match = match.stats
        // res += `**Match ID**: ${match.match_id}\n**Map**: ${match.map}\n**Score**: ${match.score}\n**Result**: ${1 === match.result ? "**Win**" : "**Loss**"}\n**Kills**: ${match.kills}\n**Deaths**: ${match.deaths}\n**Assists**: ${match.assists}\n**ADR**: ${match.adr}\n**K/D Ratio**: ${match.kills / match.deaths}\n**K/R Ratio**: ${match.kills / match.rounds}\n**Double Kills**: ${match.double_kills}\n**Triple Kills**: ${match.triple_kills}\n**Quadro Kills**: ${match.quadro_kills}\n**Penta Kills**: ${match.penta_kills}\n**Duration**: ${(match.match_finished_at*1000-match.created_at*1000)/60} minutes\n\n`
        kills.push(match.kills)
        deaths.push(match.deaths)
        rounds.push(match.rounds)
        duration.push((match.match_finished_at*1000-match.created_at*1000)/60)
      }
      res += `**Average Kills**: ${kills.reduce((a, b) => a + b, 0) / kills.length}\n**Average Deaths**: ${deaths.reduce((a, b) => a + b, 0) / deaths.length}\n**Average Rounds**: ${rounds.reduce((a, b) => a + b, 0) / rounds.length}\n**Average Duration**: ${duration.reduce((a, b) => a + b, 0) / duration.length} minutes\n\n`
      return res
    } catch (err) {
      return "No match stats found or profile is private.\n"
    }
  }

  async rankings() {
    try {
      let res = `**Rankings**\n`
      for (const player of this.content.items) {
        res += `${player.position}. **Player**: ${player.nickname} - ${player.faceit_elo}\n`
      }
      return res
    } catch (err) {
      return "No ranking data found.\n"
    }
  }

  async rankOfPlayer() {
    try {
      let res = `**Rank of Player**\n`
      const player = this.content.items[0]
      res += `${player.position}. **Player**: ${player.nickname} - ${player.faceit_elo}\n`
      return res
    } catch (err) {
      return "No ranking data found.\n"
    }
  }
}


export default {
  Steam,
  Faceit
}