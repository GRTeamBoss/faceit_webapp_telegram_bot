class Format {


  constructor(content) {
    this.content = content
  }
}

class Steam extends Format {
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
      for (const game of this.content.playedGames) {
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
      for (const player of this.content.player_summaries) {
        res += `**Player**: ${player.personaname}\n**Steam ID64**: ${player.steamid}\n**Profile URL**: ${player.profileurl}\n**Last time was online**: ${new Date(player.lastlogoff * 1000).toLocaleDateString("en-US")}\n\n`
      }
      return res
    } catch (err)
    {
      return "No player summaries found or profile is private."
    }
  }
}

class Faceit extends Format {
  constructor(content) {
    super(content)
  }

  async csgo() {
    try
    {
      const res = `**CS:GO**\n**region**: ${this.content.region}\n**level**: ${this.content.skill_level}\n**ELO**: ${this.content.faceit_elo}\n**nickname**: ${this.content.game_player_name}\n`
      return res
    } catch (err) 
    {
      return "User not found."
    }
  }

  async cs2() {
    try
    {
      const res = `**CS 2**\n**region**: ${this.content.region}\n**level**: ${this.content.skill_level}\n**ELO**: ${this.content.faceit_elo}\n**nickname**: ${this.content.game_player_name}\n`
      return res
    } catch (err)
    {
      return "User not found."
    }
  }

  async faceitGeneral() {
    try {
      const res = `**General**\n**STEAM ID64**: ${this.content.steam_id_64}\n**STEAM nickname**: ${this.content.steam_nickname}\n**FACEIT**: ${this.content.faceit_url.replace("{lang}", this.content.settings.language)}\n**Joined at**: ${this.content.activated_at}\n`
      return res
    } catch (err) {
      return "User not found."
    }
  }

  async statsFor20matches() {
    try {
      const res = `**Stats for Last 20 Matches**\n`
      const kills = []
      const deaths = []
      const rounds = []
      const duration = []
      for (const match of this.content.items) {
        match = match.stats
        res += `**Match ID**: ${match["Match Id"]}\n**Map**: ${match.Map}\n**Score**: ${match.Score}\n**Result**: ${1 === match.Result ? "**Win**" : "**Loss**"}\n**Kills**: ${match.Kills}\n**Deaths**: ${match.Deaths}\n**Assists**: ${match.Assists}\n**ADR**: ${match.ADR}\n**K/D Ratio**: ${match.Kills / match.Deaths}\n**K/R Ratio**: ${match.Kills / match.Rounds}\n**Double Kills**: ${match["Double Kills"]}\n**Triple Kills**: ${match["Triple Kills"]}\n**Quadro Kills**: ${match["Quadro Kills"]}\n**Penta Kills**: ${match["Penta Kills"]}\n**Duration**: ${(match["Match Finished At"]*1000-match["Created At"]*1000)/60} minutes\n\n`
        kills.push(match.Kills)
        deaths.push(match.Deaths)
        rounds.push(match.Rounds)
        duration.push((match["Match Finished At"]*1000-match["Created At"]*1000)/60)
      }
      res += `**Average Kills**: ${kills.reduce((a, b) => a + b, 0) / kills.length}\n**Average Deaths**: ${deaths.reduce((a, b) => a + b, 0) / deaths.length}\n**Average Rounds**: ${rounds.reduce((a, b) => a + b, 0) / rounds.length}\n**Average Duration**: ${duration.reduce((a, b) => a + b, 0) / duration.length} minutes\n\n`
      return res
    } catch (err) {
      return "No match stats found or profile is private."
    }
  }

  async statsForMatches() {
    try {
      const res = `**Stats for Matches**\n`
      const kills = []
      const deaths = []
      const rounds = []
      const duration = []
      for (const match of this.content.items) {
        match = match.stats
        res += `**Match ID**: ${match["Match Id"]}\n**Map**: ${match.Map}\n**Score**: ${match.Score}\n**Result**: ${1 === match.Result ? "**Win**" : "**Loss**"}\n**Kills**: ${match.Kills}\n**Deaths**: ${match.Deaths}\n**Assists**: ${match.Assists}\n**ADR**: ${match.ADR}\n**K/D Ratio**: ${match.Kills / match.Deaths}\n**K/R Ratio**: ${match.Kills / match.Rounds}\n**Double Kills**: ${match["Double Kills"]}\n**Triple Kills**: ${match["Triple Kills"]}\n**Quadro Kills**: ${match["Quadro Kills"]}\n**Penta Kills**: ${match["Penta Kills"]}\n**Duration**: ${(match["Match Finished At"]*1000-match["Created At"]*1000)/60} minutes\n\n`
        kills.push(match.Kills)
        deaths.push(match.Deaths)
        rounds.push(match.Rounds)
        duration.push((match["Match Finished At"]*1000-match["Created At"]*1000)/60)
      }
      res += `**Average Kills**: ${kills.reduce((a, b) => a + b, 0) / kills.length}\n**Average Deaths**: ${deaths.reduce((a, b) => a + b, 0) / deaths.length}\n**Average Rounds**: ${rounds.reduce((a, b) => a + b, 0) / rounds.length}\n**Average Duration**: ${duration.reduce((a, b) => a + b, 0) / duration.length} minutes\n\n`
      return res
    } catch (err) {
      return "No match stats found or profile is private."
    }
  }

  async rankings() {
    try {
      const res = `**Rankings**\n`
      for (const player of this.content.items) {
        res += `${player.position}. **Player**: ${player.nickname} - ${player.faceit_elo}\n`
      }
      return res
    } catch (err) {
      return "No ranking data found."
    }
  }

  async rankOfPlayer() {
    try {
      const res = `**Rank of Player**\n`
      const player = this.content.items[0]
      res += `${player.position}. **Player**: ${player.nickname} - ${player.faceit_elo}\n`
      return res
    } catch (err) {
      return "No ranking data found."
    }
  }
}


export default {
  Steam,
  Faceit
}