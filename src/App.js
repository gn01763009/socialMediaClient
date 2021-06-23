import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'
import jwtDecode from 'jwt-decode'

// Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENTICATED } from './redux/types'
import { getUserData, logoutUser } from './redux/actions/userAction'
import AuthRoute from './util/AuthRoute'

// Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Pages
import home from './pages/home'
import signin from './pages/signin'
import signup from './pages/signup'
import user from './pages/user'
import axios from 'axios'
axios.defaults.baseURL =
	'https://asia-southeast1-socialmedia-cea22.cloudfunctions.net/api'
const token = localStorage.FBIdToken
if (token) {
	const decodedToken = jwtDecode(token)
	if (decodedToken.exp * 1000 < Date.now()) {
		store.dispatch(logoutUser())
		window.location.href = '/signin'
	} else {
		store.dispatch({ type: SET_AUTHENTICATED })
		axios.defaults.headers.common['Authorization'] = token
		store.dispatch(getUserData())
	}
}
class App extends Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<Router>
						<Navbar />
						<div className='container'>
							<Switch>
								<Route exact path='/' component={home} />
								<AuthRoute exact path='/signin' component={signin} />
								<AuthRoute exact path='/signup' component={signup} />
								<Route exact path='/users/:handle' component={user} />
								<Route
									exact
									path='/users/:handle/scream/:screamId'
									component={user}
								/>
							</Switch>
						</div>
					</Router>
				</Provider>
			</ThemeProvider>
		)
	}
}

export default App
