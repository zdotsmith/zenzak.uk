/**
 * Calculate estimated reading time for text content
 * @param {string} text - The text content to analyze
 * @param {number} wordsPerMinute - Average reading speed (default: 200 wpm)
 * @returns {number} Estimated reading time in minutes (rounded up)
 */
export function calculateReadingTime(text, wordsPerMinute = 200) {
	if (!text || typeof text !== 'string') {
		return 0;
	}

	// Remove HTML tags and extra whitespace
	const cleanText = text
		.replace(/<[^>]*>/g, '')
		.replace(/\s+/g, ' ')
		.trim();

	// Count words
	const wordCount = cleanText.split(' ').filter((word) => word.length > 0).length;

	// Calculate reading time (minimum 1 minute)
	const readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

	return readingTime;
}
