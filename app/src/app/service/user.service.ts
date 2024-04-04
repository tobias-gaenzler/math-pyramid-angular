import { Injectable } from '@angular/core';
import { Config, names, uniqueNamesGenerator } from "unique-names-generator"
import { WebsocketService } from './web-socket.service';

const config: Config = { dictionaries: [names] }

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userName: string = "";

    getUserName(): string {
        if (this.userName !== "") {
            return this.userName
        }
        const userNameForLocalStorage = localStorage.getItem("userName")
        if (userNameForLocalStorage === undefined || userNameForLocalStorage === null) {
            const newUserName = uniqueNamesGenerator(config)
            this.setUserName(newUserName)
            console.log("creating new username: " + newUserName)
            localStorage.setItem("userName", JSON.stringify(newUserName))
        } else {
            console.log(`Use username from local storage: ${userNameForLocalStorage}`)
            this.setUserName(JSON.parse(userNameForLocalStorage))
        }
        return this.userName;
    }

    setUserName(newUserName: string): void {
        this.userName = newUserName
        localStorage.setItem("userName", JSON.stringify(newUserName))
    }
}