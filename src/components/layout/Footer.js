import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles, withStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	footer: {
		backgroundColor: theme.palette.primary.light,
		paddingTop: '10vh',
		paddingBottom: '10vh',
		display: 'flex',
		justifyContent: 'center',
	},
	root: {
		display: 'flex',
		justifyContent: 'center',
	},
	link: {
		color: theme.palette.common.white,
	},
}))

export default ({ footerClassName }) => {
	const classes = useStyles()
	return (
		<Grid item xs={12} className={classes.footer}>
			<Grid item xs={4} className={classes.root}>
				<Typography
					className={footerClassName}
					variant='body2'
					color='secondary'
					align='center'
				>
					{'Copyright © '}
					<a
						color='inherit'
						href='https://www.reggie.life/'
						target='_blank'
						rel='noopener noreferrer'
						className={classes.link}
					>
						Reggie.Life
					</a>{' '}
					{new Date().getFullYear()}
					{'.'}
				</Typography>
			</Grid>
		</Grid>
	)
}
