/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

$(function() {
    /* RDD Feeds test suite just contains the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* Define tests to make sure that the allFeeds variable has been 
         * defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Define test that loops through each feed in the allFeeds object and 
         * ensures it has a URL defined and that the URL is not empty.
         */
        for (var item in allFeeds) {
            it('feed URL is defined', function() {
                expect(allFeeds[item].url).toBeDefined();
                expect(allFeeds[item].url).not.toBe('');
            });
        }

        /* Define test that loops through each feed in the allFeeds object and 
         * ensures it has a name defined and that the name is not empty.
         */
        for (var item in allFeeds) {
            it('feed name is defined', function() {
                expect(allFeeds[item].name).toBeDefined();
                expect(allFeeds[item].name).not.toBe('');
            });
        }
    });

    /* "The menu" test suite */
    describe('The Menu', function() {
        var menu = $('body').hasClass('menu-hidden');
        var menuIcon = $('.menu-icon-link');

        // Define test that ensures the menu element is hidden by default.
        it('is menu hidden by default', function() {
            expect(menu).toBe(true);
        });

        /* Define test that ensures the menu changes visibility when the menu
         * icon is clicked.
         */
        it('does menu visibility change when menu icon is clicked', function() {
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* "Initial Entries" test suite */
    describe('Initial Entries', function() {

        /* Define est that ensures when the loadFeed function is called and
         * completes its work.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* Define a test to ensure there is at least a single .entry element 
         * within the .feed container.
         */
        it("should be at least one entry within the feed container", function() {
            var entryCount = $('.feed .entry').length;
            expect(entryCount).toBeGreaterThan(0);
        });
    });

    /* "New Feed Selection" test suite */
    describe('New Feed Selection', function() {
        // Declare variables for the old and new feeds
        var previousFeed, nextFeed;

        beforeEach(function(done) {
            loadFeed(1, function() {
                previousFeed = $('.feed').html();
                loadFeed(2, function() {
                    done();
                });
            });
        });

        /* Define test that ensures when a new feed is loaded by the loadFeed 
         * function that the content actually changes.
         */
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