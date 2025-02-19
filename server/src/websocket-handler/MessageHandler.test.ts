import { UserManager } from '../user/UserManager';
import type ws from 'ws';
import { MessageHandler } from './MessageHandler';
import expressWs = require('express-ws')
import express from 'express';
import { RawData } from 'ws';

describe('MessageHandler', () => {

    let wsMock: jest.MockedObject<ws>;
    let userManager: UserManager;
    let messageHandler: MessageHandler;

    beforeEach(() => {
        userManager = new UserManager();
        wsMock = {} as jest.MockedObject<ws>;
        userManager.addUser(wsMock, '1');
        messageHandler = new MessageHandler(userManager, expressWs(express()));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('handleMessage should set username on action username', () => {
        // Arrange
        const setUserNameSpy = jest.spyOn(userManager, 'setUserName');
        const rawMessage: RawData = Buffer.from(JSON.stringify({ action: 'username', sender: 'John' }));

        // Act
        messageHandler.handleMessage(wsMock, rawMessage);

        // Assert
        expect(setUserNameSpy).toHaveBeenCalledWith(wsMock, 'John');
    });

    test('handleMessage should throw error for unknown action', () => {
        // Arrange
        const rawMessage: RawData = Buffer.from(JSON.stringify({ action: 'unknown', sender: 'John' }));

        // Act & Assert
        expect(() => messageHandler.handleMessage(wsMock, rawMessage)).toThrow('Received unknown event: unknown');
    });

    test('handleMessage should broadcast game data on action start', () => {
        // Arrange
        const broadcastSpy = jest.spyOn(messageHandler as any, 'broadcastMessage');
        const rawMessage: RawData = Buffer.from(JSON.stringify({ action: 'start', data: { size: '3', maxValue: '10' } }));

        // Act
        messageHandler.handleMessage(wsMock, rawMessage);

        // Assert
        expect(broadcastSpy).toHaveBeenCalledWith(
            expect.stringContaining("\"solutionValues\":[1,1,1,2,2,4]")
        )
    });
});
