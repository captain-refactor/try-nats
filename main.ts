import {Client, connect, Payload} from 'ts-nats';

async function start() {
    let nc: Client = await connect({servers: ["localhost:4222"], payload: Payload.JSON});
    await nc.subscribe("test", (err, msg) => {
        console.log(msg.data.message);
        nc.publish(msg.reply!, {message: "ok"})
    }, {max: 1});
    let result = await nc.request("test", 1000, {message: "Hello"});
    console.log(result.data.message);
}

start().catch(console.error);
