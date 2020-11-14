const Discord = require ('discord.js')
const client = new Discord.Client()
const randomPuppy = require('random-puppy')
const axios = require('axios')
const config = require('./config.json')
const command = require('./command')
const antispam = require('better-discord-antispam')




client.on('message', msg => {
    client.emit('checkMessage', msg);
})

client.on('ready', () => {
    antispam(client, {
        limitUntilWarn: 5, 
        limitUntilMuted: 10, 
        interval: 2500, 
        warningMessage: "Nespamuj!", 
        muteMessage: "Byl ztlumen na **10 minut** za spam!", 
        maxDuplicatesWarning: 7,
        maxDuplicatesMute: 10, 
        ignoredRoles: [''], 
        ignoredMembers: [''], 
        mutedRole: "muted",
        timeMuted: 1000 * 600, 
        logChannel: "spam-logy🔊" 
    })






    console.log('PŘIPRAVEN TY L!');
    client.user.setActivity('!napicuhelp', { type: 'LISTENING' })
        .then(presence => console.log(`Activita nastavena na ${presence.activities[0].name}`))

    command(client, 'napicuhelp', message => {
        const msg = new Discord.MessageEmbed()
        .setTitle("Příkazy-help")
        .setColor("#f39c12")

        .addField(":thermometer_face:!covid", "COVID-19-Základní informace",)
        .addField(":thermometer_face:!covidall", "COVID-19-Pokročilé informace",)
        .addField(":joy:!cursed", "Cursed obrázky-Reddit",)
        .addField(":joy:!meme", "Meme obrázky-Reddit",)
        .addField(":information_source:!napicuinfo", "Server-info" )
        .setFooter("Bot | By: Numax")
        message.channel.send(msg);
    })


    
    command(client, "meme", async message => {
        const Reddit = ["dankmeme", "meme", "memes", "pcmasterrace"]
        const nahoda = Reddit[Math.floor(Math.random() * Reddit.length)];
        const img = await randomPuppy(nahoda);
        const msg = new Discord.MessageEmbed()
        .setImage(img)
        .setColor("#f39c12")
        .setTitle(`from /r/${nahoda}`)
        .setURL(`https://reddit.com/r/${nahoda}`)
        message.channel.send(msg);
    })

    command(client, "cursed", async message => {
        const Reddit = ["cursedimages", "cursed_images",];
        const nahoda = Reddit[Math.floor(Math.random() * Reddit.length)];
        const img = await randomPuppy(nahoda);
        const msg = new Discord.MessageEmbed()
        .setImage(img)
        .setTitle(`from /r/${nahoda}`)
        .setColor('#f39c12')
        .setURL(`https://reddit.com/r/${nahoda}`);
        message.channel.send(msg);
    })


    command(client, "covid", async message => {
     
        const covid = async () => {
            
            const response = await axios.get('https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/zakladni-prehled.json');
            const covid2 = response.data.data[0];
            return covid2; 
        };
        const covidhod = await covid();
        const msg = new Discord.MessageEmbed()     
        .setTitle("COVID-19-Základní informace")
        .setColor('#f39c12')
        .addField("Potvrzené případy:thermometer_face:", ["+" + covidhod.potvrzene_pripady_vcerejsi_den], true)
        .addField("Celkem podlehlo:skull:", covidhod.umrti, true)
        .addField("Celkem vyléčených:heart:", covidhod.vyleceni, true)
        

        .setFooter("Bot | By: Numax")

        message.channel.send(msg);
    });


    command(client, "covidall", async message => {
        const covid = async () => {
            const response = await axios.get('https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/zakladni-prehled.json');
            const covid2 = response.data.data[0];
            return covid2   
        };
        const covidhod = await covid();
        const msg = new Discord.MessageEmbed()
        .setTitle("COVID-19-Pokročilé informace")
        .setColor('#f39c12')
        .addField("Potvrzené případy:thermometer_face:", ["+" + covidhod.potvrzene_pripady_vcerejsi_den], true)
        .addField("Celkem podlehlo:skull:", covidhod.umrti, true)
        .addField("Celkem vyléčených:heart:", covidhod.vyleceni, true)
        .addField("Celkem testovaných:test_tube:", covidhod.provedene_testy_celkem, true)
        .addField("Celkem nakažených:thermometer:", covidhod.potvrzene_pripady_celkem, true)
        .addField("Aktivních případů:hospital:", covidhod.aktivni_pripady, true)
        .setFooter("Bot | By: Numax")
        message.channel.send(msg);
    });

    command (client, "napicuinfo",  message => {
  
        
        const {guild} = message
        const lidstvo = guild.members.cache.filter(member => !member.user.bot).size;
        const boti = guild.members.cache.filter(member => member.user.bot).size;
        const lidstvoOFF = guild.members.cache.filter(member => member.presence.status == "offline").size;
        const lidstvoON = guild.members.cache.filter(member => member.presence.status !== "offline").size;

  
        var lidstvoONreal = lidstvoON - boti;
      
    
        

        
        

        const ikona = guild.iconURL()

        const msg = new Discord.MessageEmbed()
        .setTitle(`${guild.name}`)
        .setColor('#f39c12')
        .addField("Počet uživatelů:bust_in_silhouette:", lidstvo, true)
        .addField("Online:green_circle:", lidstvoONreal, true)
        .addField("Offline:red_circle:", lidstvoOFF, true)
        .addField("Počet botů:robot:", boti, true)
        .addField("Majitel:person_in_tuxedo:", guild.owner, true)
        .addField("Server id", guild.id, true)
        .setFooter("Bot | By: Numax")
        .setThumbnail(ikona)
        message.channel.send(msg)



      

    })


   
})




client.login(config.token)