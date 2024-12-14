import { createRoot } from 'react-dom/client';
import { StrictMode, useState, FormEvent } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Состояние настроек статьи
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	// Функция сброса настроек
	const handleReset = () => {
		setArticleState(defaultArticleState);
	};

	// Функция применения настроек (пока она не делает дополнительных действий)
	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		// Настройки уже обновлены в articleState
	};

	// CSS-переменные для применения стилей
	const cssVariables = {
		'--font-family': articleState.fontFamilyOption.value,
		'--font-size': articleState.fontSizeOption.value,
		'--font-color': articleState.fontColor.value,
		'--container-width': articleState.contentWidth.value,
		'--bg-color': articleState.backgroundColor.value,
	} as Record<string, string>;

	return (
		<main className={clsx(styles.main)} style={cssVariables}>
			<ArticleParamsForm
				articleState={articleState}
				setArticleState={setArticleState}
				resetButton={handleReset}
				submitButton={handleSubmit}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
