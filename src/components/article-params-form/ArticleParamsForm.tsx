import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { FormEvent, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { useOutsideClick } from './useOutsideClick';

import styles from './ArticleParamsForm.module.scss';

type TArticleProps = {
	articleState: ArticleStateType; // Добавьте это
	setArticleState: (value: ArticleStateType) => void;
	resetButton: () => void;
	submitButton: (event: FormEvent) => void;
};

export const ArticleParamsForm = ({ setArticleState }: TArticleProps) => {
	// Состояние для управления открытием и закрытием сайдбара
	const [isOpen, setIsOpen] = useState<boolean>(false);
	// Ссылка на форму для определения кликов вне сайдбара
	const formRef = useRef<HTMLFormElement | null>(null);
	// Состояние текущих настроек статьи
	const [articleSettings, setArticleSettings] =
		useState<ArticleStateType>(defaultArticleState);

	// Хук для обработки кликов вне сайдбара
	useOutsideClick(formRef, () => setIsOpen(false), isOpen);

	// Универсальный обработчик изменений состояния
	const updateSetting = (key: keyof ArticleStateType, value: OptionType) => {
		setArticleSettings({ ...articleSettings, [key]: value });
	};

	// Функция обработки отправки формы
	const submitForm = (event: FormEvent) => {
		event.preventDefault(); // Предотвращает перезагрузку страницы
		setArticleState(articleSettings); // Передает настройки в родительский компонент
	};

	// Функция сбросанастроек к значениям по умолчанию
	const resetForm = () => {
		setArticleSettings(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	return (
		<>
			{/* Кнопка открытия/закрытия сайдбара */}
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			{/* Сайдбар с настройками */}
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					ref={formRef}
					className={styles.form}
					onSubmit={submitForm}
					onReset={resetForm}>
					{/* Заголовок формы */}
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					{/* Выбор шрифта */}
					<Select
						selected={articleSettings.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value) => updateSetting('fontFamilyOption', value)}
						title='Шрифт'
					/>
					{/* Выбор размера шрифта */}
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={articleSettings.fontSizeOption}
						onChange={(value) => updateSetting('fontSizeOption', value)}
						title='Размер шрифта'
					/>
					{/* Выбор цвета шрифта */}
					<Select
						selected={articleSettings.fontColor}
						options={fontColors}
						onChange={(value) => updateSetting('fontColor', value)}
						title='Цвет шрифта'
					/>
					<Separator />
					{/* Выбор цвета фона */}
					<Select
						selected={articleSettings.backgroundColor}
						options={backgroundColors}
						onChange={(value) => updateSetting('backgroundColor', value)}
						title='Цвет фона'
					/>
					{/* Выбор ширины контента */}
					<Select
						selected={articleSettings.contentWidth}
						options={contentWidthArr}
						onChange={(value) => updateSetting('contentWidth', value)}
						title='Ширина контента'
					/>
					{/* Кнопки сброса и применения настроек */}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
