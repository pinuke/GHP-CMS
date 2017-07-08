function ghp_get( owner, repo, callback, options )
{
  var init = {
    "labels" : "blogpost"
  }
  if( options ){
  	if( ( typeof options.labels === "string" || options.labels instanceof String ) && options.labels.length > 0 ){
      if( options.concatenate.labels === false ){
        init.labels = options.labels;
      }else{
        init.labels = init.labels + "," + options.labels;
      }
    }
  }
  var HTTP_req = new XMLHttpRequest();
  HTTP_req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      callback( this.responseText );
    }
  };
  HTTP_req.open("GET", "https://api.github.com/repos/" + owner + "/" + repo + "/issues?labels=" + init.labels, true);
  HTTP_req.send();
}
