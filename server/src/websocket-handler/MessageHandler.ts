import { UserManager } from '../user/UserManager';
import ws, { RawData } from 'ws';
import { Instance } from 'express-ws';
import { MathPyramidFactory } from '../math-pyramid/MathPyramidFactory';

const mathPyramidFactory = new MathPyramidFactory();

export class MessageHandler {
    private userManager: UserManager;
    private expressWebSocketServer: Instance;

    constructor(userManager: UserManager, expressWebSocketServer: Instance) {
        this.userManager = userManager;
        this.expressWebSocketServer = expressWebSocketServer;
    }

    handleMessage(socket: ws, rawMessage: RawData): void {
        let data;
        console.log(`Received message: ${rawMessage}`);
        try {
            data = JSON.parse(rawMessage.toString());
        } catch (error) {
            console.error(`Failed to parse message: ${rawMessage}`, error);
            return;
        }

        const dataAsJson = JSON.stringify(rawMessage);
        const userName = this.userManager.getUser(socket)?.name;
        console.log(`[${new Date().toISOString()}]: Received message: ${dataAsJson} from ${userName}`);

        switch (data.action) {
            case 'username': {
                this.userManager.setUserName(socket, data.sender);
                console.log(`Setting new user name ${data.sender} for connection ${userName}`);
                break;
            }
            case 'start': {
                console.log(`Received start event: ${dataAsJson} from ${userName}`);
                const gameMessage = JSON.stringify(mathPyramidFactory.getNewGameData(data.data));
                this.broadcastMessage(gameMessage);
                break;
            }
            case 'message': {
                console.log(`Sending message to all users: ${dataAsJson}`);
                this.broadcastMessage(JSON.stringify(data));
                break;
            }
            default: {
                console.error(`Received unknown event: ${data.action}`);
                throw new Error(`Received unknown event: ${data.action}`);
            }
        }
    }

    broadcastMessage(message: string): void {
        this.expressWebSocketServer.getWss().clients.forEach((client) => {
            client.send(message);
        });
    }
}