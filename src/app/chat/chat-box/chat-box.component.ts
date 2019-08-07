import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from '../../app.service';
import { SocketService } from '../../socket.service';
import { ToastrService } from 'node_modules/ngx-toastr';
import { CookieService } from 'node_modules/ngx-cookie-service';
import { Router } from 'node_modules/@angular/router';
import { chatMessage } from './chat';


@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
  providers: [SocketService]
})
export class ChatBoxComponent implements OnInit {

  @ViewChild('scrollMe', {read: ElementRef, static:false})
  public scrollMe:ElementRef;
  


  public authToken:any;
  public userInfo:any;
  public userList:any=[];
  public messageText: any; 
  public receiverId:any;
  public receiverName:any;
  public pageValue: number = 0;
  public messageList: any = []; // stores the current message list display in chat box
  public previousChatList: any = [];
  public disconnectedSocket:boolean;
  public scrollToChatTop:boolean= false;
  public loadingPreviousChat: boolean = false;

  constructor(
    public appService:AppService,
    public socket:SocketService,
    public toastr:ToastrService,
    public cookies:CookieService,
    public router:Router,
  ) { 
    this.receiverId=cookies.get('receiverId');
    this.receiverName=cookies.get('receiverName');

  }

  ngOnInit() {

    this.authToken=this.cookies.get('authToken');
    this.userInfo=this.appService.getUserInfoFromLocalStorage();

    if(this.receiverId!=null && this.receiverId!=undefined && this.receiverId!=""){
      this.userSelectedToChat(this.receiverId,this.receiverName);
    }
    this.checkStatus();
    this.verifyUserConfirmation();
    this.getOnlineUserList();
    this.getMessageFromAUser();
  }

  public checkStatus:any=()=>{
    if(this.cookies.get('authToken')===undefined || this.cookies.get('authToken')==='' || this.cookies.get('authToken')===null){
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }

  public verifyUserConfirmation:any=()=>{
    this.socket.verifyUser().subscribe((data)=>{
      this.disconnectedSocket=false;
      this.socket.setUser(this.authToken);
      this.getOnlineUserList();
    });
  }

  public getOnlineUserList:any=()=>{
    this.socket.onlineUserList().subscribe((userList)=>{
      this.userList=[];
      for(let x in userList){
        let temp={'userId':x,
                  'name':userList[x],
                  'unread':0,
                  'chatting':false
                };
                this.userList.push(temp);
      }
      console.log(this.userList);
    })
  }

  public sendMessageUsingKeypress:any=(event:any)=>{
    if(event.keyCode===13){
      this.sendMessage();
    }
  }

  public sendMessage:any=()=>{
    if(this.messageText){
      let chatMsgObject:chatMessage={
        senderName: this.userInfo.firstName + " " + this.userInfo.lastName,
        senderId: this.userInfo.userId,
        receiverName: this.cookies.get('receiverName'),
        receiverId: this.cookies.get('receiverId'),
        message: this.messageText,
        createdOn: new Date()
      }
      console.log(chatMsgObject);
      this.socket.SendChatMessage(chatMsgObject);
      this.pushToChatWindow(chatMsgObject);
    }
    else{
      this.toastr.warning('text message can not be empty');
    }
  }

  public pushToChatWindow:any=(data)=>{
    this.messageText="";
    this.messageList.push(data);
    this.scrollToChatTop=false;
  }

  public getMessageFromAUser:any=()=>{
    this.socket.chatByUserId(this.userInfo.userId).subscribe((data)=>{
      (this.receiverId==data.senderId)?this.messageList.push(data):'';
      this.toastr.success(`${data.senderName} says : ${data.message}`);
      this.scrollToChatTop=false;
    });
  }

  public userSelectedToChat:any=(id,name)=>{
    console.log("setting user as active")
    this.userList.map((user)=>{
      if(user.userId==id){
        user.chatting=true;
      }else{
        user.chatting=false;
      }
    });
    this.cookies.set('receiverId',id);
    this.cookies.set('receiverName', name);
    this.receiverId=id;
    this.receiverName=name;
    this.messageList=[];
    this.pageValue=0;
    let chatDetails={
      userId:this.userInfo.userId,
      senderId:id
    }
    this.socket.markChatAsSeen(chatDetails);
    this.getPreviousChatWithAUser();
  }//end userBtnClick function

  public getPreviousChatWithAUser:any=()=>{
    let previousData=(this.messageList.length>0 ? this.messageList.slice() : [] );
    this.socket.getChat(this.userInfo.userId,this.receiverId,this.pageValue*10).subscribe((apiResponse)=>{
      console.log(apiResponse);
      if(apiResponse.status===200){
        this.messageList==apiResponse.data.concat(previousData);
      }else{
        this.messageList=previousData;
        this.toastr.warning('No Messages Availbale');
      }
    },(err) => {
      this.toastr.error('some error occured')
    });
  }// end get previous chat with any user

  public loadEarlierPageOfChat:any=()=>{
    this.loadingPreviousChat=true;
    this.pageValue++;
    this.scrollToChatTop=true;
    this.getPreviousChatWithAUser();
  }//end of loadPreviousChat

  public logout: any = () => {

    this.appService.logout()
      .subscribe((apiResponse) => {

        if (apiResponse.status === 200) {
          console.log("logout called")
          this.cookies.delete('authtoken');

          this.cookies.delete('receiverId');

          this.cookies.delete('receiverName');

          this.socket.exitSocket()

          this.router.navigate(['/']);

        } else {
          this.toastr.error(apiResponse.message)
        } // end condition

      }, (err) => {
        this.toastr.error('some error occured')
      });

  } // end logout

  //handling output from child componenet
  public showUserName=(name:string)=>{
    this.toastr.success("You are chatting with " + name);
  }

}
