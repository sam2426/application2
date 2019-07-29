import { Injectable } from '@angular/core';

import io from 'socket.io-client';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from '../../node_modules/rxjs';
import { CookieService } from 'ngx-cookie-service';

// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = 'https://chatapi.edwisor.com';
  private socket;

  constructor(public http:HttpClient, public cookie:CookieService) { 
    this.socket=io(this.url); // connection is being created. i.e the handshake is happening here.
  }

  //events to be listened.
  public verifyUser=()=>{
    return Observable.create((observer)=>{
      this.socket.on('verifyUser',(data)=>{
        observer.next(data);
      }); // end of socket
    }) // end of observable
  }// end of online user list

  public onlineUserList=()=>{
    return Observable.create((observer)=>{
      this.socket.on("online-user-list", (userList)=>{
        observer.next(userList);
      }); // end of socket
    }); // end of observable
  }// end online Userlist

  public disconnectedSocket=()=>{
    return Observable.create((observer)=>{
      this.socket.on("disconnect", ()=>{
        observer.next();
      });//end of socket
    });//end of observable
  }//end of disconnected sockets.
  //end of events to be listened.

  // events to be emitted.

  public setUser=(authToken)=>{
    this.socket.emit("set-user",authToken);
  }//end setUser
  //events to be emitted

  public markChatAsSeen=(userDetails)=>{
    this.socket.emit('mark-chat-as-seen', userDetails);
  }//end marChatAsSeen
//end of emit methods

//chat related items
public getChat(senderId, receiverId, skip):Observable<any>{
  return this.http.get(`${this.url}/api/v1/chat/get/for/user?senderId=${senderId}&receiverId=${receiverId}&skip=${skip}&authToken=${this.cookie.get('authToken')}`)
  // .do(data => console.log('Data Received'))
  // .catch(this.handleError);
}

public SendChatMessage = (chatMsgObject) => {

  this.socket.emit('chat-msg', chatMsgObject);

} // end getChatMessage

public chatByUserId = (userId) => {

  return Observable.create((observer) => {
    
    this.socket.on(userId, (data) => {

      observer.next(data);

    }); // end Socket

  }); // end Observable

} // end chatByUserId

  private handleError(err:HttpErrorResponse){
    let errorMessage='';

    if (err.error instanceof Error) {

    } else {

    }//end condition of if

    console.error(errorMessage);
    return Observable.throw(errorMessage);
  }//end of handleError.

  public exitSocket = () =>{
    this.socket.disconnect();
  }// end exit socket
}
