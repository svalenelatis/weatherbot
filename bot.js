const config = require("./config.json");
const Discord = require("discord.js");
var length = 0;
var temp = 0;
var wind = 0;
var precip = true;
var sprecip = " ";
var visib = " ";
var color = " ";
var sent = false;
var windSpeed = 0;
var sevText = "n/a";
var i;
const bot = new Discord.Client({disableEveryone: true});


var selnata1 = {
	"name" : "Centra",
	"max" : 100,
	"min" : 10,
	"tdays" : 365,
	"tshift" : 0,
	"phigh" : .50,
	"plow" : .20,
	"pdays" : 365,
	"pshift" : 365/2,
	"shigh" : 4,
	"slow" : 1.5,
	"sdays" : 365,
	"sshift" : 0,
	"id" : "563402636817334272"
};
var farkath1 = {
	"name" : "Redcliff Bastion",
	"max" : 70,
	"min" : 0,
	"tdays" : 320,
	"tshift" : 160,
	"phigh" : .30,
	"plow" : .05,
	"pdays" : 320,
	"pshift" : 0,
	"shigh" : 3,
	"slow" : 1.5,
	"sdays" : 320,
	"sshift" : 0,
	"id" : "555184257245511711"
};
var farkath2 = {
    "name" : "Teeth of Durgas",
    "max" : 30,
    "min" : -40,
    "tdays" : 320,
    "tshift" : 0,
    "phigh" : .80,
    "plow" : .60,
    "pdays" : 320,
    "pshift" : 0,
    "shigh" : 6,
    "slow" : 2,
    "sdays" : 320,
    "sshift" : 0,
    "id" : "555184257245511711"
};
var farkath3 = {
    "name" : "Andumor Plains",
    "max" : 90,
    "min" : 10,
    "tdays" : 320,
    "tshift" : 0,
    "phigh" : .6,
    "plow" : .2,
    "pdays" : 320,
    "pshift" : 200,
    "shigh" : 6,
    "slow" : 1,
    "sdays" : 320,
    "sshift" : 200,
    "id" : "555184257245511711"
};
var vapor1 = {
    "name" : "Apullan",
    "max" : 120,
    "min" : 5,
    "tdays" : 285,
    "tshift" : 0,
    "phigh" : 50,
    "plow" : .5,
    "pdays" : 285,
    "pshift" : 0,
    "shigh" : 2,
    "slow" : 1,
    "sdays" : 285,
    "sshift" : 0,
    "id" : "563491722420551717"
};
var vapor2 = {
    "name" : "Nanyan",
    "max" : 85,
    "min" : 0,
    "tdays" : 285,
    "tshift" : 50,
    "phigh" : 70,
    "plow" : 5,
    "pdays" : 285,
    "pshift" : 50,
    "shigh" : 2,
    "slow" : 1,
    "sdays" : 285,
    "sshift" : 50,
    "id" : "563491722420551717"
};
var vapor3 = {
    "name" : "Lingan",
    "max" : 100,
    "min" : 35,
    "tdays" : 285,
    "tshift" : 100,
    "phigh" : 75,
    "plow" : 25,
    "pdays" : 285,
    "pshift" : 100,
    "shigh" : 3,
    "slow" : 1,
    "sdays" : 285,
    "sshift" : 100,
    "id" : "563491722420551717"
};
var vapor4 = {
    "name" : "Hoacac",
    "max" : 110,
    "min" : 0,
    "tdays" : 285,
    "tshift" : 0,
    "phigh" : 80,
    "plow" : .5,
    "pdays" : 285,
    "pshift" : 0,
    "shigh" : 2,
    "slow" : 1,
    "sdays" : 285,
    "sshift" : 0,
    "id" : "563491722420551717"
};
var vapor5 = {
    "name" : "Campecco",
    "max" : 65,
    "min" : -30,
    "tdays" : 285,
    "tshift" : 0,
    "phigh" : 80,
    "plow" : .5,
    "pdays" : 285,
    "pshift" : 0,
    "shigh" : 5,
    "slow" : 1,
    "sdays" : 285,
    "sshift" : 0,
    "id" : "563491722420551717"
};


var climates =[selnata1,farkath1,farkath2,farkath3,vapor1,vapor2,vapor3,vapor4,vapor5];



var avgSeverity = 0.0;

