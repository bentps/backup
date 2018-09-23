$(document).ready(function(){

// Trigger style/sort fxn by clicking on date/cat spans
$('#slide-date').on('click', function(){sortby(0);});
$('#slide-cat').on('click', function(){sortby(1);});

// Function to style the date/cat spans, slide the slider, and trigger the sorting functions
function sortby(picked) {
  // Based on what we picked, style spans and trigger sorting functions  
    if (picked==1){$('#slide-date').removeClass('sort-selected');$('#slide-cat').addClass('sort-selected');catsort();}
    if (picked==0){$('#slide-cat').removeClass('sort-selected');$('#slide-date').addClass('sort-selected');datesort();}
}


// Utility function for title casing things
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
  
  
// Function to sort posts by category, then show these and hide the by-date sorting
function catsort() {
  // If categories have not yet been figured out on this page-load, do so now
  if ($('ul.categories').find('li').length ==0){
    // loop over categories
    var i;for (i = 0; i < gettags().length; i++) { 
        // make a header element for this category
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
  // Show categories list and hide by-date list
  $('.recent').css('display','none');
  $('.categories').css('display','block').css('-webkit-animation','fadeIn 1s').css('animation','fadeIn 1s');
  //$('.recent').hide();
  //$('.categories').fadeIn(300);
}  
  

// Function to re-display posts by date and hide the by-category sorting
function datesort() {
  $('.categories').css('display','none');
  $('.recent').css('display','block').css('-webkit-animation','fadeIn 1s').css('animation','fadeIn 1s');
  //$('.categories').hide();
  //$('.recent').fadeIn(300);
}

});