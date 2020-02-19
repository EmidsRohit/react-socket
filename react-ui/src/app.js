import React from 'react'
// import { hot } from 'react-hot-loader/root'
import { Provider } from 'react-redux'
import { store } from './store'
import Layout from './containers/Layout'
import 'bootstrap/dist/css/bootstrap.min.css'
import io from 'socket.io-client'
const configureStore = store()
class App extends React.Component {
    constructor() {
        super()
        this.state = {
            response: false,
            endpoint: 'http://127.0.0.1:4001',
        }
    }
    componentDidMount() {
        this.initSocketConnection()
    }
    initSocketConnection() {
        const SOCKET_URI = this.state.endpoint
        this.socket = io.connect(SOCKET_URI)
        this.setupSocketListeners()
    }
    setupSocketListeners() {
        this.socket.on('message', this.onMessageRecieved.bind(this))
        this.socket.on('disconnect', this.onClientDisconnected.bind(this))
    }
    onMessageRecieved(msg) {
        this.setState({ response: msg })
        console.log(msg)
    }

    onClientDisconnected() {
        console.log('disconnected')
    }

    render() {
        const { response } = this.state
        console.log(response)
        return (
            <Provider store={configureStore}>
                <Layout></Layout>
            </Provider>
        )
    }
}

export default App
