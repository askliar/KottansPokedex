import * as DataLogic from './modules/data-logic.js';

DataLogic.loadFilter();
DataLogic.loadCards();

document.getElementById('loadMoreButton').onclick = function(event){
  event.preventDefault();
  DataLogic.loadCards();
};


$(document).ready(function(){
  var winWidth = $(window).width();
  floatingBigCard(winWidth);
  $(window).resize(function(){
    winWidth = $(window).width();
    floatingBigCard(winWidth);
  });
});

function floatingBigCard(winWidth){
  var bigCardContainer = $('#bigCard__container'),
      smallCardsContainer = $('#smallCard__container');
  if (winWidth > 991){
    $('.mdl-layout__content').scroll(function(){
      var offset = $('.mdl-layout__content').scrollTop(),
          listHeight = smallCardsContainer.height();
      if (offset > 65){
        if (offset < listHeight-415) bigCardContainer.css('padding-top', offset-65);
      } else {
        bigCardContainer.css('padding-top', 0);
      }
    });
  } else {
    bigCardContainer.css('padding-top', 0);
  }
}
