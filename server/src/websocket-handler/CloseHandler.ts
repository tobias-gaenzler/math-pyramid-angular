import { UserManager } from '../user/UserManager';
import ws from 'ws';

export class CloseHandler {
    private userManager: UserManager;

    constructor(userManager: UserManager) {
        this.userManager = userManager;
    }

    handleClose(socket: ws, exitCode: number): void {
        const user = this.userManager.getUser(socket);
        if (user) {
            console.info(`User ${user.toString()} is leaving the game with code: ${exitCode}`);
            this.userManager.deleteUser(socket);
        } else {
            console.warn(`No user found for socket. Exit code: ${exitCode}`);
        }
    }
}
