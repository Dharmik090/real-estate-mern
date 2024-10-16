const User = require("../models/User");
const bcrypt = require('bcryptjs');
const { createSecretToken } = require("../util/secretToken");


const addUser = async (req,res) => {
    const { firstname,lastname,email,username,password } = req.body;

    try{
        const existingUserEmail = await User.findOne({ email });
        const existingUserUsername = await User.findOne({ username });

        if(existingUserEmail){
            return res.status(400).json({ message : 'Email already exist' });
        }
        else if(existingUserUsername){
            return res.status(400).json({ message : 'Username already exist' });
        }
        
        const hashPassword = await bcrypt.hash(password, 10);
        
        const user = new User({ firstname,lastname,email,username, password: hashPassword });
        await user.save();
        res.status(201).json({ message : 'User created successfully'});
    }
    catch(err){
        res.status(500).json({ message : 'Server Error : ' + err});
    }
}


const userLogIn = async (req,res) => {
    const { email, password } = req.body;
    
    try{
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json({ message : 'Email does not exist'});
        }
        
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return res.status(400).json({ message : 'Invalid Password' });
        }

        const token = createSecretToken(user);
        res.json({ token, userId: user._id});
    }
    catch(err) {
        res.status(500).json({ message : 'Server Error : ' + err});
    }
}


const getUserByUserId = async (req,res) => {
    const userid = req.params.userid;

    try{
        const user = await User.findById(userid);
        if(!user){
            return res.status(404).json({ message : 'User not found'});
        }

        res.json(user);
    }
    catch(err){
        res.status(500).json({ message : 'Server Error : ' + err })
    }
}


const getAllUsers = async (req,res) => {
    try{
        const users = await User.find();
        res.json(users);
    }
    catch(err){
        res.send("ERROR : " + err);
    }
}


// Flutter 
const getUserByUsername = async (req,res) => {
    const username = req.params.username;
    
    try{
        const user = await User.find({username: username});
        res.status(200).send(user);
    }
    catch(err){
        res.send("ERROR : " + err)
    }
}

const updateUser = async (req,res) => {
      const id = req.params.userid;
      
      try{
          const user = await User.FindByIdAndUpdate(id,req.body);
          if(!user){
            return res.status(404).json({ message :'User nor found'});
          }
          res.json(user);
      }catch(e){
        res.send("Error: "+err);
      }
}

const deleteUserById = async (req,res) => {
    const id = req.params.userid;
    try{
        const user = await User.DeleteOne({_id:id});
        if(!user){
            return res.status(404).json({ message : `User with id ${id} not found` });
        }
        res.json({message : `User deleted successfully`});
    }catch(e){
        res.send("Error : "+ e);
    }
    
}

module.exports = {
    addUser,
    getUserByUserId,
    getUserByUsername,
    getAllUsers,
    userLogIn
}