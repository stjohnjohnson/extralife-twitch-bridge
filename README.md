# extralife-twitch-bridge
Add extra features to your Twitch chat from Extra Life

## Configuration

Set the following environment variables:

- `EXTRALIFE_PARTICIPANT_ID`: Your ExtraLife/DonorDrive ID
- `TWITCH_USERNAME`: Your Bot's Username
- `TWITCH_OAUTH`: The code from https://twitchapps.com/tmi/
- `TWITCH_CHANNEL`: The Twitch channel to sit in

## Usage

```
$ docker run --rm -it --env-file .env stjohnjohnson/extralife-twitch-bridge
> extralife-twitch-bridge@1.1.0 start
> node app.js

[21:11] info: Connecting to irc-ws.chat.twitch.tv on port 443..
[21:11] info: Sending authentication to server..
[21:11] info: Connected to server.
[21:11] info: Executing command: JOIN #stjohnjohnson
[21:11] info: Joined #stjohnjohnson
[21:11] info: [#stjohnjohnson] <stjohnjohnson>: !goal
[21:11] info: [#stjohnjohnson] <stjohnbot>: St. John Johnson has raised $128.10 out of $10,000.00 (1%)
```

## Features

### Donation Sharing

Every 30 seconds the chat bot will check the list of donations and post to Twitch if there are new ones.

### Goal

The chat bot will reply to `!goal` with a sum of the current donations and goal.