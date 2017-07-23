(function() {
    var main = function() {
        var numTabs = $('.slidetabs-background').length;

        var pageArray = [];
        var currentState;
        var bannerWidth = 78;
        var totalWidth = 1000;

        function Page(zIndex, id) { //each page object has three positions and is attached to a html element.
            this.positionLeft = zIndex * bannerWidth;
            this.positionMiddle = (zIndex / numTabs) * totalWidth;
            this.positionRight = totalWidth - ((numTabs - zIndex) * bannerWidth);

            this.pageId = document.getElementById(id);
        }

        $('.slidetabs-background').each(function() { //building the pages objects & setting the page start-up position
            var zIndex = $(this).css('z-index');
            var id = this.id;
            pageArray[zIndex] = new Page(zIndex, id);
            var pixels = zIndex * bannerWidth;
            $(this).css('left', pixels + 'px');
        });

        $('.slidetabs-background').click(function() { //click event, checks what page was selected and changes appropriate positions
            var currentPage = $(this).css('z-index');
            selectPage(currentPage);
        });

        //TODO: disable animation optionally
        function selectPage(currentPage) {
            console.log("current page: " + currentPage);
            console.log("current state: " + currentState);

            if (currentPage != currentState) {
                for (var i = 0; i < numTabs; i++) {
                    if (currentPage >= i) {
                        //console.log(pageArray[i].pageId)
                        $(pageArray[i].pageId).animate({
                            // left: pageArray[i].positionLeft + '%'
                            left: pageArray[i].positionLeft + 'px'
                        }, 800);
                    } else {
                        $(pageArray[i].pageId).animate({
                            // left: pageArray[i].positionRight + '%'
                            left: pageArray[i].positionRight + 'px'
                        }, 800);
                    }
                }
                currentState = currentPage;
            }
        }
        selectPage(numTabs-1);
    };

    $(document).ready(main);
}());