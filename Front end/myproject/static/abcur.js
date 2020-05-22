document.body.onload = function affairsFunction() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", '/currentaffairs', true);
    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200) {
            //console.log(xmlhttp.responseText);
            jsonObj = JSON.parse(xmlhttp.responseText);
            //console.log("jsonObj : " + jsonObj.length + typeof(jsonObj) + jsonObj);
            onloadl = generateCurrentAffairs(jsonObj)
        }
    };
    xmlhttp.send();
    wordcloudFunction();
    cnnaffairsFunction();
    foxaffairsFunction();
}
function wordcloudFunction() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", '/wcloud', true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200) {
            wcObj = JSON.parse(xmlhttp.responseText);
            onloadl = generateWordCloud(wcObj);
        }
    };
    xmlhttp.send();
}

function cnnaffairsFunction() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", '/cnnaffairs', true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200) {
            //console.log(xmlhttp.responseText);
            cnnObj = JSON.parse(xmlhttp.responseText);
            onloadl = generateCNNAffairs(cnnObj);
        }
    };
    xmlhttp.send();
}

function foxaffairsFunction() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", '/foxaffairs', true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200) {
            foxObj = JSON.parse(xmlhttp.responseText);
            onloadl = generateFOXAffairs(foxObj);
        }
    };
    xmlhttp.send();
}

var i = 0;
function generateCurrentAffairs(jsonObj) {
    var time = 2000
    document.getElementsByClassName("newslink")[0].href = jsonObj[i].url;
    document.getElementsByClassName("newsurltoimagefile")[0].src = jsonObj[i].urlToImage;
    document.getElementById("nt").innerHTML = jsonObj[i].title;
    document.getElementById("nd").innerHTML = jsonObj[i].description;
    if (i < jsonObj.length - 1) {
        i++;
    }
    else {
        i = 0;
    }
    setTimeout("generateCurrentAffairs(jsonObj)", time)
}

function generateCNNAffairs(cnnObj) {
    for (var c = 0; c < cnnObj.length; c++) {
        document.getElementsByClassName("cnn")[c].children[0].href = cnnObj[c].url;
        document.getElementsByClassName("cnn")[c].children[0].children[0].src = cnnObj[c].urlToImage;
        document.getElementsByClassName("cnncontent")[c].children[0].innerHTML = cnnObj[c].title;
        document.getElementsByClassName("cnncontent")[c].children[1].innerHTML = cnnObj[c].description;
    }
}

function generateFOXAffairs(foxObj) {
    for (var f = 0; f < foxObj.length; f++) {
        document.getElementsByClassName("fox")[f].children[0].href = foxObj[f].url;
        document.getElementsByClassName("fox")[f].children[0].children[0].src = foxObj[f].urlToImage;
        document.getElementsByClassName("foxcontent")[f].children[0].innerHTML = foxObj[f].title;
        document.getElementsByClassName("foxcontent")[f].children[1].innerHTML = foxObj[f].description;
    }
}

function generateWordCloud(myWords) {
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 5, bottom: 5, left: 5 },
        width = 255 - margin.left - margin.right,
        height = 245 - margin.top - margin.bottom;
    var svg = d3.select("#my_dataviz").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    var layout = d3.layout.cloud()
        .size([width, height])
        .words(myWords.map(function (d) { return { text: d.word, size: d.size }; }))
        .padding(5)        //space between words
        .rotate(function () { return ~~(Math.random() * 2) * 90; })
        .fontSize(function (d) { return d.size; })      // font size of words
        .on("end", draw);
    layout.start();
    function draw(words) {
        svg
            .append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function (d) { return d.size + "px"; })
            .style("fill", "black")
            .attr("text-anchor", "middle")
            .style("font-family", "Impact")
            .attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function (d) { return d.text; });
    }
}

function pageOne() {
    document.getElementById("pageone").style.display = "block";
    document.getElementById("pagetwo").style.display = "none";
    document.getElementById("gnews").setAttribute("class", "gnews");
    document.getElementById("formsearch").setAttribute("class", "formsearch");
}

