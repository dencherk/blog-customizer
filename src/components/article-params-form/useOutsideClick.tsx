import { useEffect } from 'react';

export const useOutsideClick = (
	ref: React.RefObject<HTMLElement>,
	callback: () => void,
	active: boolean
) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				active &&
				ref.current &&
				!ref.current.contains(event.target as Node)
			) {
				callback();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref, callback, active]);
};
