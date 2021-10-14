# extralife-twitch-bridge
Add extra features to your Twitch chat from Extra Life

## Configuration

Set the following environment variables:

- `EXTRALIFE_PARTICIPANT_ID`: Your ExtraLife/DonorDrive ID
- `TWITCH_USERNAME`: Your Bot's Username
- `TWITCH_OAUTH`: The code from https://twitchapps.com/tmi/
- `TWITCH_CHANNEL`: The Twitch channel to sit in

## Features

### Donation Sharing

Every 30 seconds the chat bot will check the list of donations and post to Twitch if there are new ones.

### Goal

The chat bot will reply to `!goal` with a sum of the current donations and goal.