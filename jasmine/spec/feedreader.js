/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
	/* This is our first test suite - a test suite just contains
	* a related set of tests. This suite is all about the RSS
	* feeds definitions, the allFeeds variable in our application.
	*/
	describe('RSS Feeds', () => {
		/* This is our first test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty. Experiment with this before you get started on
		 * the rest of this project. What happens when you change
		 * allFeeds in app.js to be an empty array and refresh the
		 * page?
		 */
		it('are defined', () => {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});


		/* All urls in the allFeeds object need to be set and can not be empty */
		it('should be URL defined', () => {
			for(const feed of allFeeds) {
				expect(feed.url).toBeTruthy();
			}
		});


		/* All names in the allFeeds object need to be set and can not be empty */
		it('should be name defined', () => {
			for (const feed of allFeeds) {
				expect(feed.name).toBeTruthy();
			}
		});
	});

	/* The menu tests */
	describe('The menu', () => {

		/* the menu element should be hidden by default */
		it('should be hidden by default', () => {

			const body = document.querySelector('body');
			expect(body.classList.contains('menu-hidden')).toBe(true);

		});

		 /* the menu changes visibility when the menu icon is clicked. */
		 it('should be visible when then menu icon is clicked and hide when click again', () => {
			 const body = document.querySelector('body'),
				menu = document.querySelector('.menu-icon-link');

			menu.click();
			expect(body.classList.contains('menu-hidden')).not.toBe(true);

			menu.click();
			expect(body.classList.contains('menu-hidden')).toBe(true);

		 });
	});

	/* Initial Entries tests */
	describe('Initial Entries', () => {

		beforeEach((done) => {
			loadFeed(0, done);
		});

		/* when the loadFeed function is called and completes its work, there is at least
		 * a single .entry element within the .feed container. */
		it('should be at least a single .entry in .feed', (done) => {
			expect(document.querySelectorAll('.feed .entry').length).toBeTruthy();
			done();
		});

	});
	/* New Feed Selection tests */
	describe('New Feed Selection', () => {


		/* check if when a new feed is loaded by the loadFeed function that the content actually changes. */
		let contentLoad1, contentLoad2;

		beforeEach((done) => {
			loadFeed(0, () => {
				contentLoad1 = document.querySelector('.entry').textContent;
				loadFeed(1, () => {
					contentLoad2 = document.querySelector('.entry').textContent;
					done();
				})
			});
		});

		it('should be contents changes', () => {
			expect(contentLoad1).not.toEqual(contentLoad2);
		})
	});
}());
