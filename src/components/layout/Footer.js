import React from 'react'
import Typography from '@material-ui/core/Typography'

export default ({ footerClassName }) => {
	return (
		<Typography
			className={footerClassName}
			variant='body2'
			color='textSecondary'
			align='center'
		>
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
