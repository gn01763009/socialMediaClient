import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import { fade, makeStyles } from '@material-ui/core/styles'
import theme from '../theme'
const BootstrapButton = withStyles({
	root: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			padding: '10px 41px',
			display: 'flex',
			cursor: 'pointer',
			lineHeight: 1.5,
			margin: '2px 5px',
			borderRadius: '10px',
			'&.MuiButton-root': {
				color: fade(theme.palette.common.white, 0.8),
			},
			'&:hover': {
				backgroundColor: fade(theme.palette.common.white, 0.15),
				borderColor: '#0062cc',
				boxShadow: 'none',
			},
			'&:focus': {
				borderRadius: '0',
				boxShadow: '0 5px 0 #2e81f4',
				'&.MuiButton-root': {
					color: '#2e81f4',
				},
			},
		},
	},
})(Button)

export default ({ children, tip, tipClassName }) => {
	return (
		<Tooltip title={tip} className={tipClassName} placement='top'>
			<BootstrapButton disableRipple>{children}</BootstrapButton>
		</Tooltip>
	)
}
