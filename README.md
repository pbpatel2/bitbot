This is a fork of ImStuartJones' Bitbucket bot with the following changes:
* Reformatted Discord message.
* Added support for mult-commit pushes.
* Removed support for Slack (because I can't be bothered to test it).

# BitBot - A BitBucket Push Bot for Discord 

BitBot is a small Node script for sending commit messages from BitBucket pushes to the Discord room of your choice. BitBot takes advantage of BitBucket's outgoing webhooks, and Discord's incoming webhooks. You'll need your own server running NodeJS in order to receive and pass on the messages.

# Configure Discord Webhooks

Navigate to the channel of the Discord server you would like BitBot to post messages in. Click the gear icon next to the channel name. (Note: You will need admin privileges on the server to configure webhooks and use BitBot.) In the channel settings window, click 'Webhooks' on the left hand side of the screen. Click 'Create Webhook'. Enter a bot name, confirm the channel, and optionally upload an icon. Copy the Webhook URL, and click save.

# Configure BitBot

Clone this repository to an empty public folder or subdomain on a server running Node. Edit the config.js file. Set the name to whatever you would like BitBot's display name in the chat to be. Choose a port, and paste in at least one Webhook URL from the previous steps. BitBot can post to both Discord, or just one of these services. If you are not using a service, just leave the single quotes blank.

# Build and Run BitBot

Run an `npm init` command to download the required npm packages. Run `npm start` to begin running BitBot.

# Configure BitBucket

Finally, browse to your BitBucket repository. Click the 'Settings' option and choose 'Webhooks' from the settings menu. Click 'Add webhook'. Give your webhook a title, and paste in the server URL where you installed BitBot. Make sure 'Active' is checked. Check the 'Skip certificate verification' checkbox if your server is not running SSL. Make sure 'Triggers' is set to 'Repository push'.

Congratulations, BitBot should now be up and running.
