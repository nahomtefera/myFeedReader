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

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a URL defined', function(){
            for(let i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBeLessThan(1);
            }
        });
        

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a name defined', function(){
            for(let i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBeLessThan(1);
            }
        });

    });


    describe("The menu", function(){

        /* Test that ensures the menu element is
         * hidden by default. 
         */
        it('is hidden by default', function(){
            expect($("body").attr("class")).toEqual("menu-hidden");
        });
         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */
        it('is shown/hidden on click', function(){
            let menuIcon = $('.menu-icon-link');
            
            menuIcon.click();
            expect($("body").hasClass("menu-hidden")).toBe(false);
            
            menuIcon.click();
            expect($("body").hasClass("menu-hidden")).toBe(true);
            
        });
    });

    describe("Initial Entries", function() {
        
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
         beforeEach(function(done){
            setTimeout(function() {
                loadFeed(0, function(){
                    done();
                });
              }, 1);
            
         });

         it('should give at least a single entry element', function(done) {
            let loadedContent = $(".feed").find(".entry").length;
            expect(loadedContent).not.toBeLessThan(0);      
            done();
         });

    });

    describe("New Feed Selection", function(){

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        let feedContent;
        beforeEach(function(done){
            setTimeout(function(){
                loadFeed(0, function(){
                    initialContent = $(".feed").html();
                    loadFeed(1,function(){
                        done();
                    });
                });
            }, 1);
        });

        it('changes when new feed is loaded', function(done){
            let newContent = $(".feed").html();
            expect(initialContent).not.toBe(newContent);
            done();
        });
    });
         
}());
