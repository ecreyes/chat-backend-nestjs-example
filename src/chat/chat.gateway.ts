import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { Room } from './chat.types';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private chatService: ChatService) {}

  handleConnection(client: Socket, ...args: any[]) {
    console.log('cliente conectado!', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('cliente desconectado!', client.id);
  }

  @SubscribeMessage('roomConnection')
  roomConnection(client: Socket, room: Room) {
    client.join(room);

    const roomMessages = this.chatService.getMessagesByRoom(room);
    this.server.to(client.id).emit('roomMessagesList', roomMessages);
  }

  @SubscribeMessage('roomMessage')
  roomMessage(
    client: Socket,
    { message, room }: { message: string; room: Room },
  ) {
    this.chatService.addMessage(room, message);
    this.server.to(room).emit('newMessage', message);
  }

  @SubscribeMessage('roomDisconnect')
  roomDisconnect(client: Socket, room: Room) {
    client.leave(room);
  }
}
