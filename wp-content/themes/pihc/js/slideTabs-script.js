(function() {
    var main = function() {
        var numTabs = $('.slidetabs-background').length;

        var pageArray = [];
        var currentState;
        var bannerWidth = 78;
        var totalWidth = 1000;

        function Page(zIndex, id) { //each page object has three positions and is attached to a html element.
            this.positionLeft = (zIndex - 1) * bannerWidth;
            this.positionMiddle = ((zIndex - 1) / numTabs) * totalWidth;
            this.positionRight = totalWidth - ((numTabs - (zIndex-1)) * bannerWidth);

            this.pageId = document.getElementById(id);
        }

        $('.slidetabs-background').each(function() { //building the pages objects & setting the page start-up position
            var zIndex = Number($(this).css('z-index'))/100;
            var id = this.id;
            pageArray[zIndex] = new Page(zIndex, id);
            var pixels = (zIndex -1)* bannerWidth;
            $(this).css('left', pixels + 'px');
        });

        $('.slidetabs-background').click(function() { //click event, checks what page was selected and changes appropriate positions
            var currentPage = Number($(this).css('z-index'))/100;
            selectPage(currentPage);
        });

        //TODO: disable animation optionally
        function selectPage(currentPage) {
            // show the menu of the current page
            $(pageArray[currentPage].pageId).find("div.content").removeClass("hide-menu");
            // when clicking on last tab, show the content
            if (Number(currentPage) === numTabs) {
                $(pageArray[numTabs].pageId).find("div.content").show();
            } else {
                // otherwise, when clicking on tab[0-numTabs-2], hide the content of last tab if not yet already.
                $(pageArray[numTabs].pageId).find("div.content").hide();
            }

            if (currentPage != currentState) {
                for (var i = 1; i <= numTabs; i++) {
                    // hide menu of other pages
                    if (i !== Number(currentPage)) {
                      $(pageArray[i].pageId).find("div.content").addClass("hide-menu");
                    }

                    if (currentPage >= i) {
                        $(pageArray[i].pageId).animate({
                            left: pageArray[i].positionLeft + 'px'
                        }, 800);
                    } else {
                        $(pageArray[i].pageId).animate({
                            left: pageArray[i].positionRight + 'px'
                        }, 800);
                    }
                }
                currentState = currentPage;
            }
        }
        selectPage(numTabs);
    };

    $(document).ready(main);
}());
