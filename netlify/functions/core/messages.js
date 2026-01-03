export class TelegramConstantMessages {
  START = `Give me link to Steam account for send stats.\n
  Send link to steam account and receive info about faceit account\n
  [#] Commands:\n
  /faceit_nickname [nickname]\n
  example: /faceit_nickname deko-_-\n\n
  /steam_nickname [nickname]\n
  example: /steam_nickname grteamboss`
  HELP = `Commands:\n
  /donate\n
  /help\n
  /about\n
  /faceit_nickname [nickname]\n
  example: /faceit_nickname deko-_-\n\n
  /faceit_id [id]\n
  example: /faceit_id 12345678-1234-1234-1234-123456789012\n\n
  /faceit_recent_matches [nickname]\n
  example: /faceit_recent_matches deko-_-\n\n
  /faceit_history [nickname]\n
  example: /faceit_history deko-_-\n\n
  /faceit_ranking [game] [region]\n
  example: /faceit_ranking cs2 EU\n\n
  /faceit_player_rank [game] [region] [playerId OR profile link]\n
  example: /faceit_player_rank cs2 EU deko-_- OR /faceit_player_rank cs2 EU 12345678-1234-1234-1234-123456789012 OR /faceit_player_rank cs2 EU https://www.faceit.com/en/players/deko-_-\n\n
  /steam_player_info [nickname OR profile link OR steamID64]\n
  example: /steam_player_info grteamboss OR /steam_player_info https://steamcommunity.com/id/grteamboss OR /steam_player_info 76561198034392384\n\n
  /steam_played_games [nickname OR profile link OR steamID64]\n
  example: /steam_played_games grteamboss OR /steam_played_games https://steamcommunity.com/id/grteamboss OR /steam_played_games 76561198034392384\n\n
  /steam_friend_list [nickname OR profile link OR steamID64]\n
  example: /steam_friend_list grteamboss OR /steam_friend_list https://steamcommunity.com/id/grteamboss OR /steam_friend_list 76561198034392384\n\n
  /steam_owned_games [nickname OR profile link OR steamID64]\n
  example: /steam_owned_games grteamboss OR /steam_owned_games https://steamcommunity.com/id/grteamboss OR /steam_owned_games 76561198034392384\n\n
  Or just send me link to Steam account and receive info about faceit account`
  DONATE = `If you want to support the development of this bot, you can donate via:\n
  DonationAlerts - https://www.donationalerts.com/grteamboss.\n
  USDT(TRC20) - TDAfrdCSHHYhZXAgH8etFe9E4nvKeQhpVn\n
  BitCoin(Taproot) - bc1pzlsjh4r4wrdzv4566qxwg9ffd62y8detg6dp2ycp8l6r90at79lqkthyp8\n
  TON(W5) - UQDFceqUXCT24u9pphCzmHqwLdwYUK0gDvYo8aykDPFadONX\n
  TON(V4) - UQDHv1DBOdVOPFGQ50zzcrf1nCPgJKLgRDgUpuWskZWC_r-4\n
  \n\n
  Thank you!`
  ABOUT = `This bot was created by @saidovjasur.\n
  You can find the source code on [GitHub](https://github.com/grteamboss/faceit_webapp_telegram_bot).`
}