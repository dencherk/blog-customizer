import { useEffect } from 'react';

export const useOutsideClick = (
	ref: React.RefObject<HTMLElement> | null,
	callback: () => void,
	isActive: boolean
) => {
	useEffect(() => {
		if (!isActive || !ref?.current) return; // Останавливаем эффект, если форма закрыта или ref отсутствует

		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref, callback, isActive]); // Эффект пересчитывается только при изменении зависимости isActive
};
