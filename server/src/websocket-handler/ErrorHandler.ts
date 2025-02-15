import { UserManager } from '../user/UserManager';
import ws from 'ws';

export class ErrorHandler {
    private userManager: UserManager;

    constructor(userManager: UserManager) {
        this.userManager = userManager;
    }

    handleError(socket: ws, error: Error): void {
        const user = this.userManager.getUser(socket);
        console.error(`Deleting user ${user?.toString()} due to error: ${error.message}`);
        this.userManager.deleteUser(socket);
    }
}