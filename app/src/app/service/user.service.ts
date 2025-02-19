import { Injectable } from '@angular/core';
import { Config, names, uniqueNamesGenerator } from 'unique-names-generator';

const config: Config = { dictionaries: [names] };

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userName: string;

    constructor() {
        this.userName = this.loadUserName();
    }

    getUserName(): string {
        return this.userName;
    }

    setUserName(newUserName: string): void {
        this.userName = newUserName;
        localStorage.setItem('userName', JSON.stringify(newUserName));
    }

    private loadUserName(): string {
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            console.log(`Use username from local storage: ${storedUserName}`);
            return JSON.parse(storedUserName);
        } else {
            const newUserName = uniqueNamesGenerator(config);
            console.log('Creating new username: ' + newUserName);
            localStorage.setItem('userName', JSON.stringify(newUserName));
            return newUserName;
        }
    }
}