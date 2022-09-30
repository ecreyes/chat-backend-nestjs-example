import { Injectable } from '@nestjs/common';
import { Room } from './chat.types';

@Injectable()
export class ChatService {
  private _typescriptMessages: string[] = [];
  private _javascriptMessages: string[] = [];
  private _reactMessages: string[] = [];

  constructor() {
    //
  }

  public addMessage(room: Room, message: string): void {
    if (room === 'typescript') {
      this._typescriptMessages.push(message);
    }

    if (room === 'javascript') {
      this._javascriptMessages.push(message);
    }

    if (room === 'react') {
      this._reactMessages.push(message);
    }
  }

  public getMessagesByRoom(room: Room): string[] {
    if (room === 'typescript') {
      return this._typescriptMessages;
    }

    if (room === 'javascript') {
      return this._javascriptMessages;
    }

    if (room === 'react') {
      return this._reactMessages;
    }
  }
}
