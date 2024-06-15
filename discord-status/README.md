# discord status updater

The main idea is that you can use the [Discord v10 API](https://discord.com/developers/docs/reference) to `requests.patch` through a custom status.
This may or may not be against the [Discord ToS](https://discord.com/terms), so if you run this script a thousand of times per second bad things might happen to your account.

This requires your Discord auth token, which according to [Stack Overflow](https://stackoverflow.com/questions/67348339) can be obtained by the below script inside a developer console on Discord web:
```(webpackChunkdiscord_app.push([[''],{},e=>{m=[];for(let c in e.c)m.push(e.c[c])}]),m).find(m=>m?.exports?.default?.getToken!==void 0).exports.default.getToken()```
(This works as of June 2024. Note that (part of) your token changes every time you alter your password.)

Your token is read from `~/.config/quotes/discord_token.txt`. Statuses are read from `~/.config/quotes/discord_quotes.csv`, which is a CSV file with first column containing a custom emoji status (or left blank) and second column containing custom status text. The program will push a notif with the HTTP request status code and the randomly selected discord status.

## conda cron shenanigans

Suppose that (1) you want to schedule Discord status changes with `cron`, and (2) you want to run this in a conda environment.
This turns out to be rather painful for various shell-related reasons. Working solution:

```0 * * * * su edward -c "/home/edward/code/quotes/discord-status/change_status.sh```

where `discord_status`, referenced in `change_status.sh`, is the name of the conda environment.