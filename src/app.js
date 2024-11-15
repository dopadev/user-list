import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { UsersList, Search } from './components'
import styles from './app.module.css'

import addIcon from './img/icons/add.svg'
import addHoverIcon from './img/icons/add-hover.svg'
import deleteIcon from './img/icons/delete.svg'
import deleteHoverIcon from './img/icons/delete-hover.svg'

export const App = () => {
	const [users, setUsers] = useState([]) // список пользователей
	const [addedUsers, setAddedUsers] = useState([]) // список добавленных пользователей
	const [searchPhraseUsers, setSearchPhraseUsers] = useState('') // поисковая фраза для списка пользователей
	const [searchPhraseAddedUsers, setSearchPhraseAddedUsers] = useState('') // поисковая фраза для списка добавленных пользователей

	// получение списка пользователей
	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get(
					'https://functions.yandexcloud.net/d4eeuj2f233m9qk3afon',
				)
				setUsers(data) // установка состояния списка пользователей
			} catch (error) {
				console.error('Ошибка при получении данных:', error)
			}
		}
		fetchData()
	}, [])

	// поиск пользователей по поисковой фразе
	const handleSearchUsers = useCallback(({ target }) => {
		setSearchPhraseUsers(target.value)
	}, [])

	// поиск добавленных пользователей по поисковой фразе
	const handleSearchAddedUsers = useCallback(({ target }) => {
		setSearchPhraseAddedUsers(target.value)
	}, [])

	// добавление пользователя
	const onAdd = user => {
		setUsers(users.filter(u => u.number !== user.number))
		setAddedUsers([...addedUsers, user])
	}

	// удаление пользователя
	const onRemove = user => {
		setAddedUsers(addedUsers.filter(u => u.number !== user.number))
		setUsers([...users, user])
	}

	// фильтрация списка пользователей по поисковой фразе
	const filteredUsers = users.filter(user =>
		user.name.toLowerCase().includes(searchPhraseUsers.toLowerCase()),
	)

	// фильтрация списка добавленных пользователей по поисковой фразе
	const filteredAddedUsers = addedUsers.filter(user =>
		user.name.toLowerCase().includes(searchPhraseAddedUsers.toLowerCase()),
	)

	return (
		<div className={styles.app}>
			<div className={styles.users}>
				<h1>Пользователи</h1>
				<Search searchPhrase={searchPhraseUsers} onChange={handleSearchUsers} />
				<UsersList
					users={searchPhraseUsers.length >= 3 ? filteredUsers : users}
					onClick={onAdd}
					icon={addIcon}
					hoverIcon={addHoverIcon}
				/>
			</div>

			<div className={styles.users}>
				<h1>Добавленные пользователи</h1>
				<Search
					searchPhrase={searchPhraseAddedUsers}
					onChange={handleSearchAddedUsers}
				/>
				<UsersList
					users={
						searchPhraseAddedUsers.length >= 3 ? filteredAddedUsers : addedUsers
					}
					onClick={onRemove}
					icon={deleteIcon}
					hoverIcon={deleteHoverIcon}
				/>
			</div>
		</div>
	)
}
