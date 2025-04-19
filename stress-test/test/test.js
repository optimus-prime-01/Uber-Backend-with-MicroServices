const autocannon=require('autocannon');
const url='http://localhost:3000';
const duration = 30;

const instance=autocannon({
   url,
   duration
},(err,result)=>{
   if(err){
       console.log('Error: ',err);
   }else{
       console.log('Number of requests:',result.requests.total);
       console.log('Duration (seconds): ',result.duration.total);
   }
});

autocannon.track(instance);

//Here we are testing the load of the server running at localhost:3000



//1 terminal-->npx nodemon app.js
//2 terminal-->node test.js

