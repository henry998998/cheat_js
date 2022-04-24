//add @機器人    加入
//remove ＠機器人     剔除

const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token: `xoxb-1486136655410-1486345404115-BJG0N6CBfhQ4MTZbZAqsAZ5q`,
    name: 'inspirenuggets'
})

bot.on('start', () => {
    const params = {
    	username: '廣播',
        icon_emoji: ':robot_face:'
    }

    bot.postMessageToChannel(
        'random',
        'Get inspired while working with @inspirenuggets',
        params
    );
})

bot.on('message', (data) => {

	switch (data.text){
		case '123':
			bot._api('chat.postMessage', {
		        	username: '廣播',
		        	text:'112',
		        	channel: "#general",
		        	icon_emoji: ':robot_face:'
		        });
			break;
		case '456':
			bot.postMessageToChannel(
		        'random',
		        '445',
		        {icon_emoji: ':robot_face:'}
		    );
			break;
		case '789':
			bot.postMessageToChannel(
		        'random',
		        '779',
		        {icon_emoji: ':robot_face:'}
		    );
			break;
	}

	return;

	console.log(data)
    if(data.type !== 'message') {
        return;
    }

    handleMessage(data.text);
})

function handleMessage(message) {
	const params = {
        icon_emoji: ':robot_face:'
    }


    if(message.includes(' inspire me')) {
    	bot.postMessageToChannel(
	        'random',
	        message,
	        params
	    );
    } else if(message.includes(' random joke')) {
        randomJoke()
    } else if(message.includes(' help')) {
        runHelp()
    }
}