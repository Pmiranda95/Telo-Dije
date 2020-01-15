import React, {Component} from 'react'
import {Launcher} from 'react-chatbot-window'
import {connect} from 'react-redux';
import {sendMessage} from './chat'
import './chat.css'

class Demo extends Component {
 
  constructor() {
    super();
    this.state = {
      messageList: []
    };
  }
 
  _onMessageWasSent(message) {
      console.log('_onmessagewasent'+message.data.text);
      this.props.sendMessage(message.data.text);
      console.log(this.props.feed);
    this.setState({
      messageList: [...this.state.messageList, message]
    })
    
  }
 
  _sendMessage(text) {
      console.log('sendMensagge'+text);
    if (text.length > 0) {
      this.setState({
        messageList: [...this.state.messageList, {
          author: 'them',
          type: 'text',
          data: { text }
        }]
      })
    }
  }
 
  render() {
    return (<div>
      <Launcher
        agentProfile={{
          imageUrl: 'https://gladynamics.blob.core.windows.net/imgpublic/logo-andreani-bn.png'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
        showEmoji
      />
    </div>)
  }
}

const mapStateToProps = state=> ({
    feed:state
  })

export default connect(mapStateToProps,{sendMessage}) (Demo);