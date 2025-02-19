import styles from './ArticleParamsForm.module.scss';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Separator } from 'src/ui/separator/Separator';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import * as constants from '../../constants/articleProps';
import { useState, useRef, SyntheticEvent } from 'react';
type TArticleParamsForm = {
	onChange: (options: constants.ArticleStateType) => void;
};
export const ArticleParamsForm = (props: TArticleParamsForm) => {
	const { onChange } = props;
	const refAside = useRef<HTMLDivElement | null>(null);

	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(constants.defaultArticleState);

	const handleToggleSideBar = () => {
		setIsOpen(!isOpen);
	};

	const handleChange = (name: string, select: constants.OptionType) => {
		setFormState({ ...formState, [name]: select });
	};

	const handleFormSubmit = (event: SyntheticEvent) => {
		event.preventDefault();
		onChange(formState);
	};

	const handleFormClear = () => {
		setFormState(constants.defaultArticleState);
		onChange(constants.defaultArticleState);
	};
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggleSideBar} />
			<aside
				className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
				ref={refAside}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Select
						selected={formState.fontFamilyOption}
						options={constants.fontFamilyOptions}
						title='Шрифт'
						onChange={(select) => handleChange('fontFamilyOption', select)}
					/>
					<RadioGroup
						selected={formState.fontSizeOption}
						name='fontSizeOption'
						options={constants.fontSizeOptions}
						title='Размер шрифта'
						onChange={(select) => handleChange('fontSizeOption', select)}
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
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
