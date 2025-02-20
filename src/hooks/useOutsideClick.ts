import { useEffect, RefObject } from 'react';
type TUseOutsideClickProps = {
	isOpen: boolean;
	ref: RefObject<HTMLElement>;
	onClose: () => void;
};

const useOutsideClick = (props: TUseOutsideClickProps) => {
	const { isOpen, ref, onClose } = props;

	const handleCloseSidebarOutiside = (event: MouseEvent) => {
		const { target } = event;
		if (ref.current && target instanceof Node && ref.current.contains(target)) {
			onClose();
			console.log('outside', isOpen);
		}
	};
	useEffect(() => {
		document.addEventListener('mousedown', handleCloseSidebarOutiside);
		return () => {
			document.removeEventListener('mousedown', handleCloseSidebarOutiside);
		};
	}, [isOpen, onClose, ref]);
};

export default useOutsideClick;
