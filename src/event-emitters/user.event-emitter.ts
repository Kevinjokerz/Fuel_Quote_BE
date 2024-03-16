import {EventEmitter} from "events"


class UserEventEmitter extends EventEmitter{
    constructor() {
        super();
        this.onEventUserCreated();
    }

    onEventUserCreated() {
        this.on('user:created', data => {
            console.log("fdsfjhas", "dfasfdasd");
        })

        this.on('user:created', data => {
            console.log("vailon3|||");
        })
    }

    emitEventUserCreated (data : any){
        this.emit('user:created', data);
    }
}

const userEventEmitter = new UserEventEmitter();
export {userEventEmitter};