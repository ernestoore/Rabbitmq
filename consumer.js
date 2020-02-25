
//Promise Library
const amqp = require("amqplib");

connect()

async function connect (){
    try{
        const connection = await  amqp.connect("amqp://localhost:5672");
        //Create the channel
        const channel = await connection.createChannel();
        //Publish to a queue. 
        //assertQueue makes sure that a queue exists.
        const result = await channel.assertQueue("jobs");
        
        //Consume the queue
        channel.consume("jobs", message => {
            const input = JSON.parse(message.content.toString())
            console.log(`Received job with input ${input.number}`)

            //We have to acknowledge that we have recieved the message
            channel.ackAll()
        })
        


        //Keep the consumer alive. Listeninng
        console.log("Listening...")
        


    }catch(ex){
        console.log(ex)
    }
}