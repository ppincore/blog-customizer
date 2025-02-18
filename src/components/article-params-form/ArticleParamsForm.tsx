import styles from './ArticleParamsForm.module.scss';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Separator } from 'src/ui/separator/Separator';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import * as constants from '../../constants/articleProps';
import { useState, useRef, SyntheticEvent } from 'react';

export const ArticleParamsForm = () => {
	const refAside = useRef<HTMLDivElement | null>(null);
	const initialState = {
		fontFamily: constants.defaultArticleState.fontFamilyOption,
		fontSize: constants.defaultArticleState.fontSizeOption,
		fontColor: constants.defaultArticleState.fontColor,
		backgroundColor: constants.defaultArticleState.backgroundColor,
		contentWidth: constants.defaultArticleState.contentWidth,
	};
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState({ ...initialState });
	const handleToggleSideBar = () => {
		setIsOpen(!isOpen);
	};

	const handleChange = (name: string, select: constants.OptionType) => {
		setFormState({ ...formState, [name]: select });
	};

	const handleFormSubmit = () => {
		console.log(formState);
	};

	const handleFormClear = () => {
		setFormState(initialState);
	};
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggleSideBar} />
			<aside
				className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
				ref={refAside}>
				<form
					className={styles.form}
					onSubmit={(event: SyntheticEvent) => {
						event.preventDefault();
					}}>
					<Select
						selected={formState.fontFamily}
						options={constants.fontFamilyOptions}
						title='Шрифт'
						onChange={(select) => handleChange('fontFamily', select)}
					/>
					<RadioGroup
						selected={formState.fontSize}
						name='fontSize'
						options={constants.fontSizeOptions}
						title='Размер шрифта'
						onChange={(select) => handleChange('fontSize', select)}
					/>
					<Select
						selected={formState.fontColor}
						options={constants.fontColors}
						title='Цвет шрифта'
						onChange={(select) => handleChange('fontColor', select)}
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={constants.backgroundColors}
						title='Цвет фона'
						onChange={(select) => handleChange('backgroundColor', select)}
					/>
					<Select
						selected={formState.contentWidth}
						options={constants.contentWidthArr}
						title='Ширина контента'
						onChange={(select) => handleChange('contentWidth', select)}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleFormClear}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={handleFormSubmit}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
