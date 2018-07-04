import { Schema, arrayOf } from 'normalizr';

export const User = new Schema('Users');
export const allUsers = arrayOf(User);

export const Client = new Schema('Clients');
export const allClients = arrayOf(Client);