function getTemperature(high, low, shift, daysbetweenpeaks) {
	var currentDate = new Date();
	

	var startDate = new Date(currentDate.getFullYear(), 0, 0);
	

    var diff = (currentDate - startDate) + ((startDate.getTimezoneOffset() - currentDate.getTimezoneOffset()) * 60 * 1000);
	

	var oneDay = 1000 * 60 * 60 * 24;
	

	var currentDay = Math.floor(diff / oneDay);
	temperature = ((high - low)*(Math.PI / 9.87)*Math.acos( Math.cos((2 * Math.PI / daysbetweenpeaks) * currentDay - (shift*Math.PI / daysbetweenpeaks / 2))) + low);
	
	//now we can add random variation to the temperature. The following code block does that.

	//the deviation in the tempurature. The final temp will be +/- the deviation. 
	var randDeviation = 10;

	//creates a final temperature plus or minus a random number from the base temperature we got earlier. 
	var finalTemp = Math.floor(temperature) + Math.floor( Math.random() * randDeviation * 2) - randDeviation;

	return finalTemp;
}

function generateChance(daysbetweenpeaks,high, low, shift){
	var currentDate = new Date();

    var startDate = new Date(currentDate.getFullYear(), 0, 0);

    var diff = (currentDate - startDate) + ((startDate.getTimezoneOffset() - currentDate.getTimezoneOffset()) * 60 * 1000);

    var oneDay = 1000 * 60 * 60 * 24;

    var currentDay = Math.floor(diff / oneDay);
	Result = ((high - low)*(Math.PI / 9.87)*Math.acos( Math.cos((2 * Math.PI / daysbetweenpeaks) * currentDay - (shift*Math.PI / daysbetweenpeaks / 2))) + low);
	return Result;
}
function generateSeverity(daysbetweenpeaks,high,low,shift){
	var currentDate = new Date();
	
	var startDate = new Date(currentDate.getFullYear(), 0, 0);
	
    var diff = (currentDate - startDate) + ((startDate.getTimezoneOffset() - currentDate.getTimezoneOffset()) * 60 * 1000);
	
	var oneDay = 1000 * 60 * 60 * 24;
	

	var currentDay = Math.floor(diff / oneDay);
	
	
	Result = ((high - low)*(Math.PI / 9.87)*Math.acos( Math.cos((2 * Math.PI / daysbetweenpeaks) * currentDay - (shift*Math.PI / daysbetweenpeaks / 2))) + low);

	
	return Result;	
}

//runs the function I'm about to define. Obviously you'll need to rearrange things in order to get them working properly.



