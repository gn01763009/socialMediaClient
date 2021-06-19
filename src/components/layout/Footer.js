import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'

class Footer extends Component {
	render() {
		return <Copyright />
	}
}

function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			<a
				color='inherit'
				href='https://www.reggie.life/'
				target='_blank'
				rel='noopener noreferrer'
			>
				Reggie.Life
			</a>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	)
}

export default Footer
