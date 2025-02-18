import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef } from 'react';

export const ArticleParamsForm = () => {
	const refAside = useRef<HTMLDivElement | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const handleToggleSideBar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggleSideBar} />
			<aside
				className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
				ref={refAside}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
