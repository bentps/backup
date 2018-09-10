// plugins
var metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    layouts = require('metalsmith-layouts'),
    handlebars = require('handlebars'),
    collections = require('metalsmith-collections'),
    rewrite = require('metalsmith-rewrite'),
    serve = require('metalsmith-serve'),
    watch = require('metalsmith-watch'),
    debug = require('metalsmith-debug'),
    drafts = require('metalsmith-drafts');

handlebars.registerHelper('moment', require('helper-moment'));

// limit an array to a maximum of elements (from the start)
// Thanks to http://stackoverflow.com/questions/10377700/limit-results-of-each-in-handlebars-js 
// via https://github.com/parimalsatyal/neustadt.fr-metalsmith/blob/master/build.js
handlebars.registerHelper('each_upto', function(ary, max, options) {
    if(!ary || ary.length == 0)
        return options.inverse(this);

    var result = [ ];
    for(var i = 0; i < max && i < ary.length; ++i)
        result.push(options.fn(ary[i]));
    return result.join('');
});

metalsmith(__dirname)
  .metadata({
    site: {
      name: 'Ben Plotkin-Swing',
      description: "Ben Plotkin-Swing's website"
    }
  })
  .source('./src')
  .destination('./docs')
  .use(drafts())
// for doing stuff with tags, from https://www.npmjs.com/package/metalsmith-organizer  
  .use(organizer({
    permalink_group: "posts",
    drafts: false,
    groups: [
        {   group_name: "tag"
            type: "post",//get all posts, exclude pages
            expose: "tags", //expose the tags property
            path: "tags/{expose}/{num}", //this will create tag pages that look like so: tags/tag/index.html, tags/tag2index.html, and so on
            num_format: "page/{num}", //this will paginate each tag page like so: tags/tag/page/2/index.html, tags/tag2/page/2/index.html, and so on.
            per_page:10,
        },
        {   group_name: "pages",
            type: "page", //get pages, exclude posts
            path: "{title}", //this will create "post" pages that look like: about/index.html, contact/index.html, etc.
            override_permalink_group: true, //so that we actually get the page data in our template
        },
        {   group_name: "error",
            title: "404", //get 404 "post"
            path: "{title}",
            override_permalink_group: true, //again we need to pass the right data to the template
            no_folder: true //path would normally create a file at 404/index.html but the no folder forces it to output 404.html
        },
        {   group_name: "portfolio",
            type: "post", //get all posts...
            tags: "thumb",//...that also have a thumb
            thumb_url: true, //check that a thumb url property exists
            path: "{group}", //make the path the group name so we get portfolio/index.html
            //no per_page means it we don't need to specify anything about page numbers, it's just a single page
            page_layout: "index-masonry-thumb.ext", //use a different template
        },
        {   group_name: "rss",
            type: "post", //get all posts like the post group
            path: "{group}", //url will be at rss/index.xml
            change_extension: ".xml", //change our extension
            page_layout: "rss", //use our rss template
            page_only: true // only the "pages" so that we get a list of all our post files
        },
        {   group_name: "tag_rss",//then say we wanted an rss feed for every tag
            type: "post", //we use the same search criteria as the tags group
            expose: "tags", //also the same expose so that it's broken into the correct groups of pages
            path: "tag/{expose}/rss",
            //the path is a little different because we can't just use {group} and also I want it to be in an rss subfolder to link to so we manually specify it so we'll get files output at tags/tag/rss/index.xml, tags/tag2/rss/index.xml
            page_only: true, // we don't want all the individual files created
            change_extension: ".xml" //change our extension
            page_layout: "rss.ext", //change our template to the rss template
        },
        {   group_name: "sitemap", //similarly to how we made an rss feed we can make a sitemap
            //the cool thing about making it this way is you have access to the post so you can do stuff in your templates (if the logic of the language allows it, I use ejs which is just javascript really and lets me do anything I want) like check if the content has videos, etc, then output that information to the sitemap for better SEO
            page_layout: "sitemap.ext", //change to my sitemap template
            path: "{group}",
            no_folder: true, //so we get sitemap.xml at the root
            change_extension: ".xml", //change out extension
            page_only: true, //because again we don't actually need to create any individual files
        },
    ]
  .use(collections({
      blog: {
        pattern: ['blog/**/*.md', '!blog/**/index.md'],
        sortBy: 'date',
        reverse: true
      },
    }))
  .use(markdown())
  .use(layouts({
      engine: 'handlebars',
      directory: './layouts',
      pattern: ["*/*/*html","*/*html","*html"],
      partials: {
        blogheader: 'partials/blog-header',
        footer: 'partials/footer'
      }
  }))
  .use(rewrite([{
      pattern: ['**/*.html', '!**/index.html'],
      filename: '{path.dir}/{path.name}/index.html'
    }]))
  .use(serve({
    port: 8081,
    verbose: true
    }))
  .use(watch({
      paths: {
        "${source}/**/*": true,
        "layout/**/*": "**/*",
      }
    }))
  .use(debug())
  .build(function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Site built!');
    }
  });

