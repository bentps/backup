$(document).ready(function(){

// Style date/category spans based on slider input and/or on click, if latter also slide slider appropriately
$('#sorter-slider').on('input', function(){$('#justinput').addClass('justinput');});
$('#sorter-slider').on('click', function(){
  if ($('#justinput').hasClass('justinput')) {styleslider(2)}
  else{styleslider(3);}
  $('#justinput').removeClass('justinput');
});
$('#slide-date').on('click', function(){styleslider(0);datesort();});
$('#slide-cat').on('click', function(){styleslider(1);catsort();});
function styleslider(picked) {
    var current = $('#sorter-slider').val();
    if (picked == 2){var picked=current;}
    if (picked == 3){if (current == 1){var picked=0;}else{var picked=1;}}
    $('#sorter-slider').val(picked);
    if (picked==1){$('#slide-date').removeClass('sort-selected');$('#slide-cat').addClass('sort-selected');catsort();}
    if (picked==0){$('#slide-cat').removeClass('sort-selected');$('#slide-date').addClass('sort-selected');datesort();}
}

// utility function for title casing things
function toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
}

// Make a list of all tags for sorting by category
function gettags() {
  var alltags;
  $(".tags").each(function(){
    thistag=$(this).html().substring(6);
    alltags += ', ' + thistag;
  });
  var alltags = alltags.split(", ");
// Get only the unique tags  
  var unique = Array.from(new Set(alltags));
  unique.shift(); // Take the 'undefined' value off the beginning of the array
  return unique;
}
  
  
// Sort posts by category if toggled
function catsort() {
// check if categories have been figured out on this page-load yet. If not, figure them out
  if ($('ul.categories').find('li').length ==0){
    //if ($('.categories').childNodes.length == 0) {
    // loop over categories
    var i;for (i = 0; i < gettags().length; i++) { 
        // make a header for this category
        var thisheader = (toTitleCase(gettags()[i]));
        $('.categories').append('<div id=' + i + '><h4 class="category" id="'+i+'">' + thisheader + '</h4></div>');
        //identify any posts that belong in this category
        $('.recent>li').each(function() {
          var thisli=$(this).html();
          var thesetags = $(this).find('div.tags').html();
          if(thesetags.indexOf(gettags()[i]) != -1){
            //add these posts under the header
            $('#'+i).after('<li>'+thisli+'</li>');
          }
        });
      }  
   }
  // show categories list and hide by-date list
  $('.recent').css('display','none');
  $('.categories').css('display','block').css('-webkit-animation','fadeIn 1s').css('animation','fadeIn 1s');
  //$('.recent').hide();
  //$('.categories').fadeIn(300);
}  
  

// Re-display posts by date if toggled back and hide by-categories sorting
function datesort() {
  $('.categories').css('display','none');
  $('.recent').css('display','block').css('-webkit-animation','fadeIn 1s').css('animation','fadeIn 1s');
  //$('.categories').hide();
  //$('.recent').fadeIn(300);
}

});