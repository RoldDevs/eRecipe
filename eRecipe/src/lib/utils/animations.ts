/**
 * Animation utilities for smooth transitions and effects
 */

/**
 * Fade in animation options
 */
export const fadeInOptions: IntersectionObserverInit = {
	threshold: 0.1,
	rootMargin: '0px 0px -50px 0px'
};

/**
 * Slide up animation options
 */
export const slideUpOptions: IntersectionObserverInit = {
	threshold: 0.1,
	rootMargin: '0px 0px -100px 0px'
};

/**
 * Parallax scroll handler
 */
export function createParallaxEffect(
	element: HTMLElement,
	speed: number = 0.5
): () => void {
	const handleScroll = () => {
		const scrolled = window.pageYOffset;
		const rate = scrolled * speed;
		element.style.transform = `translateY(${rate}px)`;
	};

	window.addEventListener('scroll', handleScroll, { passive: true });
	
	return () => {
		window.removeEventListener('scroll', handleScroll);
	};
}

