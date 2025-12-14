<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { createMultipleParallaxEffects } from '$lib/utils/animations';

	let heroImage: HTMLElement;
	let recipesBg: HTMLElement;
	let restaurantsBg: HTMLElement;
	let aboutImage: HTMLElement;
	let parallaxCleanup: (() => void) | null = null;

	onMount(() => {
		// Create parallax effects for background elements only
		// Use setTimeout to ensure all elements are rendered
		setTimeout(() => {
			const parallaxElements: Array<{ element: HTMLElement; speed: number }> = [];
			
			if (heroImage) {
				parallaxElements.push({ element: heroImage, speed: 0.5 });
			}
			if (recipesBg) {
				parallaxElements.push({ element: recipesBg, speed: 0.3 });
			}
			if (restaurantsBg) {
				parallaxElements.push({ element: restaurantsBg, speed: 0.3 });
			}
			if (aboutImage) {
				parallaxElements.push({ element: aboutImage, speed: 0.4 });
			}

			if (parallaxElements.length > 0) {
				parallaxCleanup = createMultipleParallaxEffects(parallaxElements);
			}
		}, 100);

		// Intersection Observer for fade-in animations
		// Use a small delay to ensure DOM is ready
		setTimeout(() => {
			const observerOptions = {
				threshold: 0.1,
				rootMargin: '0px 0px -50px 0px'
			};

			const observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate-fade-in');
						observer.unobserve(entry.target);
					}
				});
			}, observerOptions);

			document.querySelectorAll('.fade-in-on-scroll').forEach((el) => {
				observer.observe(el);
			});
		}, 100);

		return () => {
			if (parallaxCleanup) parallaxCleanup();
		};
	});

	const featuredRecipes = [
		{
			id: 1,
			title: 'Gourmet Pasta',
			description: 'Authentic Italian pasta with fresh ingredients',
			image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
			price: 24.99
		},
		{
			id: 2,
			title: 'Grilled Salmon',
			description: 'Perfectly grilled salmon with herbs and lemon',
			image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
			price: 32.99
		},
		{
			id: 3,
			title: 'Chocolate Cake',
			description: 'Decadent chocolate cake with rich frosting',
			image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
			price: 18.99
		}
	];
</script>

<svelte:head>
	<title>eRecipe - Discover Amazing Recipes & Restaurants</title>
	<meta name="description" content="Join eRecipe to discover amazing recipes, connect with chefs, and explore restaurants in your area." />
</svelte:head>

