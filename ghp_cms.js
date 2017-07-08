function ghp( type, options )
{
  
  this.fetchers = {
    "ghp" : {
    },
    "twitter" : {},
    "facebook" : {},
    "instagram" : {},
    "google+" : {},
    "youtube" : {},
    "pinterest" : {},
    "giphy" : {},
    "imgur" : {}
  }
  for(var index in extensions) { 
   if (extensions.hasOwnProperty(index)) {
       var value = extensions[index];
       // do something with object value here.
   }
  }
}