function pageTwo() {
    document.getElementById("pageone").style.display = "none";
    document.getElementById("pagetwo").style.display = "block";
    document.getElementById("gnews").setAttribute("class", "formsearch");
    document.getElementById("formsearch").setAttribute("class", "gnews");
    var today = new Date();
    var tdate = today.getDate();
    var tmonth = today.getMonth() + 1;
    var tyear = today.getFullYear();
    var todaydate = tyear + "-" + (tmonth <= 9 ? '0' + tmonth : tmonth) + "-" + (tdate <= 9 ? '0' + tdate : tdate);
    var weekback = new Date();
    weekback.setDate( weekback.getDate() - 7 );
    var wbdate = weekback.getDate();
    var wbmonth = weekback.getMonth() + 1;
    var wbyear = weekback.getFullYear();
    var weekbackdate = wbyear + "-" + (wbmonth <= 9 ? '0' + wbmonth : wbmonth) + "-" + (wbdate <= 9 ? '0' + wbdate : wbdate);
    document.getElementById("From").value = weekbackdate;
    document.getElementById("To").value = todaydate;
    sendCategory();
}
function keywordInput(){
    document.getElementById("Keyword").style.border="0px";
}
function checkForm() {
    var StartDate = document.getElementById('From').value;
    var EndDate = document.getElementById('To').value;
    var eDate = new Date(EndDate);
    var sDate = new Date(StartDate);
    if (StartDate != '' && EndDate != '' && sDate > eDate) {
        alert("Incorrect time");
        return false;
    }
    else {
        var keywordvalue = document.getElementById("Keyword").value;
        var stdate = document.getElementById("From").value;
        var edate = document.getElementById("To").value;
        var psource = document.getElementById("Source");
        var formsource = psource.options[psource.selectedIndex].value;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', '/displayresult?keywordvalue=' + keywordvalue + '&' + 'stdate=' + stdate + '&' + 'edate=' + edate + '&' + 'formsource=' + formsource, true);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                finalObj = JSON.parse(xmlhttp.responseText);
                onloadl = generateDisplayResults(finalObj);
            }else if(this.readyState == XMLHttpRequest.DONE && this.status == 503){
                finalObj = JSON.parse(xmlhttp.responseText);
                alert(finalObj.message);
            }
        };
        xmlhttp.send();
    }
}


