import { User } from './User';
import ws from 'ws';


export class UserManager {
    private socketToUsers: Map<ws, User>;

    constructor() {
        this.socketToUsers = new Map<ws, User>();
    }

    getUser(socket: ws): User | undefined {
        return this.socketToUsers.get(socket);
    }

    addUser(socket: ws, id: string): void {
        this.socketToUsers.set(socket, new User(id, ''));
    }

    setUserName(socket: ws, userName: string) {
        const user = this.getUser(socket);
        if (user) {
            user.name = userName;
        } else {
            throw new Error(`Cannot find user ${userName}, client: ${JSON.stringify(socket)}`);
        }
    }

    deleteUser(socket: ws) {
        this.socketToUsers.delete(socket);
    }
}