const User = require('../model/userModel');
const bcrypt = require('bcrypt');
module.exports.register = async (req, res, next) => {

    console.log(req.body);
    try { 
        console.log("Inside the controller");
        const { firstname, lastname, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const emailCheck = await User.findOne({ email: email });

        if (emailCheck) return res.status(400).json({ message: 'Email already exists'});
        
        const user = await User.create({ firstname, lastname, email, password: hashedPassword });
        delete user.password;
        
        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(201).json({ user: userWithoutPassword });
       
    } catch (error) {
        res.status(400).json({ message: error.message });
        next(error)
    }
};

module.exports.login = async (req, res, next) => {

    console.log(req.body);
    try { 
        console.log("Inside the login controller");
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ message: 'Incorrect Email!!!'});
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Incorrect Password!!!'});
        delete user.password;

        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(201).json({ user: userWithoutPassword });
       
    } catch (error) {
        res.status(400).json({ message: error.message });
        next(error)
    }
};


module.exports.setAvatar = async (req, res, next) => {
    try {
        console.log("Inside the setAvatar controller");
        const { id } = req.params;          // Extract the user ID from request parameters
        const { image } = req.body;         // Extract the image from request body
        const user = await User.findByIdAndUpdate(id, { avatar: image, isAvatar: true }, { new: true });

        if (!user) {
            return res.status(400).json({ message: 'User not found!!!' });
        }

        res.status(201).json({ avatar: user.avatar });
    } catch (error) {
        res.status(400).json({ message: error.message });
        next(error);
    }
}


module.exports.getAllUsers = async (req, res, next) => {
    try {
        console.log("Inside the getAllUsers controller");
        console.log(req.params.id);
        const users = await User.find({ _id: {$ne: req.params.id} }).select(["email", "firstname", "lastname", "avatar", "_id"]);       // { _id: {$ne: req.params.id} } it work as filter to get all users except the current user
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
        next(error);
    }

};