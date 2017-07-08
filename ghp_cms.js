var ghp_get = function( owner, repo, callback, modifier )
{
  ghp_get.options = {
    "labels" : "blogpost",
    "state" : "all"
  }
  
  function generate_query( options, modifier ){
    
    var result = "", result_length = 0;
    
    if( arguments.length > 1 ){
      for (var property in modifier) { 
        if ( modifier.hasOwnProperty( property ) ){
          if ( modifier[ property ].hasOwnProperty( "val" ) ){
            if ( typeof modifier[ property ].val === "string" || modifier[ property ].val instanceof String ){
              options[ property ] = ( modifier[ property ].hasOwnProperty( "o_w" ) ? modifier[ property ].o_w : false ) ? modifier[ property ].val : ( options.hasOwnProperty( property ) ? options[ property ] + "," + modifier[ property ].val : modifier[ property ].val );
            }else if( modifier[ property ].val.constructor === Array ){
              if ( modifier[ property ].hasOwnProperty( "o_w" ) ? modifier[ property ].o_w : false || !options.hasOwnProperty( property ) ) options[ property ] = "";
              for (var i = 0; i < modifier[ property ].val.length; i++) options[ property ] = options[ property ] + modifier[ property ].val[ i ] + ( i !== modifier[ property ].val.length - 1 ? "," : "" );
            }else{
              console.log( "Invalid object passed as an option in the modifier argument.")
            }
          }else{
            console.log( "Invalid object passed as an option in the modifier argument.")
          }
        }
      }
    }
    console.log(options);
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
  HTTP_req.open( "GET", "https://api.github.com/repos/" + owner + "/" + repo + "/issues" + generate_query( ghp_get.options, modifier ), true );
  HTTP_req.send();
}