function generateDisplayResults(finalObj) {
    document.getElementById("result").innerHTML="";
    var pn = document.createElement("p");
    pn.id="pn";
    document.getElementById("result").appendChild(pn);
    pn.innerHTML="No Results";
    document.getElementById("pn").style.display="none";
    var dr = 0;
    if(finalObj.length==0){
        document.getElementById("pn").style.display="";
        document.getElementById("showtime").style.display="none";
        document.getElementById("hidetime").style.display="none";
    }
    else{
        document.getElementById("result").innerHTML="";
        while (dr<finalObj.length) {
            if (dr == 5) {
                createExtraCards(finalObj);
                break;
            }
            var parentdiv = document.getElementById("result");
            var divcard = document.createElement("div");
            divcard.className = "card";
            var dimg = document.createElement("div");
            dimg.className="dimg";
            var divimage = document.createElement("img");
            divimage.src = finalObj[dr].urlToImage;
            divimage.id = "dimage";
            var divcontainer = document.createElement("div");
            divcontainer.className = "container";
            var pone = document.createElement("p");
            pone.id = "pone";
            pone.style.marginBottom="5px";
            pone.innerHTML = finalObj[dr].title;
            var pcross = document.createElement("a");
            pcross.id="pcross";
            pcross.innerHTML = "x";
            pcross.style.fontFamily="sans-serif";
            
            var ptwo = document.createElement("p");
            ptwo.id = "ptwo";

            var pspantitle = document.createElement("span");
            pspantitle.id="pspantitle";
            pspantitle.innerHTML="";
            if(finalObj[dr].description.length>67){
                var index = 0;
                var strValue = finalObj[dr].description;
                for(var i=0;i<67;i++){
                    if(strValue[i] == " "){
                        index = i;
                    }
                }
                var truncatedtitle = finalObj[dr].description.substring(0,index)+ "<span>...<span>";
                ptwo.innerHTML = truncatedtitle; 
                pspantitle.innerHTML=finalObj[dr].description.substring(index,finalObj[dr].description.length);                   
            }
            else{
                var truncatedtitle = finalObj[dr].description;
                ptwo.innerHTML = truncatedtitle;
            }

            ptwo.appendChild(pspantitle);
            pspantitle.style.display="none";
            var pauthor = document.createElement("p");
            pauthor.id = "pauthor";
            pauthor.innerHTML = "<b>Author:  </b>" + finalObj[dr].author;
            pauthor.style.fontSize="13px";
            pauthor.style.marginTop="0px";
            pauthor.style.marginBottom="0px";
            var psource = document.createElement("p");
            psource.id = "psource";
            psource.innerHTML = "<b>Source:  </b>" + finalObj[dr].source['name'];
            psource.style.marginBottom="0px";
            psource.style.fontSize="13px";
            psource.style.marginTop="5px";
            var pdate = document.createElement("p");
            pdate.id = "pdate";
            var carddate = new Date(finalObj[dr].publishedAt);
            var tdate = carddate.getDate();
            var tmonth = carddate.getMonth() + 1;
            var tyear = carddate.getFullYear();
            var cdate = (tmonth <= 9 ? '0' + tmonth : tmonth) + "/" + (tdate <= 9 ? '0' + tdate : tdate) + "/" + tyear;
            pdate.style.marginTop="5px";
            pdate.innerHTML = "<b>Date:  </b>" + cdate;
            pdate.style.fontSize="13px";
            var plink = document.createElement("a");
            pdate.style.marginBottom="5px";
            plink.id = "plink";
            plink.setAttribute("href", finalObj[dr].url);
            plink.setAttribute("target","_blank");
            plink.innerHTML= "See Original Post";
            ptwo.style.marginBottom="2px";
           
            parentdiv.appendChild(divcard);
            divcard.appendChild(dimg);
            dimg.appendChild(divimage);
            divcard.appendChild(divcontainer);
            //inner div tag conatains two p tag
            divcontainer.appendChild(pone);
            divcard.appendChild(pcross);
            divcontainer.appendChild(pauthor);
            divcontainer.appendChild(psource);
            divcontainer.appendChild(pdate);
            divcontainer.appendChild(ptwo);
            divcontainer.appendChild(plink);
            pcross.style.display="none";
            pauthor.style.display = "none";
            psource.style.display = "none";
            pdate.style.display = "none";
            plink.style.display = "none";
            divcard.addEventListener("click", function(event){
                if(event.target.innerHTML=="x"){
                    this.style.cursor="pointer";
                    this.children[2].style.cursor="pointer"; 
                    this.children[1].children[1].style.display="none";
                    this.children[1].children[2].style.display="none";
                    this.children[1].children[3].style.display="none";
                    this.children[1].children[4].children[0].style.display="";
                    if(this.children[1].children[4].children[1]){
                        this.children[1].children[4].children[1].style.display="none";
                    }
                    this.children[1].children[5].style.display="none";
                    
                    event.target.style.display="none";    
                }
                else{
                    this.style.cursor="default";
                    this.children[2].style.display="";
                    this.children[1].children[1].style.display="";
                    this.children[1].children[1].style.cursor="text";
                    this.children[1].children[2].style.display="";
                    this.children[1].children[2].style.cursor="text";
                    this.children[1].children[3].style.display="";
                    this.children[1].children[3].style.cursor="text";
                    this.children[1].children[4].children[0].style.display="none";
                    if(this.children[1].children[4].children[1]){
                        this.children[1].children[4].children[1].style.display="";
                    }
                    this.children[1].children[4].style.cursor="text";
                    this.children[1].children[5].style.display="";
                   
                }
            },false); 
       dr++;
        }
        if (finalObj.length > 5) {
            //alert("upto button");
            document.getElementById("showtime").style.display="";
            document.getElementById("showtime").onclick = function () { generateExtraResults() };
        }
    }
}

