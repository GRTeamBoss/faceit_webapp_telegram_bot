export class Format {


  constructor() {
  }

  async csgo(content) {
    try
    {
      const res = `<b>CS:GO</b>\n<b>region</b>: ${content.region}\n<b>level</b>: ${content.skill_level}\n<b>ELO</b>: ${content.faceit_elo}\n<b>nickname</b>: ${content.game_player_name}\n`
      return res
    } catch (err) 
    {
      return false
    }
  }

  async cs2(content) {
    try 
    {
      const res = `<b>CS 2</b>\n<b>region</b>: ${content.region}\n<b>level</b>: ${content.skill_level}\n<b>ELO</b>: ${content.faceit_elo}\n<b>nickname</b>: ${content.game_player_name}\n`
      return res 
    } catch (err) 
    {
      return false
    }
  }

  async faceitGeneral(content) {
    const res = `<b>General</b>\n<b>STEAM ID64</b>: ${content.steam_id_64}\n<b>STEAM nickname</b>: ${content.steam_nickname}\n<b>FACEIT</b>: ${content.faceit_url.replace("{lang}", content.settings.language)}\n<b>Joined at</b>: ${content.activated_at}\n`
    return res
  }
}