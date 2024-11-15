import React, { useState } from 'react'
import { FixedSizeList as List } from 'react-window'
import styles from './users-list.module.css'

export const UsersList = ({ users, onClick, icon, hoverIcon }) => {
	const [hoveredIndex, setHoveredIndex] = useState(null) // индекс наведённого элемента

	// обработчик наведения мыши
	const onMouseEnter = index => {
		setHoveredIndex(index)
	}

	// обработчик ухода мыши
	const onMouseLeave = () => {
		setHoveredIndex(null)
	}

	return (
		<div className={styles.usersList}>
			<List height={366} itemCount={users.length} itemSize={33} width={526}>
				{({ index, style }) => {
					const user = users[index]
					return (
						<li className={styles.userItem} key={user.number} style={style}>
							<span>{user.name}</span>
							<button
								onClick={() => onClick(user)}
								onMouseEnter={() => onMouseEnter(index)}
								onMouseLeave={onMouseLeave}
							>
								<img src={hoveredIndex === index ? hoverIcon : icon} alt="button" />
							</button>
						</li>
					)
				}}
			</List>
		</div>
	)
}
