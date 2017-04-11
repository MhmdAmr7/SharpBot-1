var giphy = require('giphy-api')();

exports.run = (bot, msg, args) => {
    if (args.length < 1) {
        throw 'You must provide something to search for!';
    }

    msg.edit(':arrows_counterclockwise:').then(() => {
        giphy.random(`${args.join(' ')}`, function (err, res) {
            if (err) {
                return msg.error(err);
            }

            if (!res.data.url) {
                return msg.error('No results found!');
            }

            var key = res.data.url.substr(res.data.url.lastIndexOf('-') + 1);
            var url = `https://media.giphy.com/media/${key}/giphy.gif`;

            msg.channel.sendFile(url).then(() => msg.delete()).catch(msg.error);
        });
    });
};

exports.info = {
    name: 'gif',
    usage: 'gif <query>',
    description: 'Searches Giphy for GIFs'
};
