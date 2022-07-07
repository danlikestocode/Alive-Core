export {}
import Logger from "./Logger"
import Assets from "./Assets";
const { MessageEmbed } = require('discord.js');

export default class PlayerActions {
    private logger: any;
    private assets: any; 

    constructor() {
       this.logger = new Logger(); 
       this.assets = new Assets();
    }


    //Listening to event emitters
    //For custom player object
    public startPlayerEventListener(client: any) {
        this.logger.debug("Starting player event listener...")
        
        this.addSong(client);
        this.playSong(client);
        this.empty(client);
        this.finish(client);

        //Add playlist
        client.player.on("addList", (queue: any, playlist: any) => queue.textChannel.send(
            `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to the queue!`
        ));

        //Error
        client.player.on("error", (channel: any, error: any) => channel.send(
            `${this.assets.errorEmoji}  |  An error was encountered: ` + error
        ));

        //Initializing queue
        client.player.on("initQueue", (queue: any) => {
            queue.autoplay = true;
            queue.volume = 100;
        });

        //No related songs found for query
        //Only emits when autoplay is on
        client.player.on("noRelated", (queue: any) => queue.textChannel.send(
            `${this.assets.errorEmoji}  |  Can't find related video to play.`
        ));
        
        //Search is canceled due to timeout
        client.player.on("searchCancel", (message: any) => message.channel.send(
            `${this.assets.errorEmoji}  |  Searching canceled due to timeout!`
        ));

        //Invalid search answer
        client.player.on("searchInvalidAnswer", (message: any) => message.channel.send(
            `${this.assets.errorEmoji}  |  You answered an invalid number!`
        ));
        
        //No results from query
        client.player.on("searchNoResult", (message: any, query: any) => message.channel.send(
            `${this.assets.errorEmoji}  |  No result found for ${query}!`
        ));

        //More than 1 result from query
        //Has to be enabled
        client.player.on("searchResult", (message: any, results: any) => {
            message.channel.send(`**Choose an option from below**\n${
                results.map((song: any, i: any) => `**${i + 1}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")
            }\n*Enter anything else or wait 60 seconds to cancel*`);
        });


        this.logger.debug("Player events loaded succesfully!")
    }

    //Add Song Event
    private addSong(client: any) {
        client.player.on("addSong", (queue: any, song: any) => queue.textChannel.send({
            embeds: [
                new MessageEmbed()
                .setColor(this.assets.embedColor)
                .setTitle('Added Song')
                .setAuthor({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL })
                .addFields(
                    { name: `${song.name}`, value: `*Requested by:* ${song.user}` },
                    { name: 'Position in Queue', value: `\`${queue.songs.length}\``, inline: true },
                    { name: `Length`, value: `\`${song.formattedDuration}\``, inline: true },
                    { name: `URL`, value: `${song.url}`, inline: true },
                )
                .setTimestamp()
                .setThumbnail(song.thumbnail)
                .setFooter({ text: this.assets.footerText })
            ]
        }).then(
            (repliedMessage: any) => {
                setTimeout(() => repliedMessage.delete(), this.assets.deleteDurationNormal)
            }
        ));
    }

    //Playing Next Song Event
    private playSong (client: any) {
        client.player.on("playSong", (queue: any, song: any) => queue.textChannel.send({
            embeds: [
                new MessageEmbed()
                .setColor(this.assets.embedColor)
                .setTitle('Now Playing')
                .setAuthor({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL })
                .addFields(
                    { name: `${song.name}`, value: `*Requested by:* ${song.user}` },
                    { name: "Source", value: `\`${song.source}\``, inline: true },
                    { name: `Length`, value: `\`${song.formattedDuration}\``, inline: true },
                    { name: `URL`, value: `${song.url}`, inline: true },
                )
                .setTimestamp()
                .setImage(song.thumbnail)
                .setFooter({ text: this.assets.footerText })
            ]
        }).then(
            (repliedMessage: any) => {
                setTimeout(() => repliedMessage.delete(), this.assets.deleteDurationNP)
            }
        ));
    }

    //Empty channel event
    private empty (client: any) {
        client.player.on("empty", (queue: any) => queue.textChannel.send({
            embeds: [
                new MessageEmbed()
                .setColor(this.assets.embedColor)
                .setDescription(`**${this.assets.errorEmoji}  |  Channel is empty, leaving all channels!**`)
                .setAuthor({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL })
                .setTimestamp()
                .setFooter({ text: this.assets.footerText })
            ]
        }).then(
            (repliedMessage: any) => {
                setTimeout(() => repliedMessage.delete(), this.assets.deleteDurationNP)
            }
        ));
    }

    //Finished queue event
    private finish (client: any) {
        client.player.on("finish", (queue: any) => queue.textChannel.send({
            embeds: [
                new MessageEmbed()
                .setColor(this.assets.embedColor)
                .setDescription(`**${this.assets.errorEmoji}  |  Queue has finished! In order to keep using Alive Music Bot, add some more songs to the queue!**`)
                .setAuthor({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL })
                .setTimestamp()
                .setFooter({ text: this.assets.footerText })
            ]
        }).then(
            (repliedMessage: any) => {
                setTimeout(() => repliedMessage.delete(), this.assets.deleteDurationNP)
            }
        ));
    }
}