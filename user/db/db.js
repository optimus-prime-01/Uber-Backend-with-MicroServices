<<<<<<< HEAD
const mongoose=require('mongoose');

function connect(){
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log('User service connected to MongoDB');
    }).catch(err=>{
=======
const mongoose = require('mongoose');


function connect() {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log('User service connected to MongoDB');
    }).catch(err => {
>>>>>>> 374bf39a8641b682ab76b942e923016d92b2399c
        console.log(err);
    });
}

<<<<<<< HEAD
module.exports=connect;
=======

module.exports = connect;
>>>>>>> 374bf39a8641b682ab76b942e923016d92b2399c
