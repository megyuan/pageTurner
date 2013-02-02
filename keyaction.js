function incrementDigit(curr){//increment a digit
	switch(curr){
		case '0':curr='1';break;
		case '1':curr='2';break;
		case '2':curr='3';break;
		case '3':curr='4';break;
		case '4':curr='5';break;
		case '5':curr='6';break;
		case '6':curr='7';break;
		case '7':curr='8';break;
		case '8':curr='9';break;
		case '9':curr='0';break;
	}
	return curr;
}

function decrementDigit(curr){//decrement a digit
	switch(curr){
		case '0':curr='9';break;
		case '1':curr='0';break;
		case '2':curr='1';break;
		case '3':curr='2';break;
		case '4':curr='3';break;
		case '5':curr='4';break;
		case '6':curr='5';break;
		case '7':curr='6';break;
		case '8':curr='7';break;
		case '9':curr='8';break;
	}
	return curr;
}

function isDigit(curr){//check if curr is a digit
	if(curr>='0' && curr<='9')
		return true;
	return false;
}

//Get the incremented URL. If no digits at the end, return original url.
function getIncDestURL(origURL){
	var destURL="";//string of destination URL
	var length=origURL.length;//length of original URL
	var firstDot=origURL.lastIndexOf('.');//index of first dot starting from right
	var curr;//current char
	var first=true;//boolean about whether curr is the first digit from right
	
	for(var i=length-1;i>=(firstDot-1) && i>=0;i--){
		curr=origURL.charAt(i);
		//If curr is a digit, get the bigger number, and add one to it until it is not 
		//a digit, then return the resulting URL.
		if(isDigit(curr)){
			destURL=destURL+origURL.substring(i+1,length);
			//add one to it until curr is not a digit
			for(i-- ; i>=0 && curr=='9' && isDigit(curr);i--){
				destURL=incrementDigit(curr)+destURL;
				curr=origURL.charAt(i);
			}
			if(isDigit(curr)){
				//curr!='9'
				destURL=incrementDigit(curr)+destURL;
				destURL=origURL.substring(0,i+1)+destURL;
				return destURL;
			}else{
				//curr is not a digit, add '1' to the string
				destURL=origURL.substring(0,i+2)+'1'+destURL;
				return destURL;
			}
		}//end of IF loop
	}//end of FOR loop
}


//Get the decremented URL. If no digits at the end, return original url.
function getDecDestURL(origURL){
	var destURL="";//string of destination URL
	var length=origURL.length;//length of original URL
	var firstDot=origURL.lastIndexOf('.');//index of first dot starting from right
	var curr;//current char
	var first=true;//boolean about whether curr is the first digit from right
	
	for(var i=length-1;i>=(firstDot-1) && i>=0;i--){
		curr=origURL.charAt(i);
	//If curr is a digit, get the bigger number, and add one to it until it is not a digit
	//,then return the resulting URL.
		if(isDigit(curr)){
			destURL=destURL+origURL.substring(i+1,length);
			//add one to it until curr is not a digit
			for(i-- ; i>=0 && curr=='0' && isDigit(curr);i--){
				destURL=decrementDigit(curr)+destURL;
				curr=origURL.charAt(i);
			}
			if(isDigit(curr)){
				//curr!='0'
				destURL=decrementDigit(curr)+destURL;
				destURL=origURL.substring(0,i+1)+destURL;
				return destURL;
			}else{
				//curr is not a digit, 0 detected before must be a dangling 0, 
				//return the original URL, and users should clear the '0'
				return origURL;
			}
		}//end of IF loop
	}//end of FOR loop
}

//increa: if true, increment; if false, decrement.
//newWin: if true, open in new window; if false, refresh the current window.
function updateURL(increa, newWin){
	var origURL=document.URL;
	var destURL;
	if(increa){
		destURL= getIncDestURL(origURL);
		if(newWin)//Open the resulting URL in a new window
			window.open(destURL);
		window.location.href=destURL;//Open the resulting URL in the same window
	}else{
		destURL= getDecDestURL(origURL);
		if(newWin)
			window.open(destURL);
		window.location.href=destURL;
	}
	
}

//add action listener(the function "keydown") to the document
document.onkeydown = keydown;
function keydown(evt){
  	if (!evt) evt = window.event;
  	//If user clicks on "->"(Right)
  	if (evt.keyCode == 39){
  		updateURL(true, false);
	}
	//If user clicks on "<-"(Left)
	if(evt.keyCode == 37){
		updateURL(false, false);
	}
}