function createExtraCards(finalObj) {
    var parentdiv = document.getElementById("result");
    var extrarsults = document.createElement("div");
    extrarsults.id = "extracard";
    extrarsults.style.display = "none";
    parentdiv.appendChild(extrarsults);
    for (var dr = 5; dr < finalObj.length; dr++) {
        var divcard = document.createElement("div");
        divcard.className = "card";
        var dimg = document.createElement("div");
        dimg.className="dimg";
        var divimage = document.createElement("img");
        divimage.src = finalObj[dr].urlToImage;
        divimage.id = "dimage";
        var divcontainer = document.createElement("div");
        divcontainer.className = "container";
        var pone = document.createElement("p");
        pone.id = "pone";
        pone.innerHTML = finalObj[dr].title;
        pone.style.marginBottom="5px";
        var pcross = document.createElement("a");
        pcross.id="pcross";
        pcross.innerHTML = "x";
        var ptwo = document.createElement("p");
        ptwo.id = "ptwo";
        var pspantitle = document.createElement("span");
        pspantitle.id="pspantitle";
        pspantitle.innerHTML="";
        if(finalObj[dr].description.length>67){
            var index = 0;
            var strValue = finalObj[dr].description;
            for(var i=0;i<67;i++){
                if(strValue[i] == " "){
                    index = i;
                }
            }
            var truncatedtitle = finalObj[dr].description.substring(0,index)+ "<span>...<span>";
            ptwo.innerHTML = truncatedtitle; 
            pspantitle.innerHTML=finalObj[dr].description.substring(index,finalObj[dr].description.length);                   
        }
        else{
            var truncatedtitle = finalObj[dr].description;
            ptwo.innerHTML = truncatedtitle;
        }
        ptwo.appendChild(pspantitle);
        pspantitle.style.display="none";
        var pauthor = document.createElement("p");
        pauthor.id = "pauthor";
        pauthor.innerHTML = "<b>Author:  </b>" + finalObj[dr].author;
        pauthor.style.fontSize="13px";
        pauthor.style.marginTop="0px";
        pauthor.style.marginBottom="0px";
        var psource = document.createElement("p");
        psource.id = "psource";
        psource.innerHTML = "<b>Source:  </b>" + finalObj[dr].source['name'];
        psource.style.marginBottom="0px";
        psource.style.fontSize="13px";
        psource.style.marginTop="5px";
        var pdate = document.createElement("p");
        pdate.id = "pdate";
        var carddate = new Date(finalObj[dr].publishedAt);
        var tdate = carddate.getDate();
        var tmonth = carddate.getMonth() + 1;
        var tyear = carddate.getFullYear();
        var cdate = (tmonth <= 9 ? '0' + tmonth : tmonth) + "/" + (tdate <= 9 ? '0' + tdate : tdate) + "/" + tyear;
        pdate.style.marginTop="5px";
        pdate.innerHTML = "<b>Date:  </b>" + cdate;
        pdate.style.fontSize="13px";
        var plink = document.createElement("a");
        pdate.style.marginBottom="5px";
        plink.id = "plink";
        plink.setAttribute("href", finalObj[dr].url);
        plink.setAttribute("target","_blank");
        plink.innerHTML= "See Original Post";
        ptwo.style.marginBottom="2px";
        extrarsults.appendChild(divcard);
        divcard.appendChild(dimg);
        dimg.appendChild(divimage);
        divcard.appendChild(divcontainer);
        //inner div tag conatains two p tag
        divcontainer.appendChild(pone);
        divcard.appendChild(pcross);
        divcontainer.appendChild(pauthor);
        divcontainer.appendChild(psource);
        divcontainer.appendChild(pdate);
        divcontainer.appendChild(ptwo);
        divcontainer.appendChild(plink);      
        pcross.style.display="none";
        pauthor.style.display = "none";
        psource.style.display = "none";
        pdate.style.display = "none";
        plink.style.display = "none";
        divcard.addEventListener("click", function(event){
            if(event.target.innerHTML=="x"){
                this.style.cursor="pointer";
                this.children[2].style.cursor="pointer"; 
                this.children[1].children[1].style.display="none";
                this.children[1].children[2].style.display="none";
                this.children[1].children[3].style.display="none";
                this.children[1].children[4].children[0].style.display="";
                if(this.children[1].children[4].children[1]){
                    this.children[1].children[4].children[1].style.display="none";
                }
                this.children[1].children[5].style.display="none";
                event.target.style.display="none";  
            }
            else{
                this.style.cursor="default";
                    this.children[2].style.display="";
                    this.children[1].children[1].style.display="";
                    this.children[1].children[1].style.cursor="text";
                    this.children[1].children[2].style.display="";
                    this.children[1].children[2].style.cursor="text";
                    this.children[1].children[3].style.display="";
                    this.children[1].children[3].style.cursor="text";
                    this.children[1].children[4].children[0].style.display="none";
                    if(this.children[1].children[4].children[1]){
                        this.children[1].children[4].children[1].style.display="";
                    }
                    this.children[1].children[4].style.cursor="text";
                    this.children[1].children[5].style.display="";
            }
        },false); 
    }
}
function generateExtraResults() {
    document.getElementById("showtime").style.display = "none";
    document.getElementById("hidetime").style.display = "block";
    document.getElementById("extracard").style.display = "block";
    document.getElementById("hidetime").onclick = function () { removeExtraResults() };
}

