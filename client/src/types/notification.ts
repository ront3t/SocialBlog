import {IUser as User} from './user';


export interface INotification {
	_id:string,
	from:User,
	to:User,
	type:string,
	read:boolean,
}