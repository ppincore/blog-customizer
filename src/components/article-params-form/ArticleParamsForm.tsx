import styles from './ArticleParamsForm.module.scss';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Separator } from 'src/ui/separator/Separator';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	defaultArticleState,
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from '../../constants/articleProps';
import { useState, useRef, FormEvent } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';

type TArticleParamsForm = {
	articleState: ArticleStateType;
	setArticleState: (options: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setArticleState,
	articleState,
}: TArticleParamsForm) => {
	const refAside = useRef<HTMLDivElement | null>(null);

	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(articleState);

	const handleToggleSideBar = () => {
		setIsOpen(!isOpen);
	};
	const handleChange = (name: keyof ArticleStateType, select: OptionType) => {
		setFormState({ ...formState, [name]: select });
	};

	const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArticleState(formState);
	};

	const handleFormClear = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen,
		rootRef: refAside,
		onChange: () => handleChange,
		onClose: handleToggleSideBar,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggleSideBar} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen, // Добавит container_open, если isOpen === true
				})}
				ref={refAside}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormClear}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(select) => handleChange('fontFamilyOption', select)}
					/>
					<RadioGroup
						selected={formState.fontSizeOption}
						name='fontSizeOption'
						options={fontSizeOptions}
						title='Размер шрифта'
						onChange={(select) => handleChange('fontSizeOption', select)}
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(select) => handleChange('fontColor', select)}
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(select) => handleChange('backgroundColor', select)}
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(select) => handleChange('contentWidth', select)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
