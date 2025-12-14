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
	let ticking = false;

	const handleScroll = () => {
		if (!ticking) {
			window.requestAnimationFrame(() => {
				const scrolled = window.pageYOffset;
				const windowHeight = window.innerHeight;
				const rect = element.getBoundingClientRect();
				
				// Only apply parallax when element is in viewport or near it
				if (rect.bottom >= -windowHeight && rect.top <= windowHeight * 2) {
					// Simple parallax: element moves at speed * scroll position
					// For background elements, speed should be < 1 to move slower
					const rate = scrolled * speed;
					element.style.transform = `translate3d(0, ${rate}px, 0)`;
				}

				ticking = false;
			});

			ticking = true;
		}
	};

	// Initial call
	handleScroll();
	window.addEventListener('scroll', handleScroll, { passive: true });
	
	return () => {
		window.removeEventListener('scroll', handleScroll);
		element.style.transform = '';
	};
}

/**
 * Create multiple parallax effects for different sections
 */
export function createMultipleParallaxEffects(
	elements: Array<{ element: HTMLElement; speed: number }>
): () => void {
	let ticking = false;

	const handleScroll = () => {
		if (!ticking) {
			window.requestAnimationFrame(() => {
				const scrolled = window.pageYOffset;
				const windowHeight = window.innerHeight;

				elements.forEach(({ element, speed }) => {
					const rect = element.getBoundingClientRect();
					const elementTop = rect.top + scrolled;
					
					// Only apply parallax when element is in viewport or near it
					if (rect.bottom >= -windowHeight && rect.top <= windowHeight * 2) {
						// Simple parallax: element moves at speed * scroll position
						// For background elements, speed should be < 1 to move slower
						const rate = scrolled * speed;
						element.style.transform = `translate3d(0, ${rate}px, 0)`;
					}
				});

				ticking = false;
			});

			ticking = true;
		}
	};

	// Initial call
	handleScroll();
	window.addEventListener('scroll', handleScroll, { passive: true });
	
	return () => {
		window.removeEventListener('scroll', handleScroll);
		elements.forEach(({ element }) => {
			element.style.transform = '';
		});
	};
}

