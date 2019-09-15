export const debounce = (func: () => void, wait: number) => {
    let timeout: any;
    
	return () => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
            timeout = null;

            func();
        }, wait);
	};
};