<div class="min-h-screen flex flex-col">
	<Header />

	<main class="flex-grow">
		<!-- Hero Section with Parallax -->
		<section class="relative h-screen flex items-center justify-center overflow-hidden">
			<div
				bind:this={heroImage}
				class="parallax-element absolute inset-0 bg-gradient-to-r from-primary to-primary-light opacity-90"
			>
				<div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1920')] bg-cover bg-center opacity-30"></div>
			</div>
			
			<div class="relative z-10 text-center px-4 max-w-4xl mx-auto fade-in-on-scroll">
				<h1 class="text-5xl md:text-7xl font-display font-bold text-white mb-6 animate-slide-down">
					Discover Amazing Recipes
				</h1>
				<p class="text-xl md:text-2xl text-white mb-8 opacity-90 animate-slide-up">
					Join a community of food lovers, share your creations, and explore restaurants near you
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
					<button class="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-primary-cream transition-all duration-300 transform hover:scale-105 shadow-lg">
						Get Started
					</button>
					<button class="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105">
						Explore Recipes
					</button>
				</div>
			</div>

			<!-- Scroll Indicator -->
			<div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
				<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
				</svg>
			</div>
		</section>

		<!-- Featured Recipes Section -->
		<section id="recipes" class="py-20 bg-primary-cream relative overflow-hidden">
			<!-- Parallax background element -->
			<div bind:this={recipesBg} class="parallax-element absolute inset-0 opacity-10 pointer-events-none">
				<div class="absolute inset-0 bg-gradient-to-br from-primary to-primary-light"></div>
			</div>
			<div class="container mx-auto px-4 relative z-10">
				<div class="text-center mb-12 fade-in-on-scroll">
					<h2 class="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-4">
						Featured Recipes
					</h2>
					<p class="text-lg text-gray-600 max-w-2xl mx-auto">
						Discover our most popular recipes, curated by top chefs and food enthusiasts
					</p>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
					{#each featuredRecipes as recipe, index}
						<div
							class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 fade-in-on-scroll"
							style="animation-delay: {index * 0.1}s"
						>
							<div class="relative h-64 overflow-hidden">
								<img
									src={recipe.image}
									alt={recipe.title}
									class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
								/>
								<div class="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
									${recipe.price}
								</div>
							</div>
							<div class="p-6">
								<h3 class="text-2xl font-bold text-gray-800 mb-2">{recipe.title}</h3>
								<p class="text-gray-600 mb-4">{recipe.description}</p>
								<button class="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-light transition-colors font-medium">
									View Recipe
								</button>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- Restaurants Section -->
		<section id="restaurants" class="py-20 bg-white relative overflow-hidden">
			<!-- Parallax background element -->
			<div bind:this={restaurantsBg} class="parallax-element absolute inset-0 opacity-5 pointer-events-none">
				<div class="absolute inset-0 bg-gradient-to-br from-primary-pale to-primary-cream"></div>
			</div>
			<div class="container mx-auto px-4 relative z-10">
				<div class="text-center mb-12 fade-in-on-scroll">
					<h2 class="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-4">
						Top Restaurants
					</h2>
					<p class="text-lg text-gray-600 max-w-2xl mx-auto">
						Find the best restaurants in your area and order your favorite dishes
					</p>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{#each Array(4) as _, i}
						<div class="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 fade-in-on-scroll">
							<div class="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
								<!-- Restaurant SVG Icon -->
								<svg class="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M3 21H5V9H3V21ZM7 21H9V13H7V21ZM11 21H13V17H11V21ZM15 21H17V9H15V21ZM19 21H21V5H19V21Z" fill="currentColor"/>
									<path d="M12 2C10.34 2 9 3.34 9 5V7H15V5C15 3.34 13.66 2 12 2Z" fill="currentColor" opacity="0.8"/>
									<circle cx="12" cy="4" r="1.5" fill="white"/>
								</svg>
							</div>
							<h3 class="text-xl font-bold text-center text-gray-800 mb-2">Restaurant {i + 1}</h3>
							<p class="text-gray-600 text-center text-sm mb-4">4.5 ⭐ (120 reviews)</p>
							<button class="w-full bg-primary-pale text-primary py-2 rounded-lg hover:bg-primary-light hover:text-white transition-colors font-medium">
								View Menu
							</button>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- Community Section -->
		<section id="community" class="py-20 bg-gradient-to-br from-primary-pale to-primary-cream">
			<div class="container mx-auto px-4">
				<div class="max-w-4xl mx-auto text-center fade-in-on-scroll">
					<h2 class="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-6">
						Join Our Community
					</h2>
					<p class="text-lg text-gray-600 mb-8">
						Connect with thousands of food enthusiasts, share your recipes, and get inspired by others
					</p>
					<div class="flex flex-col sm:flex-row gap-4 justify-center">
						<button class="bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-light transition-all duration-300 transform hover:scale-105 shadow-lg">
							Sign Up Free
						</button>
						<button class="bg-white text-primary border-2 border-primary px-8 py-4 rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105">
							Learn More
						</button>
					</div>
				</div>
			</div>
		</section>

		<!-- About Section -->
		<section id="about" class="py-20 bg-white relative overflow-hidden">
			<div class="container mx-auto px-4 relative z-10">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
					<div class="fade-in-on-scroll">
						<h2 class="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-6">
							About eRecipe
						</h2>
						<p class="text-lg text-gray-600 mb-4">
							eRecipe is your ultimate destination for discovering amazing recipes, connecting with talented chefs, and exploring the best restaurants in your area.
						</p>
						<p class="text-lg text-gray-600 mb-6">
							We combine the power of eCommerce with social media to create a unique platform where food lovers can share, discover, and enjoy culinary experiences together.
						</p>
						<button class="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-light transition-all duration-300">
							Read More
						</button>
					</div>
					<div class="fade-in-on-scroll">
						<div class="relative h-96 rounded-2xl overflow-hidden shadow-xl">
							<div bind:this={aboutImage} class="parallax-element absolute inset-0 bg-gradient-to-br from-primary to-primary-light"></div>
							<div class="absolute inset-0 flex items-center justify-center p-8 z-10">
								<!-- Chef SVG Illustration -->
								<svg class="w-full h-full text-white" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
									<!-- Chef Hat -->
									<path d="M100 15 C75 15, 55 25, 55 50 L55 65 C55 75, 65 85, 75 85 L125 85 C135 85, 145 75, 145 65 L145 50 C145 25, 125 15, 100 15 Z" fill="currentColor" opacity="0.95"/>
									<path d="M100 15 C75 15, 55 25, 55 50 L55 65 C55 75, 65 85, 75 85 L125 85 C135 85, 145 75, 145 65 L145 50 C145 25, 125 15, 100 15 Z" stroke="white" stroke-width="2" opacity="0.3"/>
									<!-- Hat Band -->
									<rect x="70" y="75" width="60" height="8" rx="4" fill="white" opacity="0.4"/>
									<!-- Chef Face -->
									<circle cx="100" cy="105" r="25" fill="currentColor" opacity="0.9"/>
									<!-- Eyes -->
									<circle cx="92" cy="100" r="3" fill="white"/>
									<circle cx="108" cy="100" r="3" fill="white"/>
									<!-- Smile -->
									<path d="M90 115 Q100 120 110 115" stroke="white" stroke-width="2" fill="none" stroke-linecap="round"/>
									<!-- Chef Body/Apron -->
									<path d="M70 130 L70 175 C70 185, 80 195, 90 195 L110 195 C120 195, 130 185, 130 175 L130 130 Z" fill="currentColor" opacity="0.9"/>
									<path d="M75 140 L125 140 L125 175 C125 180, 120 185, 115 185 L85 185 C80 185, 75 180, 75 175 Z" fill="white" opacity="0.3"/>
									<!-- Chef Arms -->
									<ellipse cx="50" cy="140" rx="15" ry="25" fill="currentColor" opacity="0.9"/>
									<ellipse cx="150" cy="140" rx="15" ry="25" fill="currentColor" opacity="0.9"/>
									<!-- Cooking Utensil (Spatula) -->
									<path d="M100 145 L100 165 M95 145 L105 145" stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
									<circle cx="100" cy="150" r="4" fill="white" opacity="0.6"/>
								</svg>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>

	<Footer />
</div>

<style>
	.fade-in-on-scroll {
		opacity: 0;
		transition: opacity 0.6s ease-in-out;
	}

	:global(.fade-in-on-scroll.animate-fade-in) {
		opacity: 1;
	}
</style>
