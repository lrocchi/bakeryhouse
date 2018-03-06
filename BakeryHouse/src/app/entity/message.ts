import { User } from './user';
import { Store } from './store';

export class Message {
  public _id: string;
  public to: User;
  public from: User;
  public subject: string;
  public message: string;
  public htmlmessage: string;
  public unread: boolean;
  public type: messageType;
  public store: Store;
  public create_on: string = Date.now().toString();

  constructor() {}

}

export enum messageType {
  info,
  warning,
  alert
}
