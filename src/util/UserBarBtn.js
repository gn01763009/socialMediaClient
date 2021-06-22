import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import { fade } from '@material-ui/core/styles'
import theme from '../theme'
import withStyles from '@material-ui/core/styles/withStyles'
import { IconButton } from '@material-ui/core'
const UserBarBtn = withStyles({
	root: {
		display: 'none',
		[theme.breakpoints.up('lg')]: {
			display: 'flex',
			borderRadius: '99em',
			padding: 6,
			margin: 5,
			backgroundColor: fade(theme.palette.common.white, 0.15),
			'& .MuiButtonBase-root': {
				backgroundColor: fade(theme.palette.common.white, 0.25),
			},
			'& .MuiSvgIcon-root': {
				color: fade(theme.palette.common.white, 1),
			},
			'&:hover': {
				backgroundColor: fade(theme.palette.common.white, 0.3),
				borderColor: '#0062cc',
				boxShadow: 'none',
			},
			'&:focus': {
				'& .MuiSvgIcon-root': {
					color: fade('#2e81f4', 1),
				},
				backgroundColor: fade('#2e81f4', 0.15),
			},
		},
	},
})(IconButton)

export default ({ children, onClick, tip, btnClassName, tipClassName }) => {
	return (
		<Tooltip title={tip} className={tipClassName} placement='top'>
			<UserBarBtn onClick={onClick} className={btnClassName} disableRipple>
				{children}
			</UserBarBtn>
		</Tooltip>
	)
}