function removeExtraResults() {
    document.getElementById("hidetime").style.display = "none";
    document.getElementById("showtime").style.display = "block";
    document.getElementById("extracard").style.display = "none";
}

function sendCategory() {
    var pcat = document.getElementById("Category");
    var formcategory = pcat.options[pcat.selectedIndex].value;
    //alert("validared");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', '/sourcefornews?formcategory=' + formcategory, 'true');
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            //alert("achieved");
            sourceObj = JSON.parse(xmlhttp.responseText);
            onloadl = generateSource(sourceObj);
        }
    };
    xmlhttp.send();
}
function generateSource(sourceObj) {
    for (var s = 0; s < sourceObj.length; s++) {
        var selectmenu = document.getElementById("Source");
        var newoption = document.createElement("option");
        newoption.appendChild(document.createTextNode(sourceObj[s].name));
        newoption.value = sourceObj[s].id;
        selectmenu.appendChild(newoption);
    }
}

function setFormToDefault(){
    var today = new Date();
    var tdate = today.getDate();
    var tmonth = today.getMonth() + 1;
    var tyear = today.getFullYear();
    var todaydate = tyear + "-" + (tmonth <= 9 ? '0' + tmonth : tmonth) + "-" + (tdate <= 9 ? '0' + tdate : tdate);
    var weekback = new Date();
    weekback.setDate( weekback.getDate() - 7 );
    var wbdate = weekback.getDate();
    var wbmonth = weekback.getMonth() + 1;
    var wbyear = weekback.getFullYear();
    var weekbackdate = wbyear + "-" + (wbmonth <= 9 ? '0' + wbmonth : wbmonth) + "-" + (wbdate <= 9 ? '0' + wbdate : wbdate);
    document.getElementById("Keyword").value="";
    document.getElementById("To").value=todaydate;
    document.getElementById("From").value=weekbackdate;
    document.getElementById("Category").selectedIndex=0;
    document.getElementById("Source").selectedIndex=0;
    
    document.getElementById("result").innerHTML="";
    document.getElementById("showtime").style.display="none";
    document.getElementById("hidetime").style.display="none";
}