//definition of the function ran in the previous line. 
//Establishes precipitation and severity based on the chance and severity passed to it.
function generatePrecipitation ( chance, severity ) {
	//precipitation first.
	//easy equation. If the random number generated is less than the precip chance for the month, it returns true. Otherwise it returns false. 
	precip = (Math.random() < chance) ? true : false;
	
	//now severity.
	//more initializing variables.
	//sevDeviation is how much above or below you want the severity to go. 
	//(if the avgSeverity is 1, and the deviation is 1.5, the equation will never let the severity go over 2.5 in the random chance.)
	var sevDeviation = 1.5;
	
	
	//This is how much above or below the wind can potentially be from the average on a given day.
	var windDeviation = 10;
	var avgWind = 0;
	
	//if there's precip, choose how severe it is. 
	if (precip == true && temp < 32) {
		//establishes the randomly generated severity based on the perameters we passed in at the beginning.
		var finalSeverity = (Math.random() * sevDeviation * 2) - sevDeviation + severity;
	
		//determines the weather patterns based on the severity of the weather. It's a bit different from your previous system...
		//This system definitely needs more thought put into it, but it's just one solution.
		//there are many solutions for how to generate this data. Let me know what you think.
		if (finalSeverity < 1) {
			
			sevText = "Light Snow";
			avgWind = 10;
			windSpeed = (Math.random() * windDeviation * 2) - windDeviation + avgWind;
            windSpeed = (windSpeed < 0) ? 0 : windSpeed;
            visib = "Moderate";
			color = ""
		} else if (finalSeverity < 2) {
			sevText = "Moderate Snow";
			avgWind = 10;
			windSpeed = (Math.random() * windDeviation * 2) - windDeviation + avgWind;
            windSpeed = (windSpeed < 0) ? 0 : windSpeed;
            visib = "Low";
		} else if (finalSeverity < 3) {
			sevText = "Heavy Snow";
			avgWind = 15;
			windSpeed = (Math.random() * windDeviation * 2) - windDeviation + avgWind;
            windSpeed = (windSpeed < 0) ? 0 : windSpeed;
            visib = "Low";
		} else if (finalSeverity < 4) {
			sevText = "Blizzard";
			avgWind = 35;
			windSpeed = (Math.random() * windDeviation * 2) - windDeviation + avgWind;
            windSpeed = (windSpeed < 0) ? 0 : windSpeed;
            visib = "Limited";
		} else if (finalSeverity < 5) {
			sevText = "Severe Blizzard";
			avgWind = 50;
			windSpeed = (Math.random() * windDeviation * 2) - windDeviation + avgWind;
            windSpeed = (windSpeed < 0) ? 0 : windSpeed;
            visib = "Limited";
		} else if (finalSeverity < 6) {
			sevText = "Very Severe Blizzard";
			avgWind = 100;
			windDeviation = 20;
			windSpeed = (Math.random() * windDeviation * 2) - windDeviation + avgWind;
            windSpeed = (windSpeed < 0) ? 0 : windSpeed;
            visib = "Very Limited";
		} else if (finalSeverity < 7) {
			sevText = "Severe Cyclone";
			avgWind = 160;
			windDeviation = 40;
			windSpeed = (Math.random() * windDeviation * 2) - windDeviation + avgWind;
            windSpeed = (windSpeed < 0) ? 0 : windSpeed;
            visib = "Limited";
		} else if (finalSeverity < 8) {
			sevText = "Rending Hurricane";
			avgWind = 260;
			windDeviation = 60;
			windSpeed = (Math.random() * windDeviation * 2) - windDeviation + avgWind;
            windSpeed = (windSpeed < 0) ? 0 : windSpeed;
            visib = "Limited";
		} else if (finalSeverity < 9) {
			sevText = "City Destroying Hurricane";
			avgWind = 400;
			windDeviation = 80;
			windSpeed = (Math.random() * windDeviation * 2) - windDeviation + avgWind;
            windSpeed = (windSpeed < 0) ? 0 : windSpeed;
            visib = "Very Limited";
		} else {
			sevText = "Apocalyptic Storm";
			avgWind = 580;
			windDeviation = 100;
			windSpeed = (Math.random() * windDeviation * 2) - windDeviation + avgWind;
            windSpeed = (windSpeed < 0) ? 0 : windSpeed;
            visib = "Who cares? Run for your life!"
		}
		//"apolcalyptic storm" lol. I may have gotten carried away, but it allows you to make some pretty crazy weather patterns if you wanted to. :) 
		//I figure the vast majority of the time, the weather will stay between 0 and 3.
		
	 //if no precip, choose a low random wind speed. 
	}else if(precip == true && temp >= 32) {
		//establishes the randomly generated severity based on the perameters we passed in at the beginning.
		var finalSeverity = (Math.random() * sevDeviation * 2) - sevDeviation + severity;
	
		//determines the weather patterns based on the severity of the weather. It's a bit different from your previous system...
		//This system definitely needs more thought put into it, but it's just one solution.
		//there are many solutions for how to generate this data. Let me know what you think.
		if (finalSeverity < 1) {
			
			sevText = "Light Rain";
			avgWind = 10;
			windSpeed = (Math.random() * windDeviation * 2) - windDeviation + avgWind;
            windSpeed = (windSpeed < 0) ? 0 : windSpeed;
            visib = "Moderate";
			color = ""
		} else if (finalSeverity < 2) {
			sevText = "Moderate precipitation";
			avgWind = 10;
			windSpeed = (Math.random() * windDeviation * 2) - windDeviation + avgWind;
            windSpeed = (windSpeed < 0) ? 0 : windSpeed;
            visib = "Moderate";
		} else if (finalSeverity < 3) {
			sevText = "Heavy precipitation";
			avgWind = 15;
			windSpeed = (Math.random() * windDeviation * 2) - windDeviation + avgWind;
            windSpeed = (windSpeed < 0) ? 0 : windSpeed;
            visib = "Moderate";
		} else if (finalSeverity < 4) {
			sevText = "Stormy";
			avgWind = 15;
			windSpeed = (Math.random() * windDeviation * 2) - windDeviation + avgWind;
            windSpeed = (windSpeed < 0) ? 0 : windSpeed;
            visib = "Low";
		} else if (finalSeverity < 5) {
			sevText = "Severe storm";
			avgWind = 45;
			windSpeed = (Math.random() * windDeviation * 2) - windDeviation + avgWind;
            windSpeed = (windSpeed < 0) ? 0 : windSpeed;
            visib = "Low";
		} else if (finalSeverity < 6) {
			sevText = "Hurricane";
			avgWind = 100;
			windDeviation = 20;
			windSpeed = (Math.random() * windDeviation * 2) - windDeviation + avgWind;
            windSpeed = (windSpeed < 0) ? 0 : windSpeed;
            visib = "Limited";
		} else if (finalSeverity < 7) {
			sevText = "Severe Hurricane";
			avgWind = 160;
			windDeviation = 40;
			windSpeed = (Math.random() * windDeviation * 2) - windDeviation + avgWind;
            windSpeed = (windSpeed < 0) ? 0 : windSpeed;
            visib = "Limited";
		} else if (finalSeverity < 8) {
			sevText = "Rending Hurricane";
			avgWind = 260;
			windDeviation = 60;
			windSpeed = (Math.random() * windDeviation * 2) - windDeviation + avgWind;
            windSpeed = (windSpeed < 0) ? 0 : windSpeed;
            visib = "Limited";
		} else if (finalSeverity < 9) {
			sevText = "City Destroying Hurricane";
			avgWind = 400;
			windDeviation = 80;
			windSpeed = (Math.random() * windDeviation * 2) - windDeviation + avgWind;
            windSpeed = (windSpeed < 0) ? 0 : windSpeed;
            visib = "Very Limited";
		} else {
			sevText = "Apocalyptic Storm";
			avgWind = 580;
			windDeviation = 100;
			windSpeed = (Math.random() * windDeviation * 2) - windDeviation + avgWind;
            windSpeed = (windSpeed < 0) ? 0 : windSpeed;
            visib = "Who cares? Run for your life!"
		}
		//"apolcalyptic storm" lol. I may have gotten carried away, but it allows you to make some pretty crazy weather patterns if you wanted to. :) 
		//I figure the vast majority of the time, the weather will stay between 0 and 3.
		
	 //if no precip, choose a low random wind speed. 
	}
	else {
            sevText = "N/A";
			avgWind = 10;
			windSpeed = (Math.random() * windDeviation * 2) - windDeviation + avgWind;
            windSpeed = (windSpeed < 0) ? 0 : windSpeed;
            rand = Math.random();
            if(rand > .85 && rand < .95){
                visib = "Foggy";
            }else if(rand > .95){
                visib = "Very Foggy";
            }else{
                visib = "Clear";
            }
	}
	
}




