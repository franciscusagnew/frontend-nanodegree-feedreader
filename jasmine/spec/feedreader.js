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
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        for (var item in allFeeds) {
            it('feed URL is defined', function() {
                expect(allFeeds[item].url).toBeDefined();
                expect(allFeeds[item].url).not.toBe('');
            });
        }

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        for (var item in allFeeds) {
            it('feed name is defined', function() {
                expect(allFeeds[item].name).toBeDefined();
                expect(allFeeds[item].name).not.toBe('');
            });
        }
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function() {
        var menu, defaultStatus, displayMenu, hideMenu;

        beforeEach(function() {
            menu = $('body');
            defaultStatus = menu.hasClass('menu-hidden');
            displayMenu = menu.toggleClass('menu-hidden').hasClass('menu-hidden');
            hideMenu = menu.toggleClass('menu-hidden').hasClass('menu-hidden');
        });
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is menu hidden by default', function() {
            expect(defaultStatus).toBe(true);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('does menu visibility change when menu icon is clicked', function() {
            expect(displayMenu).toBe(false);
            expect(hideMenu).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it("should be at least one entry within the feed container", function() {
            var entryCount = $('.entry').length;
            expect(entryCount).toBeGreaterThan(0);
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        // Declare variables for the old and new feeds
        var previousFeed, nextFeed;

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function(done) {
            loadFeed(1, function() {
                previousFeed = $('.feed').html();
                loadFeed(2, function() {
                    done();
                });
            });
        });

        it('content changes when new feed is loaded', function() {
            expect(previousFeed).toBeDefined();
            nextFeed = $('.feed').html();
            expect(nextFeed).toBeDefined();
            expect(previousFeed).not.toEqual(nextFeed);
        });

        // Reload the previousEntry
        afterEach(function() {
            loadFeed(0);
        });
    });

}());