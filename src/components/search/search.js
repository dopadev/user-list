import React from 'react'
import styles from './search.module.css'

export const Search = ({ searchPhrase, onChange }) => {
	return (
		<div className={styles.search}>
			<input
				type="text"
				value={searchPhrase}
				onChange={onChange}
				placeholder="Поиск"
			/>
		</div>
	)
}
