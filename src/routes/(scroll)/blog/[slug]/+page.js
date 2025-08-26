// src/routes/blog/[slug]/+page.js

import { error } from '@sveltejs/kit';
import { calculateReadingTime } from '$lib/utils/readingTime.js';

/**
 * This new `entries` function tells SvelteKit's static adapter
 * which pages to generate for this dynamic route.
 * @type {import('./$types').EntryGenerator}
 */
export function entries() {
	// Get all markdown files from the posts directory.
	const posts = import.meta.glob('/src/lib/posts/*.md', { eager: true });

	// Map the file paths to an array of objects that SvelteKit understands.
	const slugs = Object.keys(posts).map((path) => {
		// Extract 'welcome' from '/src/lib/posts/welcome.md'
		const slug = path.split('/').pop()?.split('.').shift();
		return { slug }; // Return in the format: { slug: 'welcome' }
	});

	// This will return an array like: [{ slug: 'welcome' }]
	return slugs;
}

// Your existing load function with enhanced metadata.
export async function load({ params }) {
	try {
		// Dynamically import the post using the slug from the URL
		const post = await import(`$lib/posts/${params.slug}.md`);

		// Calculate reading time from the rendered content
		// We'll get an approximate word count from the component
		const component = post.default;
		let rawContent = '';

		// Try to get raw content from the component if possible
		if (component.render) {
			const rendered = component.render();
			rawContent = rendered.html || '';
		}

		// Fallback reading time calculation based on description length
		const timeToRead = rawContent
			? calculateReadingTime(rawContent)
			: Math.max(1, Math.ceil((post.metadata.description?.length || 100) / 50));

		return {
			content: post.default, // The Svelte component rendered from Markdown
			meta: {
				...post.metadata, // The frontmatter
				timeToRead,
				slug: params.slug
			}
		};
	} catch (err) {
		// If the post doesn't exist, throw a 404 error
		console.error(`Error loading post ${params.slug}:`, err);
		error(404, `Could not find ${params.slug}`);
	}
}
