import React from 'react'
import { Avatar, Dropdown, Menu, Button } from 'antd'
import {
	UserOutlined,
	SettingOutlined,
	LogoutOutlined,
} from '@ant-design/icons'
import { User } from '../../types'
import './Profile.css'

interface ProfileProps {
	user: User
	onLogout: () => void
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
	const menuItems = [
		{
			key: 'settings',
			icon: <SettingOutlined />,
			label: 'Настройки',
		},
		{
			key: 'logout',
			icon: <LogoutOutlined />,
			label: 'Выйти',
			onClick: onLogout,
		},
	]

	const menu = <Menu items={menuItems} />

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
