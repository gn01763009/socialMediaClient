import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import { fade } from '@material-ui/core/styles'
import theme from '../theme'
import { Typography } from '@material-ui/core'
const BootstrapButton = withStyles({
	root: {
		// padding: '3px 90px',
		display: 'flex',
		cursor: 'pointer',
		lineHeight: 1.5,
		margin: '2px 5px',
		borderRadius: '5px',
		transition: 'unset',
		width: '100%',
		textTransform: 'capitalize',
		'&.MuiButton-root': {
			color: fade(theme.palette.common.white, 0.8),
		},
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.15),
		},
		'&:active': {
			padding: '-1px',
			margin: '+1px',
		},
	},
})(Button)

export default ({ children, onClick, tip, tipClassName, title }) => {
	const withoutTip = tip ? (
		<Tooltip title={tip} className={tipClassName} placement='top'>
			<BootstrapButton onClick={onClick} disableRipple>
				{children}
				<Typography>{title}</Typography>
			</BootstrapButton>
		</Tooltip>
	) : (
		<BootstrapButton onClick={onClick} className={tipClassName} disableRipple>
			{children}
			<Typography>{title}</Typography>
		</BootstrapButton>
	)
	return withoutTip
}
