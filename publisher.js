
//Promise Library
const amqp = require("amqplib");

const msg = {number: process.argv[2]}

connect()

async function connect (){
    try{
        const connection = await  amqp.connect("amqp://localhost:5672");
        //Create the channel
        const channel = await connection.createChannel();
        //Publish to a queue. 
        //assertQueue makes sure that a queue exists.
        const result = await channel.assertQueue("jobs");
        //Send  toQueue
        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
        console.log(`Job sent successfully ${msg.number}`);
    }catch(ex){
        console.log(ex)
    }
}


