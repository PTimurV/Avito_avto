import React from 'react'
import { Avatar, Dropdown, Menu, Button } from 'antd'
import {
	UserOutlined,
	SettingOutlined,
	LogoutOutlined,
	ProfileOutlined,
	StarOutlined,
	HistoryOutlined,
	LikeOutlined,
} from '@ant-design/icons'
import { User } from '../../types'
import { useNavigate } from 'react-router-dom'
import './Profile.css'

interface ProfileProps {
	user: User
	onLogout: () => void
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
	const navigate = useNavigate()

	const handleMenuClick = (e: any) => {
		if (e.key === 'settings') {
			navigate('/settings')
		} else if (e.key === 'logout') {
			onLogout()
		} else if (e.key === 'profile') {
			navigate(`/profile/${user.id}`)
		} else if (e.key === 'favorites') {
			navigate('/favorites')
		} else if (e.key === 'view-history') {
			navigate('/view-history')
		} else if (e.key === 'recommendations') {
			navigate('/recommendations')
		}
	}

	const menuItems = [
		{
			key: 'profile',
			icon: <ProfileOutlined />,
			label: 'Профиль',
		},
		{
			key: 'settings',
			icon: <SettingOutlined />,
			label: 'Настройки',
		},
		{
			key: 'favorites',
			icon: <StarOutlined />,
			label: 'Избранное',
		},
		{
			key: 'view-history',
			icon: <HistoryOutlined />,
			label: 'История посещений',
		},
		{
			key: 'recommendations',
			icon: <LikeOutlined />,
			label: 'Рекомендации',
		},
		{
			key: 'logout',
			icon: <LogoutOutlined />,
			label: 'Выйти',
			onClick: onLogout,
		},
	]

	const menu = <Menu items={menuItems} onClick={handleMenuClick} />

	return (
		<Dropdown overlay={menu} trigger={['click']}>
			<Button type='link' className='profile-button'>
				<Avatar icon={<UserOutlined />} />
				<span className='profile-name'>{`${user.name} ${user.surname}`}</span>
			</Button>
		</Dropdown>
	)
}

export default Profile
