function ghp_get( owner, repo, callback, modifier )
{
  var options = {
    "labels" : "blogpost"
  }
  
  function generate_query( options, modifier ){
    
    var result = "", result_length = 0;
    
    if( arguments.length > 1 ){
      for (var property in modifier) { 
        if ( modifier.hasOwnProperty( property ) ){
          if ( modifier[ property ].hasOwnProperty( "val" ) ){
            options[ property ] = modifier[ property ].hasOwnProperty( "o_w" ) ? modifier[ property ].val : ( options.hasOwnProperty( property ) ? options[ property ] + "," + modifier[ property ].val : modifier[ property ].val );
          }else{
            console.log( "Invalid object passed as an option in the modifier argument.")
          }
        }
      }
    }
    
    for (var property in options) {
      if (options.hasOwnProperty(property)) {
        if (typeof options[ property ] === 'string' || options[ property ] instanceof String){
          result = result + ( result_length === 0 ? "?" : "&" ) + property + "=" + options[ property ]
        	result_length++;
        }
      }
    }
    
    return result;
  } 
  
  var HTTP_req = new XMLHttpRequest();
  HTTP_req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      callback( this.responseText );
    }
  };
  HTTP_req.open( "GET", "https://api.github.com/repos/" + owner + "/" + repo + "/issues" + generate_query( options, modifier ), true );
  HTTP_req.send();
}
