import {ApiAiClient} from 'api-ai-javascript' 
import{applyMiddleware,createStore}from 'redux';

const accessToken = '91506332ee83450294170ac12e9ea9a3';
const client = new ApiAiClient({accessToken});
const ON_MESSAGE = 'ON_MESSAGE';

export const sendMessage = (text, author='me',type='text') => ({
    type:ON_MESSAGE,
    payload:{author,type,data:{text:text}}
})

const messageMiddleware = ()=> next => action => {
    next(action);
    if(action.type === ON_MESSAGE){
        const {text} = action.payload;
        client.textRequest(action.payload.data.text)
            .then(onSuccess)
            function onSuccess(response){
               const {result:{fulfillment}} = response;
                next(sendMessage(fulfillment.speech,'then'));
            }
    }
};

const messaggeReducer = (state=[],action) => {
    switch(action.type){
        case ON_MESSAGE:
            console.log(action.payload);
            return [...state,action.payload];
        
        default:
            return state;
    }

};

export const store = createStore(messaggeReducer,applyMiddleware(messageMiddleware));