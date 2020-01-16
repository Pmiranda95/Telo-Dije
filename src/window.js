import React, {Component} from 'react'
import {Launcher} from 'react-chatbot-window'
import {connect} from 'react-redux';
import {sendMessage} from './chat'
import TestArea from './TestArea'
import './chat.css'

class Demo extends Component {
 
  constructor() {
    super();
    this.state = {
      messageList: [],
      newMessagesCount: 0,
      isOpen: false,
      contador:0
    };
  }
 
  


  _onMessageWasSent = (message) => {
   this._sendMessage(message.data.text);
  }

  
 
  _sendMessage = (text) =>{
    console.log('_sendMessage'+'recibo el mensaje');
    
    const newMessagesCount = this.state.isOpen ? this.state.newMessagesCount : this.state.newMessagesCount + 1;
    if (text.length > 0) { 
      
     
        this.setState({
        newMessagesCount: newMessagesCount,
        messageList: [...this.state.messageList, {
          author: 'them',
          type: 'text',
          data: { text:'respuesta de  '+this.state.contador++ }
        }]
      },this.props.sendMessage(text));
      console.log(this.state.messageList);
    }
  }

  _handleClick() {
    this.setState({
      isOpen: !this.state.isOpen,
      newMessagesCount: 0
    });
  }
 
  render() {
    return (
    <div>
      <Launcher
        agentProfile={{
          imageUrl: 'https://gladynamics.blob.core.windows.net/imgpublic/logo-andreani-bn.png'
        }}
        onMessageWasSent={this._onMessageWasSent}
        messageList={this.props.feed}
        newMessagesCount={this.state.newMessagesCount}
        handleClick={this._handleClick.bind(this)}
        isOpen={this.state.isOpen}
        showEmoji
      />
    </div>)
  }
}

const mapStateToProps = state=> ({
    feed:state
  })

export default connect(mapStateToProps,{sendMessage}) (Demo);