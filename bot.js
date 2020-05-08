		function sleep (time) {
		return new Promise((resolve) => setTimeout(resolve, time));
		}
		
		var fs = require("fs");
		
		var registeredUsers;
		fs.readFile('userData.txt', function (err, data) {
			if (err) {
			 throw err;
			}
			registeredUsers = (data+'').split(' ');
			});
		var userPoints;
		fs.readFile('messageData.txt', function (err, data) {
			if (err) {
			 throw err;
			}
			userPoints = (data+'').split(' ');
			});
		var messageAmount=0;
		var Discord = require('discord.io');
		var logger = require('winston');
		var auth = require('./auth.json');
		// Configure logger settings
		logger.remove(logger.transports.Console);
		logger.add(new logger.transports.Console, {
			colorize: true
		});
		logger.level = 'debug';
		// Initialize Discord Bot
		var bot = new Discord.Client({
		token: auth.token,
		autorun: true
		});
		bot.on('ready', function (evt) {
			logger.info('Connected');
			logger.info('Logged in as: ');
			logger.info(bot.username + ' - (' + bot.id + ')');
		});
		bot.on('message', function (user, userID, channelID, message, evt) {
		//Checks to see if it has been called
			var b = false;
				var id = 0;
				for(var i=0;i<registeredUsers.length;i++){
					if(userID == registeredUsers[i]){//Is this user in the registry?
					b = true;
					id = i;
				}
				}
				if(b){//If the user has registered, add a point for every message
					if (message.charAt(0) != '%') {
					userPoints[id]++;
					fs.writeFile('messageData.txt', userPoints.join(' '), (err) => {
					if (err) throw err;
					});
					}
				} else {//If not, register the user
					registeredUsers.push(userID);//Add the user to our registry
					userPoints.push(1);//Start the user off with 1 points
					fs.writeFile('userData.txt', registeredUsers.join(' '), (err) => {
					if (err) throw err;
					});
				}
				
				
				
			if (message.substring(0, 1) == '%') {
				var args = message.substring(1).split(' ');
				var cmd = args[0];
			
				//args = args.splice(1);
				switch(cmd) {
					// %ping
					case 'ping':
					var num = Math.floor(Math.random() * (21 - 1)) + 1;
						bot.sendMessage({
							to: channelID,
							message: '<@'+userID+'>'
						});
					break;
					
					
					//%messageCount
					case 'messageCount':
					if (args.length > 1){
						var temp= 0;
					for(var i = 0; i<userPoints.length; i++)
					{
						if (registeredUsers[i] == args[1].substring(3,args[1].length-1))
						{
							temp = i;
						}
					}
					bot.sendMessage({
					to: channelID,
					message: '```'+ temp + 'epic' + '\n' + registeredUsers[temp] + ' d\n' + args[1].substring(3,args[1].length-1) + '```' + '\n' + args[1] + ' has sent ' + userPoints[temp] + ' messages!'
					})
					}
					else{
					bot.sendMessage({
					to: channelID,
					message: '<@'+userID+'>' + ' has sent ' + userPoints[id] + ' messages!'
					})
					}
					break;
					
					

					// %wildMagic
					case 'wildMagic':
					var scale = Math.floor(Math.random() * (21 - 1)) + 1;
						if (scale >= 1 && scale <= 3)
							{
								var roll = Math.floor(Math.random() * (101 - 1)) + 1;
								switch(roll)
								{
								case '1':
								var result = 'A fireball explodes with you at the center. You and each creature within 20 feet of you who must make a Dexterity saving throw using your spell save DC, taking 5d6 fire damage on a failed save, or half as much damage on a successful one.'
								
								break;

								case 2:
								var result ='You recover all your expended spell slots.'
								break;

								case 3:
								var result = 'You lose the ability to hear for 1 day.'
								break;

								case 4:
								var result ='Each creature within 30 feet of you takes 1d10 necrotic damage. You regain hit points equal to the sum of damage dealt.'
								break;

								case 5:
								var result = 'You teleport to an alternate plane, then return to the location where you started after 1 minute.'
								break;

								case 6:
								var result = 'You transform into a large empty barrel for 1 minute, during which time you considered petrified.'
								break;

								case 7:
								var result = 'You are at the center of a darkness spell for 1 minute.'
								break;

								case 8:
								var result = 'You are frightened by the nearest creature until the end of your next turn.'
								break;

								case 9:
								var result = 'You are resistant to all damage types for 1 minute.'
								break;

								case 10:
								var result = 'A random creature within 60 feet of you is poisoned for 1d4 hours.'
								break;

								case 11:
								var result = 'Make a Wisdom saving throw against your own spell save DC. If you fail, you are polymorphed into giant dragonfly for 1 minute'
								break;

								case 12:
								var result = 'Up to three creatures you choose within 30 feet of you take 4d10 lightning damage.'
								break;

								case 13:
								var result = 'You immediately gain 20 temporary hit points.'
								break;

								case 14:
								var result = 'You teleport up to 60 feet to an unoccupied space that you can see'
								break;

								case 15:
								var result = 'You are the center of a silence spell for 1 minute.'
								break;

								case 16:
								var result = 'You are vulnerable to fiends for 1 hour. Such creatures gain advantage on attack rolls made against you.'
								break;

								case 17:
								var result = 'For the next day, any time you make an ability check, roll 1d6 and subtract the result.'
								break;

								case 18:
								var result = 'For any spell that requires a saving throw you cast within the next minute, the target gains advantage.'
								break;

								case 19:
								var result = 'The next single target spell you cast within the next minute must target one additional target.'
								break;

								case 20:
								var result = 'A demon whose CR is equal to your level appears near you. Make a Charisma saving throw against your spell save DC. If you make it, the demon is subservient, otherwise, it is hostile. The demon, if not banished or defeated, vanishes after 1 day.'
								break;

								case 21:
								var result = 'For the next minute, every creature within 60 feet of you that hears you speak only hears insults as if you are casting vicious mockery at first level.'
								break;

								case 22:
								var result = 'For the next day, you have advantage on the next 2d6 rolls you make where you dont already have advantage.'
								break;

								case 23:
								var result = 'You are protected from Aberrations for 1 day. Such creatures cannot attack you or harm you unless they save a Charisma saving throw against your spell save DC.'
								break;

								case 24:
								var result = 'For 1 minute, a duplicate of yourself appears in the nearest open space which can take actions independently, and goes on the same Initiative as you. However, any damage it takes as well as any spell slots or sorcery point it uses applies to you as well.'
								break;

								case 25:
								var result = 'A loud boom emanates from you. All creatures within 15 feet take 2d8 thunder damage and must make a Constitution saving throw against your spell save DC or be deafened for 1 minute.'
								break;

								case 26:
								var result = 'All creatures within 60 feet of you regain 2d8 hit points.'
								break;

								case 27:
								var result = 'You transform into a marble statue of yourself for 1 minute, during which time you are considered petrified.'
								break;

								case 28:
								var result = 'You are immune to disease for 1 week.'
								break;

								case 29:
								var result = 'You immediately drop to 0 hit points.	'
								break;

								case 30:
								var result = 'Make a Wisdom saving throw against your own spell save DC. If you fail, you are transformed into a raven for 1 minute, as if by a polymorph spell.'
								break;

								case 31:
								var result = 'You are protected from Beasts for 1 day. Such creatures cannot attack you or harm you unless they save a Charisma saving throw against your spell save DC.'
								break;

								case 32:
								var result = 'You transform into a stuffed toy resembling yourself for 1 minute, during which time you are considered petrified.'
								break;

								case 33:
								var result = 'You stand at the center a circular wall of fire with a radius of 15 feet. Any creature in any of the spaces covered by this fire must make a Dexterity saving throw against your spell DC or take 5d8 fire damage. The wall of fire remains for 1 minute.'
								break;

								case 34:
								var result = 'Choose 1 permanent or triggered effect that has happened to you or somebody else that you’ve received from this chart and remove it, even if it was beneficial.'
								break;

								case 35:
								var result = 'You are vulnerable to Beasts for 1 hour. Such creatures gain advantage when attacking you.'
								break;

								case 36:
								var result = 'You permanently lose the ability to smell. This sense can be restored with a spell that removes curses such as remove curse.'
								break;

								case 37:
								var result = 'You are vulnerable to Celestials for 1 hour. Such creatures gain advantage when attacking you.'
								break;

								case 38:
								var result = 'Make a Wisdom saving throw against your spell save DC. If you fail, you are transformed into a cat for 1 minute, as if by a {5e|Polymorph}} spell.'
								break;

								case 39:
								var result = 'You are vulnerable to Plants for 1 hour. Such creatures gain advantage when attacking you'
								break;

								case 40:
								var result = 'You gain the service of an arcane eye for 1 hour that does not require concentration.'
								break;

								case 41:
								var result = 'You are protected from Celestials for 1 day. Such creatures cannot attack you or harm you unless they succeed on a Charisma saving throw against your spell save DC.'
								break;

								case 42:
								var result = 'You transform into a medium-sized potted plant for 1 minute, during which time you are considered petrified.'
								break;

								case 43:
								var result = '3d6 random gems appear near you, worth 50gp each.'
								break;

								case 44:
								var result = 'All allies within 20 feet of you gain a +2 bonus to attack and damage rolls on any melee weapon attack they make within the next minute.'
								break;

								case 45:
								var result = 'For 2d6 days, you glow bright yellow. You have disadvantage on Stealth checks and anyone trying to perceive you has advantage on their Perception check.'
								break;

								case 46:
								var result = 'You stand at the center a circular wall of force with a radius of 15 feet. Any creature in any of the spaces covered by this wall must make a Dexterity saving throw against your spell DC or take 5d8 force damage. The wall remains for 1 minute.'
								break;

								case 47:
								var result = 'All creatures within 20 feet of you are knocked prone.'
								break;

								case 48:
								var result = 'You are vulnerable to Aberrations for 1 hour. Such creatures gain advantage when attacking you.'
								break;

								case 49:
								var result = 'For the next day, you are in the Border Ethereal near the location you were last in.'
								break;

								case 50:
								var result = 'All allies within 20 feet of you gain a +2 bonus to attack and damage rolls on any ranged weapon attack they make within the next minute.'
								break;

								case 51:
								var result = 'You are at the center of a 10-foot radius antimagic field that negates all magic equal to or less than your level for 1 hour and does not require concentration.'
								break;

								case 52:
								var result = 'Make a Wisdom saving throw against your spell save DC. If you fail, you are transformed into a wolf for 1 minute, as if by a polymorph spell.'
								break;

								case 53:
								var result = 'You are protected from Elementals for one day. Such creatures cannot attack you or harm you unless they succeed on a Charisma saving throw against your spell save DC.'
								break;

								case 54:
								var result = 'All of your hair permanently falls out. Only a spell such as remove curse can end this effect.'
								break;

								case 55:
								var result = 'You gain the ability to speak one new language of your choice. However, you lose the ability to speak one language you already know.'
								break;

								case 56:
								var result = 'A 30-foot cube hypnotic pattern appears with you at the center. All creatures within the pattern must succeed on a Wisdom saving throw or fall asleep for 1 minute or until they take damage.'
								break;

								case 57:
								var result = 'You permanently forget one cantrip. A spell such as remove curse can restore your memory.'
								break;

								case 58:
								var result = 'You immediately take 2d10 psychic damage.'
								break;

								case 59:
								var result = 'You are vulnerable to Undead for 1 hour. Such creatures gain advantage when attacking you'
								break;

								case 60:
								var result = 'You transform into an iron statue of yourself for 1 minute, during which time you are considered petrified.'
								break;

								case 61:
								var result = 'You gain an additional spell slot of your highest level for 1 week.'
								break;

								case 62:
								var result = 'If you die within the next minute, you come back to life as if by the reincarnate spell.'
								break;

								case 63:
								var result = 'You permanently gain one spell slot of one level below your highest-level spell slot, but lose one 1st-level spell slot. A spell such as remove curse can end this effect.'
								break;

								case 64:
								var result = 'All creatures that can perceive you must make a Wisdom saving throw against your spell save DC or be frightened of you.'
								break;

								case 65:
								var result = 'You are vulnerable to Elementals for 1 hour. Such creatures gain advantage when attacking you.'
								break;

								case 66:
								var result = 'You are protected from Fey for 1 day. Such ceatures cannot attack you or harm you unless they succeed on a Charisma saving throw against your spell save DC.'
								break;

								case 67:
								var result = 'You gain the service of an arcane sword that does not require concentration until your next short or long rest.'
								break;

								case 68:
								var result = 'You permanently gain one cantrip. A spell such as remove curse can end this effect.'
								break;

								case 69:
								var result = 'All allies within 20 feet of you get gain a -2 penalty on attack and damage rolls for any melee attack they make in the next minute.'
								break;

								case 70:
								var result = 'All allies within 20 feet of you heal up to 3d8 hit points.'
								break;

								case 71:
								var result = 'You lose the ability to see for 1 day. During this time, you have the blinded condition.'
								break;

								case 72:
								var result = 'You gain the service of a phantom steed for 1 week.'
								break;

								case 73:
								var result = 'Make a Constitution saving throw against your spell save DC. If you fail, you are stunned for 1 minute.'
								break;

								case 74:
								var result = 'You transform into a stone statue of yourself for 1 minute, during which time you are considered petrified.'
								break;

								case 75:
								var result = 'All creatures within 20 feet of you, including you, must make a Dexterity save against your spell save DC or be affected by a faerie fire spell.'
								break;

								case 76:
								var result = 'Permanently increase one ability score of your choice by 1 point. Permanently decrease a different ability score of your choice by 1 point. A spell such as remove curse can end this effect.'
								break;

								case 77:
								var result = 'You gain proficiency in one tool or weapon type you dont already have for 1 day.'
								break;

								case 78:
								var result = 'Make a Wisdom saving throw against your spell save DC. If you fail, you are transformed into a giant spider for 1 minute, as if by the polymorph spell.'
								break;

								case 79:
								var result = 'Gain the sympathy effects of the antipathy/sympathy spell for 3d6 days.'
								break;

								case 80:
								var result = 'You are protected from Fiends for one day. Such creatures cannot attack you or harm you unless they succeed on a Charisma saving throw against your spell save DC.'
								break;

								case 81:
								var result = 'All allies within 20 feet of you gain a -2 penalty to attack and damage rolls for any ranged attack they make within the next minute.'
								break;

								case 82:
								var result = 'For one minute, any spell with a casting time of 1 action can be cast as a bonus action.'
								break;

								case 83:
								var result = 'Make a Wisdom saving throw against your spell save DC. If you fail, you are transformed into a giant rabbit for 1 minute, as if by the polymorph'
								break;

								case 84:
								var result = 'The next time you cast a spell, do not roll on this chart.'
								break;

								case 85:
								var result = 'For the next day, you gain proficiency in all skills that you are not already proficient in.'
								break;

								case 86:
								var result = 'The next time you cast a spell, roll twice on this chart. Both effects will apply.'
								break;

								case 87:
								var result = 'You are vulnerable to Fey for 1 hour. Such creatures gain advantage when attacking you.'
								break;

								case 88:
								var result = 'You transform into an empty wooden chest for 1 minute, during which time you are considered petrified.'
								break;

								case 89:
								var result = 'Gain the antipathy effects of the antipathy/sympathy spell for 3d6 days.'
								break;

								case 90:
								var result = 'All creatures within 30 feet of you must make a Wisdom saving throw. Any creature immune to magical sleep automatically succeeds on its saving throw. Those that fail fall asleep for 1d6 minutes.'
								break;

								case 91:
								var result = 'You are protected from Plants for 1 day. Such creatures cannot attack you or harm you unless they succeed on a Charisma saving throw against your spell save DC.'
								break;

								case 92:
								var result = 'All your allies within 20 feet of you gain a +2 bonus to their AC for 1 minute.'
								break;

								case 93:
								var result = 'The next time you fall below 0 hit points within the next month, you automatically fail your first death saving throw.'
								break;

								case 94:
								var result = 'You gain two spell slots at your second-highest level for 1 week'
								break;

								case 95:
								var result = 'For the next day, any time you make an ability check, roll 1d6 and add the result.'
								break;

								case 96:
								var result = 'Make a Wisdom saving throw against your spell save DC. If you fail, you are transformed into a sheep for 1 minute, as if by the polymorph spell.'
								break;

								case 97:
								var result = 'All allies within 30 feet of you gain a -2 penalty to their AC for 1 minute'
								break;

								case 98:
								var result = 'You are protected from Undead for 1 day. Such creatures cannot attack you or harm you unless they succeed on a Charisma saving throw against your spell save DC.'
								break;

								case 99:
								var result = 'You jump forward in time exactly 1 minute, for 1 minute. From the perspective of everyone else, you cease to exist during that time.'
								break;

								case 100:
								var result = 'All spells you cast within the next minute automatically fail.'
								break;
							}
								bot.sendMessage({
								to: channelID,
								message: '**Extreme**\n' + result 
								})
							}
						else if (scale >= 4 && scale <= 9)
							{
								var roll = Math.floor(Math.random() * (101 - 1)) + 1;
								switch(roll)
								{
								case '1':
								var result = 'For the next day, your skin tone changes color every 30 minutes, cycling through the colors of the rainbow.'
								break;

								case 2:
								var result = 'You are confused for 1 minute, as though you were affected by the confusion spell.'
								break;

								case 3:
								var result = 'Your Strength is increased by 2 for 1 day.'
								break;

								case 4:
								var result = 'A third eye appears in your forehead, giving you advantage on sight-based Wisdom (Perception) checks for 1 minute.'
								break;

								case 5:
								var result = 'The next spell you cast within the next minute that does damage, the damage is maximized.'
								break;

								case 6:
								var result = 'For the next minute, you can teleport up to 20 feet as part of your movement on each of your turns.'
								break;

								case 7:
								var result = 'You become intoxicated for 2d6 hours.'
								break;

								case 8:
								var result = 'Your Intelligence is decreased by 2 for 1 day.'
								break;

								case 9:
								var result = 'Your Wisdom is increased by 2 for 1 day.'
								break;

								case 10:
								var result = 'For 1 minute, any flammable item you touch, that you arent already wearing or carrying, bursts into flame.'
								break;

								case 11:
								var result = 'Plants grow around you and you are restrained for 1 minute.'
								break;

								case 12:
								var result = 'A random creature within 30 feet of you gains a flying speed equal to its walking speed for 1 minute.'
								break;

								case 13:
								var result = 'You may immediately take 1 additional action.'
								break;

								case 14:
								var result = 'If you fall within the next day, you automatically have the benefit of the feather fall spell.'
								break;

								case 15:
								var result = 'You recover 1 expended spell slot of your choice.'
								break;

								case 16:
								var result = 'For the next spell you cast within 1 minute that does damage, the damage is minimized.'
								break;

								case 17:
								var result = 'You have are surrounded by a spectral shield for 1 minute, giving you a +2 bonus to your AC and immunity to magic missile.'
								break;

								case 18:
								var result = 'You and all creatures within 30 feet of you gain vulnerability to piercing damage for 1 minute.'
								break;

								case 19:
								var result = 'For 1 minute, you gain resistance to nonmagical bludgeoning, piercing, and slashing damage.'
								break;

								case 20:
								var result = 'You are protected from Elementals for 1 hour. Such creatures cannot attack you or harm you unless they succeed on a Charisma saving throw against your spell save DC.'
								break;

								case 21:
								var result = 'For the next minute, one creature of your choice gets a -2 penalty to its AC, attack rolls, and damage rolls.'
								break;

								case 22:
								var result = 'You and all creatures within 30 feet of you gain vulnerability to bludgeoning damage for 1 minute.'
								break;

								case 23:
								var result = 'You emanate light in a 30-foot radius for 1 minute. Any creature within 5 feet of you that can see is blinded until the end of its next.'
								break;

								case 24:
								var result = 'For the next hour, you gain advantage on Charisma checks when dealing with any creature wearing black, but disadvantage if they are wearing white. If they are wearing both, this doesnt apply.'
								break;

								case 25:
								var result = 'You are protected from Plants for 1 hour. Such creatures cannot attack you or harm you unless they succeed on a Charisma saving throw against your spell save DC.'

								break;

								case 26:
								var result = 'Your Intelligence is increased by 2 for 1 day.'

								break;

								case 27:
								var result = 'Within the next hour, you have advantage on the next roll you make where you dont already have advantage.'

								break;

								case 28:
								var result = 'You gain a +2 bonus to your AC for 1 minute.'

								break;

								case 29:
								var result = 'For the next minute, you are in the Border Ethereal near the location you were last in.'

								break;

								case 30:
								var result = 'For the next minute, you gain resistance to thunder and force damage.'

								break;

								case 31:
								var result = 'An imp appears within 30 feet of you. Make a Charisma saving throw against your spell save DC. If you succeed it, the imp is subservient, otherwise, it is hostile. The imp, if not banished or defeated, vanishes after 1 day.'

								break;

								case 32:
								var result = 'For the next minute, you gain resistance to fire and cold damage.'

								break;

								case 33:
								var result = 'For the next hour, you gain advantage on Charisma checks when dealing with any creature wearing red, but disadvantage if they are wearing green. If they are wearing both, this doesnt apply.'
								break;

								case 34:
								var result = 'You gain the service of an arcane eye for 1 minute that does not require concentration.'

								break;

								case 35:
								var result = 'You lose the ability to smell for 1 day.'

								break;

								case 36:
								var result = 'You gain a -2 penalty to your AC for 1 minute.'

								break;

								case 37:
								var result = 'You and all creatures within 30 feet of you gain vulnerability to necrotic damage for 1 minute.'

								break;

								case 38:
								var result = 'You become invisible and silent for 1 minute.'
								
								break;

								case 39:
								var result = 'Your Dexterity is increased by 2 for 1 day.'
								
								break;

								case 40:
								var result = 'You can detect the thoughts of 1 creature you can see within 30 feet of you for 1 minute.'
								
								break;

								case 41:
								var result = 'For the next minute, all melee attacks you make with a non-magical weapon gain a +1 bonus to hit and to damage, and are considered magical for the purpose of overcoming resistances.'
								
								break;

								case 42:
								var result = 'Your Strength is decreased by 2 for 1 hour.'
								
								break;

								case 43:
								var result = 'You gain freedom of movement for 1 day.'
								
								break;

								case 44:
								var result = 'Your Dexterity is decreased by 2 for 1 hour.'
								
								break;

								case 45:
								var result = 'You are affected by a faerie fire spell for 1 minute. You automatically fail the saving throw.'
								
								break;

								case 46:
								var result = 'You are protected from Beasts for 1 hour. Such creatures cannot attack you or harm you unless they succeed a Charisma saving throw against your spell save DC.'
								
								break;

								case 47:
								var result = '3d6 gold pieces appear near you.'
								
								break;

								case 48:
								var result = 'For 2d6 hours, you have a faint pink glow. Anyone trying to perceive you has advantage on their Perception check.'
								
								break;

								case 49:
								var result = 'You gain the ability to breath water for 1 day.'
								
								break;

								case 50:
								var result = 'You and all creatures within 30 feet of you gain vulnerability to slashing damage for 1 minute.'
								
								break;

								case 51:
								var result = 'For the next minute, light and darkness quickly alternate around you in a 30-foot radius, creating a strobe effect. Sight-based creatures gain a -1 penalty on attack rolls against you and Perception checks against you, and you gain a +1 bonus to Stealth checks.'
								
								break;

								case 52:
								var result = 'All creatures within 20 feet of you must make a Strength saving throw against your spell save DC or be knocked prone.'
								
								break;

								case 53:
								var result = 'You are protected from Undead for one hour. Such creatures cannot attack you or harm you unless they succeed on a Charisma saving throw against your spell save DC.'
								
								break;

								case 54:
								var result = 'For the next minute, you can pass through any solid, non-magical wall that is 6 or fewer inches thick.'
								
								break;

								case 55:
								var result = 'You are protected from Fiends for one hour. Such creatures cannot attack you or harm you unless they succeed on a Charisma save against your spell save DC.'
								
								break;

								case 56:
								var result = 'You permanently gain one 1st-level spell slot but forget one cantrip that you already know. A spell such as remove curse can end this effect.'
								
								break;

								case 57:
								var result = 'You immediately gain 15 temporary hit points.'
								
								break;

								case 58:
								var result = 'All gold you are carrying is now silver.'
								
								break;

								case 59:
								var result = 'For the next minute, you gain resistance to necrotic and radiant damage.'
								
								break;

								case 60:
								var result = 'You are at the center of a fog cloud spell which lasts for 1 minute.'
								
								break;

								case 61:
								var result = 'Your Charisma is increased by 2 for 1 day.'
								
								break;

								case 62:
								var result = 'You and all creatures within 30 feet of you gain vulnerability to lightning damage for 1 minute.'
								
								break;

								case 63:
								var result = 'You and all creatures within 30 feet of you gain vulnerability to force damage for 1 minute.'
								
								break;

								case 64:
								var result = 'For the next minute, any creature you touch takes 2d6 lightning damage.'
								
								break;

								case 65:
								var result = 'You gain blindsight with a radius of 60 feet for 1 minute.'
								
								break;

								case 66:
								var result = 'You are surrounded by a horrible, noxious odor for 1 minute. Anyone within 10 feet of you must make a Constitution saving throw or be stunned.'
								
								break;

								case 67:
								var result = 'Your Charisma is decreased by 2 for 1 hour.'
								
								break;

								case 68:
								var result = 'You gain the service of a phantom steed for 1 day.'
								
								break;

								case 69:
								var result = 'You and all creatures within 30 feet of you gain vulnerability to acid damage for 1 minute.'
								
								break;

								case 70:
								var result = 'Your Wisdom is decreased by 2 for 1 hour.'
								
								break;

								case 71:
								var result = 'Your speed is increased by 10 feet for 1 day.'
								
								break;

								case 72:
								var result = 'You gain the ability to walk on water for 1 day.'
								
								break;

								case 73:
								var result = 'You and all creatures within 30 feet of you gain vulnerability to psychic damage for 1 minute.'
								
								break;

								case 74:
								var result = 'One creature of your choice gets a +2 bonus to all attack rolls, damage rolls, and their armor class AC for 1 minute.'
								
								break;

								case 75:
								var result = 'You lose proficiency in one randomly chosen skill, tool, or weapon type for 2d6 days.'
								
								break;

								case 76:
								var result = 'All food and drink within 30 feet of you becomes putrid, spoiled, or rotten. Consuming this food deals 2d6 poison damage and causes the poisoned condition for 1 hour.'
								
								break;

								case 77:
								var result = 'All silver you are carrying is now copper.'
								
								break;

								case 78:
								var result = 'You and all creatures within 30 feet of you gain vulnerability to fire damage for 1 minute.'
								
								break;

								case 79:
								var result = 'You lose proficiency in all skill rolls for 1d4 hours'
								
								break;

								case 80:
								var result = 'You are protected from Fey for one hour. Such creatures cannot attack you or harm you unless they succeed on a Charisma saving throw against your spell save DC.'
								
								break;

								case 81:
								var result = 'For the next hour, any time you make an ability check, roll 1d6 and subtract the result.'
								
								break;

								case 82:
								var result = 'For the next minute, you gain resistance to poison and psychic damage.'
								
								break;

								case 83:
								var result = 'You’re feeling lucky. For the next hour, any time you make an ability check, roll 1d6 and add the result.'
								
								break;

								case 84:
								var result = 'You immediately take 2d6 psychic damage.'
								
								break;

								case 85:
								var result = 'You gain proficiency in one skill of your choice that youre not already proficient in for one hour.'
								
								break;

								case 86:
								var result = 'Your Constitution is increased by 2 for 1 day.'
								
								break;

								case 87:
								var result = 'You and all creatures within 30 feet of you gain vulnerability to thunder damage for 1 minute.'
								
								break;

								case 88:
								var result = 'You and all creatures within 30 feet of you gain vulnerability to cold damage for 1 minute.'
								
								break;

								case 89:
								var result = 'You gain the ability to speak one language of your choice for 1 day.'
								
								break;

								case 90:
								var result = 'You and all creatures within 30 feet of you gain vulnerability to radiant damage for 1 minute.'
								
								break;

								case 91:
								var result = 'You are protected from Celestials for 1 hour. Such creatures cannot attack you or harm you unless they succeed a on a Charisma saving throw against your spell save DC.'
								
								break;

								case 92:
								var result = 'For the next minute, you are unable to cast any spell that causes damage of any type.'
								
								break;

								case 93:
								var result = 'You gain spider climb for 1 minute, and it does not require concentration to maintain.'
								
								break;

								case 94:
								var result = 'You immediately lose all unspent sorcery points and may not regain them until you have finished a long rest.'
								
								break;

								case 95:
								var result = 'You and all creatures within 30 feet of you gain vulnerability to poison damage for 1 minute.'
								
								break;

								case 96:
								var result = 'You gain the ability to speak with animals for 1 day.'
								
								break;

								case 97:
								var result = 'All food and drink within 30 feet of you is purified.'
								
								break;

								case 98:
								var result = 'You are protected from Aberrations for 1 hour. Such creatures cannot attack you or harm you unless they succeed on a Charisma savinng throw against your spell save DC.'
								
								break;

								case 99:
								var result = 'All your clothing and equipment teleports to the nearest open space at least 15 feet from you that you can see.'
								
								break;

								case 100:
								var result = 'Your Constitution is decreased by 2 for 1 hour.'
								
								break;
							}
								bot.sendMessage({
								to: channelID,
								message: '**Moderate**\n' + result 
								})
								
							}
						else if (scale >= 10 && scale <= 20)
							{
								var roll = Math.floor(Math.random() * (101 - 1)) + 1;
								switch(roll)
								{
								case '1':
							var result = 'A puddle of grease appears where you are standing, with a 10-foot radius. You and anyone within 10 feet of you must make a Dexterity check at your spell save DC or fall prone.'
								break;

								case 2:
								var result = 'You levitate 6 inches off the ground for 1 minute.'
								
								break;

								case 3:
								var result = 'You gain tremorsense with a range of 30 feet for 1 minute.'
								
								break;

								case 4:
								var result = 'You make no sounds for 1 minute and you gain advantage on any Dexterity (Stealth) checks.'
								
								break;

								case 5:
								var result = 'You grow a beard made of feathers, which remains until you sneeze.'
								
								break;

								case 6:
								var result = 'You cant speak for 1 minute. When you try, pink bubbles float out of your mouth.'
								
								break;

								case 7:
								var result = 'You are immune to intoxication for the next 5d6 days.'
								
								break;

								case 8:
								var result = 'You recover your lowest-level expended spell slot.'
								
								break;

								case 9:
								var result = 'For the next minute, you must shout when you speak.'
								
								break;

								case 10:
								var result = 'Illusory butterflies and flower petals flutter in the air around you in a 10-foot radius for 1 minute.'
								
								break;

								case 11:
								var result = 'You cast mirror image on yourself, which lasts for 1 minute and does not require concentration.'
								
								break;

								case 12:
								var result = 'You are surrounded by faint, ethereal music for 1 minute.'
								
								break;

								case 13:
								var result = 'You regain all expended sorcery points.'
								
								break;

								case 14:
								var result = 'Your hair grows to double its current length over the next minute.'
								
								break;

								case 15:
								var result = 'Your hair falls out but grows back within 1 day.'
								
								break;

								case 16:
								var result = 'You gain the ability to speak one additional language of your choice for 1 hour.'
								
								break;

								case 17:
								var result = 'You are invisible for 1 minute.'
								
								break;

								case 18:
								var result = 'Your eyes permanently change color. If they are a blue or grey shade, they turn dark brown, or vice versa. A spell such as remove curse can end this effect.'
								
								break;

								case 19:
								var result = 'Small birds flutter and chirp in your vicinity for 1 minute, during which time you automatically fail any Stealth check.'
								
								break;

								case 20:
								var result = 'You feel the incredible urge to relieve yourself. Until you do, your Strength and Intelligence are reduced by 1. If you dont relieve yourself in the next 2 minutes, the above effects are removed, but your Charisma score is reduced by 4 for 1 hour or until you change your trousers.'
								
								break;

								case 21:
								var result = 'Gnats buzz around your head for 1 minute, distracting you. You must make a Constitution saving throw against your own spell save DC to cast any spell.'
								
								break;

								case 22:
								var result = 'You are surrounded by a faint, offensive odor for 1 minute. You gain disadvantage on all Charisma checks.'
								
								break;

								case 23:
								var result = 'For the next minute, all spells with a casting time of 1 action or 1 bonus action require 2 consecutive actions to cast.'
								
								break;

								case 24:
								var result = 'You have the irresistible urge to scratch an itch in the middle your back, just out of reach, for 1 minute. If you dont scratch it using a back scratcher or some similar device , you must succeed a Constitution saving throw against your spell save DC to cast a spell.'
								
								break;

								case 25:
								var result = 'You have a momentary vision of your own death. If you fail a Wisdom saving roll at your spell DC, you are frightened for 1 minute.'
								
								break;

								case 26:
								var result = 'Your Charisma is increased by 2 for 1 minute.'
								
								break;

								case 27:
								var result = 'Over the next minute, all plants within 20 feet of you grow as if affected by the plant growth spell when cast as an action.'
								
								break;

								case 28:
								var result = 'Your eyes glow red for 1 minute.'
								
								break;

								case 29:
								var result = 'Your Constitution is increased by 2 for 1 minute.'
								
								break;

								case 30:
								var result = 'You add your proficiency bonus to all Charisma checks for the next hour, if you dont already add it.'
								
								break;

								case 31:
								var result = 'Your spell components seem to have been rearranged. During the next hour, you must make an Intelligence check against your spell save DC to cast any spell that requires a material component.'
								
								break;

								case 32:
								var result = 'For the next minute, you have advantage on the next roll you make where you dont already have advantage.'
								
								break;

								case 33:
								var result = 'Every creature within 15 feet of you takes 1 necrotic damage. If you are wounded, you regain hit points up to the amount of damage dealt. If you are not wounded, you gain this amount of temporary hit points.'
								
								break;

								case 34:
								var result = 'A magic mouth appears on a nearby wall or flat surface. When you speak, your voice comes from the magic mouth. This lasts for 1 minute.'
								
								break;

								case 35:
								var result = 'You can hear exceptionally well for 1 minute, gaining advantage for all Perception checks related to sound.'
								
								break;

								case 36:
								var result = 'You lose the ability to smell for 1 hour.'
								
								break;

								case 37:
								var result = 'For the next day, each time you say a word with the "s" sound, it sounds like a hissing snake.'
								
								break;

								case 38:
								var result = 'A gentle gust of wind blows outward from you. All creatures within 40 feet of you can feel it, but it otherwise does nothing.'
								
								break;

								case 39:
								var result = 'Your Dexterity is increased by 2 for 1 minute.'
								
								break;

								case 40:
								var result = 'You immediately take 1d10 radiant damage.'
								
								break;

								case 41:
								var result = 'One randomly-chosen non-magical item in your possession that weighs 1 pound or less vanishes and is forever gone.'
								
								break;

								case 42:
								var result = 'Your Wisdom is increased by 2 for 1 minute.'
								
								break;

								case 43:
								var result = 'You immediately gain 10 temporary hit points.'
								
								break;

								case 44:
								var result = '3d6 silver pieces appear near you.'
								
								break;

								case 45:
								var result = 'You regain 5 hit points per round for 1 minute.'
								
								break;

								case 46:
								var result = 'An imp appears near you. Make a Charisma saving throw against your spell save DC. If you succeed, the imp is subservient, otherwise, it is hostile. The imp, if not banished or defeated, vanishes after 1 hour.'
								
								break;

								case 47:
								var result = 'Your speed is increased by 10 feet for 1 minute.'
								
								break;

								case 48:
								var result = 'You gain proficiency on all Strength checks for the next hour, if you don’t already have it.'
								
								break;

								case 49:
								var result = 'Your Intelligence is increased by 2 for 1 minute.'
								
								break;

								case 50:
								var result = 'One randomly-chosen non-magical item in your possession that weighs 1 pound or less is duplicated.'
								
								break;

								case 51:
								var result = 'Mushrooms sprout around you in a 5-foot radius and vanish after 1 minute. If one is harvested and eaten within this time, the creature must make a Constitution saving throw against your spell save DC. On a failed save, it takes 5d6 poison damage. On successful one, it gains 5d6 temporary hit points.'
								
								break;

								case 52:
								var result = 'You can smell exceptionally well for 1 minute, gaining blindsight with a radius of 10 feet and advantage on all Perception checks related to odor.'
								
								break;

								case 53:
								var result = 'Your feet sink into the ground, making you completely immobile for one minute. This has no effect if you were not standing on the ground when the spell was cast.'
								
								break;

								case 54:
								var result = 'One random gem worth 100gp appears near you.'
								
								break;

								case 55:
								var result = 'For the next minute, you have double vision. This gives you disadvantage on ranged attacks (including spell attacks) and Perception checks involving sight.'
								
								break;

								case 56:
								var result = 'You are surrounded by a faint, pleasant odor. You gain advantage on all Charisma checks you make within the next minute.'
								
								break;

								case 57:
								var result = 'You lose proficiency on all skill checks for 1 minute.'
								
								break;

								case 58:
								var result = 'You gain freedom of movement for 1 minute.'
								
								break;

								case 59:
								var result = 'You gain darkvision with a radius of 60 feet for 1 minute. If you already have darkvision, you lose it for 1 minute.'
								
								break;

								case 60:
								var result = 'Approximately 100 gallons of water appear over your head and those within 10 feet of you, evenly distributed above everybody within the radius.'
								
								break;

								case 61:
								var result = 'You gain a +1 to your AC for one minute.'
								
								break;

								case 62:
								var result = 'You fall victim to a horrible cramp in both legs, reducing your speed by 10 feet for 1 hour.'
								
								break;

								case 63:
								var result = 'The next spell you cast within the next hour uses a spell slot of one level lower than what it normally requires. If the spell is a spell of 1st level, you still must expend a spell slot to cast it.'
								
								break;

								case 64:
								var result = 'For the next hour, you are unable to read as the letters all appeared jumbled.'
								
								break;

								case 65:
								var result = 'For the next day, everything you say must rhyme. If it doesn’t, you take 1d6 psychic damage.'
								
								break;

								case 66:
								var result = 'During the next hour, you may re-roll any one save, attack roll, or skill check. If you do, you must take the new roll’s result.'
								
								break;

								case 67:
								var result = 'You grow 1d6 inches in height. You gradually return to your original height over the course of 1 day.'
								
								break;

								case 68:
								var result = 'You immediately take 2d4 psychic damage.'
								
								break;

								case 69:
								var result = 'For the next hour, any time you make an ability check, roll 1d4 and subtract the result.'
								
								break;

								case 70:
								var result = 'You gain the ability to speak with animals for one hour.'
								
								break;

								case 71:
								var result = 'You get gain a -1 penalty to your AC for 1 minute.'
								
								break;

								case 72:
								var result = 'You gain the use of an unseen servant for 1 hour.'
								
								break;

								case 73:
								var result = 'The next spell you cast within the hour uses a slot level one level higher than what it normally requires.'
								
								break;

								case 74:
								var result = 'A bad joke comes to mind and until you tell it (which takes an entire action), you suffer a Wisdom penalty of 1.'
								
								break;

								case 75:
								var result = 'You hear a ringing in your ears for 1 minute. During this time, casting a spell that requires a verbal component requires a Constitution check against your spell save DC.'
								
								break;

								case 76:
								var result = 'You lose 1d6x5 pounds. You gradually return to your original weight over the course of 1 day.'
								
								break;

								case 77:
								var result = 'Your clothes become dirty and filthy. Until you can change and/or clean your clothes, your Charisma is reduced by 1.'
								
								break;

								case 78:
								var result = 'You gain proficiency in Wisdom checks for the next hour, if you don’t already have it.'
								
								break;

								case 79:
								var result = 'You shrink 1d6 inches in height. You gradually return to your original height over the course of 1 day.'
								
								break;

								case 80:
								var result = 'Your skin permanently darkens as if you have a tan, or if you are already dark-skinned, your skin becomes one shade lighter. A spell such as remove curse can end this effect.'
								
								break;

								case 81:
								var result = 'For 1 minute, one creature of your choice within 30 feet of you gains a -1 penalty to attack rolls, damage rolls, and their AC.'
								
								break;

								case 82:
								var result = 'For the next hour, any time you make an ability check, roll 1d4 and add the result.'
								
								break;

								case 83:
								var result = 'If you cast a spell with a saving throw within the next minute, the target gainsdisadvantage on its saving throw.'
								
								break;

								case 84:
								var result = 'Your Strength is increased by 2 for 1 minute.'
								
								break;

								case 85:
								var result = 'One creature of your choice gains a +1 bonus to attack rolls, damage rolls, and its AC for 1 minute.'
								
								break;

								case 86:
								var result = 'You immediately heal 2d10 hit points.'
								
								break;

								case 87:
								var result = 'You gain proficiency on all Intelligence checks for the next hour, if you don’t already have it.'
								
								break;

								case 88:
								var result = 'The power of your magic is strong! For the next hour, any spell you cast does not require a verbal component.'
								
								break;

								case 89:
								var result = 'You gain 1d6x10 pounds. You gradually return to your original weight over the course of 1 day.'
								
								break;

								case 90:
								var result = 'You gain proficiency in all Dexterity checks for the next hour, if you don’t already have it.'
								
								break;

								case 91:
								var result = 'Your fingernails and toenails grow to an uncomfortable length. Until you trim them, your Dexterity is reduced by 1 and your speed is reduced by 5 feet, even if you’re not wearing shoes.'
								
								break;

								case 92:
								var result = 'You gain the effects of the blur spell for 1 minute, which does not require concentration to maintain.'
								
								break;

								case 93:
								var result = 'For the next hour, you appear to others to be the opposite gender.'
								
								break;

								case 94:
								var result = 'You gain the service of a 2nd-level spiritual weapon for 1 minute.'
								
								break;

								case 95:
								var result = 'The power of your magic is strong! For the next hour, any spell you cast does not require a somatic component.'
								
								break;

								case 96:
								var result = 'You gain proficiency in all Constitution checks for the next hour, if you don’t already have it.'
								
								break;

								case 97:
								var result = 'Every inanimate object that isnt being worn or carried within 40 feet of you becomes enshrouded with shadows for 1 minute. Enshrouded objects are considered heavily obscured.'
								
								break;

								case 98:
								var result = 'Your fingers become sore for 1 hour. During this time, you must succeed on a Dexterity saving throw against your spell save DC to cast a spell with a somatic component.'
								
								break;

								case 99:
								var result = 'You feel extremely nauseated. Make a Constitution saving throw against your spell save DC. If you fail, you must spend your next action throwing up.'
								
								break;

								case 100:
								var result = 'You immediately lose one unspent sorcery point.'
								
								break;
							}
								bot.sendMessage({
								to: channelID,
								message: '**Nuisance**\n' + result 
								})
								
							}
						else{
								bot.sendMessage({
								to: channelID,
								message: 'Bot Broke'
								})
								break;
							}
							break;

				}
			}
	
		});