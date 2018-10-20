
function Headlines(){
    this.headlines = [];
};

Headlines.prototype.getHeadlines = function (url, callback){
    var result ;
    let xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            result = JSON.parse(xmlhttp.responseText);

            //  for(let i =0; i<5; i++){
            //     console.log(this.headlines);
            //     this.headlines.push(result.response.results[i]);
            // }

            callback(result);
            let id =result.response.results[0].id;
            // console.log(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    return result;
}

Headlines.prototype.getSummary = function (url,summaryCallback){
    let xmlhttp;
    var summary;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            summary = JSON.parse(xmlhttp.responseText);
            summaryCallback(summary);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    return summary;
}
