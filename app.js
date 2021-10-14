import { getUserInfo, getUserDonations } from 'extra-life-api';
import dotenv, { config } from 'dotenv';
import tmi from 'tmi.js';

// Load config from disk
dotenv.config();

// Validate we have all the required variables
const configErrors = ['TWITCH_CHANNEL', 'TWITCH_USERNAME', 'TWITCH_OAUTH', 'EXTRALIFE_PARTICIPANT_ID'].map(key => {
    if (!process.env[key]) {
        return `${key} is a required environment variable`;
    }
}).join("\n").trim();
if (configErrors != "") {
    console.error(configErrors);
    process.exit(1);
}

var seenDonationIDs = {};
function getLatestDonation(silent = false) {
    getUserDonations(process.env.EXTRALIFE_PARTICIPANT_ID).then(data => {
        var msgQueue = [];

        data.donations.map(donation => {
            if (seenDonationIDs[donation.donationID]) {
                return;
            }
            seenDonationIDs[donation.donationID] = true;

            const amount = moneyFormatter.format(donation.amount),
                displayName = donation.displayName ? donation.displayName : 'Anonymous',
                message = donation.message ? ` with the message "${donation.message}"` : '';;

            msgQueue.unshift(`ExtraLife ExtraLife ${displayName} just donated ${amount}${message}! ExtraLife ExtraLife`);
        });

        if (!silent) {
            msgQueue.forEach(msg => client.say(process.env.TWITCH_CHANNEL, msg));
        }
    }).catch(err => {
        console.error("Error getting Donations:", err);
    })
}
setInterval(getLatestDonation, 30000);
// Be quiet the first time
getLatestDonation(true);

// Setup a formatter
const moneyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

// Create the client
const client = new tmi.Client({
    options: { debug: true, messagesLogLevel: "info" },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: `${process.env.TWITCH_USERNAME}`,
        // Don't forget to use https://twitchapps.com/tmi/ to get this value
        password: `${process.env.TWITCH_OAUTH}`
    },
    channels: [`${process.env.TWITCH_CHANNEL}`]
});

// Connect!
client.connect().catch(console.error);

// Listen for messages
client.on('message', (channel, tags, message, self) => {
    // Ignore self
    if (self) return;

    switch (message.toLowerCase()) {
        case '!goal':
            getUserInfo(process.env.EXTRALIFE_PARTICIPANT_ID).then(data => {
                const sumDonations = moneyFormatter.format(data.sumDonations),
                    fundraisingGoal = moneyFormatter.format(data.fundraisingGoal),
                    percentComplete = Math.round(data.sumDonations / data.fundraisingGoal * 100);

                client.say(channel, `${data.displayName} has raised ${sumDonations} out of ${fundraisingGoal} (${percentComplete}%)`);
            });
            break;
    }
});

