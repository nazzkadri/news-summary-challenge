var headlines = new Headlines();
var responsedata;
function renderList(){

    //headlines.getHeadlines("http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search?q=uk&use-date=published&page-size=1&sectionId=politics&sectionName=Politics&from-date=2018-10-18&order-by=newest&show-elements=image&page=1&page-size=5&tag=politics&show-fields=all", callback)
    //getHeadlines("http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/uk-news?section=Politics&from-date=2018-10-18&to-date=2018-10-19&order-by=newest&show-elements=image&page=1&page-size=1&show-fields=body", myFunction)
    headlines.getHeadlines("http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search?show-fields=thumbnail,headline,body",callback)
    
};
showCurrentPage();
makeUrlChangeNote();

function makeUrlChangeNote(){
  window.addEventListener("hashchange", showCurrentPage);
}


function callback(resultdata){
    var list_div = document.getElementById('list')
        list_div.innerHTML = "";
        responsedata = resultdata;
        for(let i=0; i<5; i++){
            list_div.innerHTML += "<h2>"+ resultdata.response.results[i].webTitle +"</h3>"
            list_div.innerHTML += "<h3><li><a href='#news"+i+"'summary>" + resultdata.response.results[i].webTitle  + "</a></li></h3>";

            //list_div.innerHTML += "<h2><li><a href='#news"+i+"'summary></a></li></h2>";
            // list_div.innerHTML += "<h3>Click the above link to see the summary page</h3>"
           // if ("thumbnail" in resultdata.response.results[i].fields) {
            list_div.innerHTML += "<img src='" + resultdata.response.results[i].fields.thumbnail + "'/>" 
        //}
            list_div.innerHTML += "<li><a href=" + resultdata.response.results[i].webUrl+ " target='_blank'>Click to see the Original Article</a></li>";
        }
}

//headlines.getSummary("http://news-summary-api.herokuapp.com/aylien?apiRequestUrl=https://api.aylien.com/api/v1/summarize?url=resultdata.response.results[newsId].webUrl",summaryCallback)
function showCurrentPage(){
    if (window.location.hash === ""){
      renderList()
      hideSummaryPage()
      showHome()
    } else {
      newsId =  window.location.hash.split("#news").join("");
      hideHome()
      renderSummary(newsId)
      showSummaryPage()
    }
    }

function renderSummary(id){
    let url = responsedata.response.results[newsId].webUrl;
    headlines.getSummary("http://news-summary-api.herokuapp.com/aylien?apiRequestUrl=https://api.aylien.com/api/v1/summarize?url=" + url + "",summaryCallback);
}

function summaryCallback(summary){
    var summary_div = document.getElementById('summary')
    summary_div.innerHTML = summary.sentences;
}

function showSummaryPage(){
    document.getElementById('summary_page').style.display = "block";

}

function clickLink(id){
    hideHome()
    renderSummary(id)
    showSummaryPage()
  }

function hideHome(){
    document.getElementById('home').style.display = "none";
}

function showHome(){
    renderList();
    document.getElementById('home').style.display = "block";
}

function hideSummaryPage(){
    document.getElementById('summary_page').style.display = "none";
}

function goBack() {
    hideSummaryPage()
    showHome()
  }
