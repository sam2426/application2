//definition for chat interface, its like an contract where a function implementing this have to follow this format of data.

export interface chatMessage{
    chatId?:string,                 // ? denotes that this is optional.
    message:string,
    createdOn:Date,
    receiverId:string,
    receiverName:string,
    senderId:string,
    senderName:string
}