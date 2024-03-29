const messageModel = require("../model/messageModel");

module.exports.addMessages = async (req, res, next) => {
    try {
        const { from, to, message, isAvatar, avatar } = req.body;
        const data = await messageModel.create({ 
            message: {
                text: message
            },
            users: [from, to],
            sender: from,
            isAvatar: isAvatar,
            avatar: avatar,
        });
        if (!data) {
            return res.status(400).json({ msg: 'Message not sent!!!' });
        }
        res.status(201).json({ message: data, msg: "Message sent successfully" });

    } catch (error) {
        res.status(400).json({ message: error.message });
        next(error);
    }

}

module.exports.getMessages = async (req, res, next) => {
    try {
        const {from, to} = req.body;
        const messages = await messageModel.find({users: { $all: [from, to] }}).sort({updatedAt: 1});
        const projectionMessages = messages.map(msg => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
                sender: msg.sender,
                createdAt: msg.createdAt,
                isAvatar: msg.isAvatar,
                avatar: msg.avatar,
            }
        });
        res.status(200).json(projectionMessages);
    } catch (error) {
        next(error);
    }
}