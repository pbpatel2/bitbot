"use strict";
// Basic express server to listen for Bitbucket webhooks.
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

let request = require('request'); // Used to push message to chat services.
let config = require('./config'); // See config.js for server ports and chat webhook configuration.

// Create Discord-formatted message and send it to the Discord webhook.
const discordPost = (msg) => {
    let discordMsg = {
        username: config.username,
        content: "New push to " + msg.repo + " by " + msg.username + ".\n" +
                 msg.link + "\n" +
                 msg.commit,
        avatar_url: "",
    };

    request({
        url: config.discordEndpoint,
        method: 'POST',
        json: true,
        body: discordMsg, 
    }, function(error, response, body) {
        console.log('Discord message sent.');
    });
};

const post = (message) => {
    console.log('Posting message...');
    discordPost(message);
};

// Combines multiple commits into one message
const parseCommits = (commits) => {
    let messages = [];
    let formattedMsg = "";
    commits.forEach((c) => { messages.push(c.message); });
    messages.forEach((m) => {
        formattedMsg += "```" + m + "```";
    });
    return formattedMsg;
};

// Shortens hashes in URL
const compressLink = (link) => {
    let hash1 = "";
    let hash2 = "";
    let smallLink = "";

    let hashStartLoc = link.indexOf("compare") + "compare/".length;

    hash1 = link.slice(hashStartLoc, link.indexOf(".."));
    hash2 = link.slice(link.indexOf("..") +2, link.length);

    smallLink = link.slice(0, hashStartLoc) + hash1.slice(0,7) + ".." + hash2.slice(0,7);
    return smallLink;
};

// Debug to see if your server's config'd correctly.
/*app.get('/', function (req, res) {
    res.send('You\'re not supposed to be GET-ing here.');
});*/

// Listen for HTTP POST requests in whatever folder you run this app in.
app.post('/', function(req,res) {
    console.log('Bitbucket webhook recieved!');
    res.json({message: 'Message recieved by Bitbot.'});
    // Turn the response into something easier to work with.
    let message = {
        'username': req.body.actor.display_name,
        'repo': req.body.repository.name,
        'hash': req.body.push.changes[0].commits[0].hash,
        'commit': parseCommits(req.body.push.changes[0].commits),
        'link': compressLink(req.body.push.changes[0].links.html.href)
    };
    console.log(message);
    post(message);
});

// Start listening on the configured port.
app.listen(config.port, function () {
  console.log(config.username + ' running on port ' + config.port + '.');
  if(config.discordEndpoint) { console.log('Running in Discord mode.') }
  else { console.log('Endpoint not configured.') }
});