function generateWeather(preset){
	max = preset.max;
	min = preset.min;
	tshift = preset.tshift;
	tdays = preset.tdays;
	phigh = preset.phigh;
	plow = preset.plow;
	pdays = preset.pdays;
	pshift = preset.pshift;
	shigh = preset.shigh;
	slow = preset.slow;
	sdays = preset.sdays;
	sshift = preset.sshift;
	chance = generateChance(pdays,phigh,plow,pshift);
	avgSeverity = generateSeverity(sdays,shigh,slow,sshift);
	temp = getTemperature(max,min,tshift,tdays);
	generatePrecipitation(chance,avgSeverity);
	
}

bot.on("ready", async () => {
    console.log(`${bot.user.username} is scanning Selnatian weather`)
    bot.user.setActivity("with a radar");

});


bot.on("message", async message => {
    let untime = message.createdTimestamp;
    let hourMS = untime % (86400000);
    let hour = Math.floor( hourMS / (3600000));
    if(hour === 14 && sent === false){
		generateAll();
		sent = true;
    }
    else if(hour === 15 && sent === true){
        sent = false;
    }
    if(message.channel.type === "dm") return;
    if(message.author.bot) return;
    
    

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);



    if(cmd === `${prefix}help`){
        let sicon = message.guild.iconURL;
        let serverembed = new Discord.RichEmbed()
        .setDescription("Selnata Weather Bot Help")
        .setThumbnail(sicon)
        .setColor("#310260")
        .addField(">generate", "Generates a new set of weather for all planes", true);
        
    
        return message.channel.send(serverembed);
    }
    if(cmd === `${prefix}generate`){
        generateAll();
    }
    if(cmd === `${prefix}getWeather`){

        let gicon = bot.user.displayAvatarUrl;
        let getembed = new Discord.RichEmbed()
        .setDescription("Current Weather")
        .setColor(color)
        .setThumbnail(gicon)
        .addField("Average Temperature:", temp)
        .addField("Wind Speed (mph):", Math.round(windSpeed))
        .addField("Precipitation:", precip)
        .addField("Severity of Precipitation:", sprecip)
        .addField("Visibility", visib);

        return message.channel.send(getembed);
        
    }
    
})
function generateAll(){
	for(i=0; i < climates.length; i++){
		generateWeather(climates[i]);
		let id = climates[i].id;
		console.log(id);
		let gicon = bot.user.displayAvatarUrl;
        let getembed = new Discord.RichEmbed()
        .setDescription("Current Weather")
        .setColor(color)
		.setThumbnail(gicon)
		.addField("Plane/section", climates[i].name)
        .addField("Average Temperature:", temp)
        .addField("Wind Speed (mph):", windSpeed)
        .addField("Precipitation:", precip)
        .addField("Severity of Precipitation:", sevText)
        .addField("Visibility", visib);

        bot.channels.get(id).send(getembed);
	}
}

bot.login(config.token);