<div align="center">
    <p>
        <a href="https://github.com/danlikestocode/Alive-Core/releases">
        <img src="https://i.imgur.com/61i0MIA.png">
        </a>
    </p>
</div>

# Alive

> A Discord music bot built on NodeJS and Typescript using DiscordJS, DiscordJS-Voice, and Distube. Alive Music Bot makes it easy for an everyday user to host their own music bot with *no restrictions*.

[Alive Music Bot Support Server](https://apeswon.club) || 
[Frequently Asked Questions](https://apeswon.club)

## ๐ Features
- Easy to setup and run yourself
- Easy to customize
- Varied support for multiple music sources
- Autoplay related songs
- Frequent updates & bug fixes

## ๐ถ Supported Sites
- YouTube
- Spotify
- SoundCloud
- YouTube Playlists
- Spotify Playlists
- SoundCloud Playlists
- Apple Music (Coming Soon)
- Any Direct Audio Link

*Make sure to stay on the lataest version of Alive Music Bot!*

## ๐งพ Requirements
- Discord Bot Token - **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**
- Guild ID
- Client ID
- Node JS v18.4.0 or newer

*This application may work on older versions of Node, but are not explicitly supported.*

## ๐ Getting Started

Installing Alive is easy! After running the commands below, follow the configuration instructions.

```sh
git clone https://github.com/danlikestocode/Alive-Core
npm install
```

## โ๏ธ Configuration

Copy or Rename `env.example` to `.env` and fill out the values:

โ ๏ธ **Make sure to never share your .env file or Discord Token with anyone!** โ ๏ธ

```env
DISCORD_TOKEN= 
CLIENT_ID= 
GUILD_ID= 
```

After setting up your .env file you can use the following command to start your bot:

```sh
npm start
```

## ๐ Commands

Alive Music Bot uses Discord slash commands, and is fully integrated in that system.
You can manage command permissions via Discord interface in server settings.

- /play (song name || URL)
`Plays the requested song at a valid URL or searches for it.`

- /autoplay
`Toggles auto play on or off`

- /help
`Shows a helpful prompt that includes all current commands`

- /leave
`Disconnects Alive Music Bot from all voice channels and cleare the current queue`

- /pause
`Pauses the player`

- /playskip
`Plays a song at the front of the queue`

- /previous
`Plays the previous song in the queue`

- /queue
`Shows the current queue`

- /resume
`Resumes a paused player`

- /shuffle
`Shuffles the current queue`

- /skip
`Skips the current song playing`

- /status
`Checks the status of Alive Music Bot`

- /stop
`Stops the player and clears the current queue`

