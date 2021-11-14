const Discord = require('discord.js-v11')
const Client = new Discord.Client()

const Bot = Client
const bot = Client
const client = Client

const Strg = require('./Storage.json')

const { Token } = Strg

Client.on('ready', () => {
  console.log(bot.user.tag + ' is online')
})

Client.on('message', message => {
  if (message.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const embed = new Discord.MessageEmbed()

  let newInfo = {
    name:"",
    prefrence:0,
    Framelenth:0,
    FrameRate:24,
    TimeLenth:120,
    link:'Void',
    finished:'Void',
    channel:'Void',
  }

  switch(command) {
    case 'new':
      message.channel.send(
        embed.setTitle('New Animation')
        .setFooter('What is the name of your animation?')
      )
      message.channel.awaitMessages(m => m.author.id == message.author.id,
        {max: 1, time: 30000}).then(collected => {
          if(typeof collected === 'string') {
            newInfo.name = collected
          } else return message.reply('not a valid name')
        }).catch(() => {
          message.reply('No answer after 30 seconds, operation canceled.');
        });
        console.log(newInfo.name)
      break;
      case 'shutdown': 
        message.reply('The bot will now shut down.\n'
                + 'Confirm with `yes` or deny with `no`.');

        // First argument is a filter function - which is made of conditions
        // m is a 'Message' object
        message.channel.awaitMessages(m => m.author.id == message.author.id,
                {max: 1, time: 30000}).then(collected => {
                        // only accept messages by the user who sent the command
                        // accept only 1 message, and return the promise after 30000ms = 30s

                        // first (and, in this case, only) message of the collection
                        if (collected.first().content.toLowerCase() == 'yes') {
                                message.reply('Shutting down...');
                                client.destroy();
                        }

                        else
                                message.reply('Operation canceled.');      
                }).catch(() => {
                        message.reply('No answer after 30 seconds, operation canceled.');
                });
        break;
      }
})

client.login(Token)