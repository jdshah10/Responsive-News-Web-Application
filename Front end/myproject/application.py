from flask import Flask,jsonify,request
from newsapi import NewsApiClient
from collections import OrderedDict
#import json
application=Flask(__name__)
@application.route('/')
def Index():
    #print("hello")
    return application.send_static_file('currentnews.html')
#    newsapi = NewsApiClient(api_key="10f35268a4d94987b67e28acc18319a2")
#    top_headlines = newsapi.get_top_headlines(q=‘bitcoin’, sources=’bbc-news,the-verge’, category='business', language=’en’, country=‘us’)"""

@application.route('/currentaffairs')
def cunew():
    newsapi = NewsApiClient(api_key="10f35268a4d94987b67e28acc18319a2")
    top_headlines = newsapi.get_top_headlines(page_size=30)
    articles = top_headlines['articles']
    author = []
    description = []
    newstitle = []
    newsurl = []
    newsurltoimage = []
    publishedat = []
    source = []
    datadic = []
    for i in range(len(articles)):
        sourcearticles = articles[i]
        author.append(sourcearticles['author'])
        description.append(sourcearticles['description'])
        newstitle.append(sourcearticles['title'])
        newsurl.append(sourcearticles['url'])
        newsurltoimage.append(sourcearticles['urlToImage'])  
        publishedat.append(sourcearticles['publishedAt'])
        source.append(sourcearticles['source'])
    for j in range(len(source)):
        if(source[j]['id'] != None and source[j]['id'].lower()!="null" and source[j]['id']!="" and source[j]['name']!=None and source[j]['name'].lower()!="null" and source[j]['name']!="" and author[j]!=None and author[j].lower()!="null" and author[j]!="" and description[j]!=None and description[j].lower()!="null" and description[j]!="" and newstitle[j]!=None and newstitle[j].lower()!="null" and newstitle[j]!="" and newsurl[j]!=None and newsurl[j].lower()!="null" and newsurl[j]!="" and newsurltoimage[j]!=None and newsurltoimage[j].lower()!="null" and newsurltoimage[j]!="" and publishedat[j] != None and publishedat[j]!="" and publishedat[j].lower()!="null"):
            Dict = dict({'source':source[j], 'author':author[j], 'title': newstitle[j], 'description': description[j], 'url':newsurl[j], 'urlToImage':newsurltoimage[j], 'publishedAt':publishedat[j]}) 
            datadic.append(Dict)
    return jsonify(datadic[0:5])


@application.route('/cnnaffairs')
def cnnnews():
    newsapi = NewsApiClient(api_key="10f35268a4d94987b67e28acc18319a2")
    top_headlines = newsapi.get_top_headlines(sources="cnn", page_size=30)
    articles = top_headlines['articles']
    author = []
    description = []
    newstitle = []
    newsurl = []
    newsurltoimage = []
    publishedat = []
    source = []
    datadic = []
    for i in range(len(articles)):
        sourcearticles = articles[i]
        author.append(sourcearticles['author'])
        description.append(sourcearticles['description'])
        newstitle.append(sourcearticles['title'])
        newsurl.append(sourcearticles['url'])
        newsurltoimage.append(sourcearticles['urlToImage'])  
        publishedat.append(sourcearticles['publishedAt'])
        source.append(sourcearticles['source'])
    for j in range(len(source)):
        if(source[j]['id'] != None and source[j]['id'].lower()!="null" and source[j]['id']!="" and source[j]['name']!=None and source[j]['name'].lower()!="null" and source[j]['name']!="" and author[j]!=None and author[j].lower()!="null" and author[j]!="" and description[j]!=None and description[j].lower()!="null" and description[j]!="" and newstitle[j]!=None and newstitle[j].lower()!="null" and newstitle[j]!="" and newsurl[j]!=None and newsurl[j].lower()!="null" and newsurl[j]!="" and newsurltoimage[j]!=None and newsurltoimage[j].lower()!="null" and newsurltoimage[j]!="" and publishedat[j] != None and publishedat[j]!="" and publishedat[j].lower()!="null"):
            Dict = dict({'source':source[j], 'author':author[j], 'title': newstitle[j], 'description': description[j], 'url':newsurl[j], 'urlToImage':newsurltoimage[j], 'publishedAt':publishedat[j]}) 
            datadic.append(Dict)
    return jsonify(datadic[0:4])


@application.route('/foxaffairs')
def foxnews():
    newsapi = NewsApiClient(api_key="10f35268a4d94987b67e28acc18319a2")
    top_headlines = newsapi.get_top_headlines(sources="fox-news",page_size=30)
    articles = top_headlines['articles']
    author = []
    description = []
    newstitle = []
    newsurl = []
    newsurltoimage = []
    publishedat = []
    source = []
    datadic = []
    for i in range(len(articles)):
        sourcearticles = articles[i]
        author.append(sourcearticles['author'])
        description.append(sourcearticles['description'])
        newstitle.append(sourcearticles['title'])
        newsurl.append(sourcearticles['url'])
        newsurltoimage.append(sourcearticles['urlToImage'])  
        publishedat.append(sourcearticles['publishedAt'])
        source.append(sourcearticles['source'])
    for j in range(len(source)):
        if(source[j]['id'] != None and source[j]['id'].lower()!="null" and source[j]['id']!="" and source[j]['name']!=None and source[j]['name'].lower()!="null" and source[j]['name']!="" and author[j]!=None and author[j].lower()!="null" and author[j]!="" and description[j]!=None and description[j].lower()!="null" and description[j]!="" and newstitle[j]!=None and newstitle[j].lower()!="null" and newstitle[j]!="" and newsurl[j]!=None and newsurl[j].lower()!="null" and newsurl[j]!="" and newsurltoimage[j]!=None and newsurltoimage[j].lower()!="null" and newsurltoimage[j]!="" and publishedat[j] != None and publishedat[j]!="" and publishedat[j].lower()!="null"):
            Dict = dict({'source':source[j], 'author':author[j], 'title': newstitle[j], 'description': description[j], 'url':newsurl[j], 'urlToImage':newsurltoimage[j], 'publishedAt':publishedat[j]}) 
            datadic.append(Dict)
    return jsonify(datadic[0:4])

@application.route('/sourcefornews')
def sourcenews():
    newsapi = NewsApiClient(api_key="10f35268a4d94987b67e28acc18319a2")
    fcat = request.args['formcategory'].lower()
    if(fcat == "all"):
        top_headlines = newsapi.get_sources(language='en',country='us')
    else:    
        top_headlines = newsapi.get_sources(category=fcat,language='en',country='us')
    #top_headlines = newsapi.get_top_headlines(category=fcat,language='en',country='us')
    articles = top_headlines['sources']
    cid = []
    cname = []
    datadic = []
    for i in range(len(articles)):
        sourcec = articles[i]
        cid.append(sourcec['id'])
        cname.append(sourcec['name'])
    for j in range(len(articles)):
        if(cid[j]!=None and cid[j]!="" and cid[j]!="null" and cname[j]!=None and cname[j]!="" and cname[j]!="null"):
            Dict = dict({'id':cid[j],'name':cname[j]})
            datadic.append(Dict)
    return jsonify(datadic[0:10])

@application.route('/displayresult')
def finalresult():
    try:
        newsapi = NewsApiClient(api_key="10f35268a4d94987b67e28acc18319a2")
        fkeyword = request.args['keywordvalue']
        fstartdate = request.args['stdate']
        fenddate = request.args['edate']
        fsource = request.args['formsource']
        if (fsource == "all"):
                top_headlines = newsapi.get_everything(q=fkeyword, from_param=fstartdate, to=fenddate, language='en', sort_by='publishedAt',page_size=30)
        else:
            top_headlines = newsapi.get_everything(q=fkeyword, sources=fsource, from_param=fstartdate, to=fenddate, language='en', sort_by='publishedAt',page_size=30)
        articles = top_headlines['articles']
        #print(articles)
        author = []
        description = []
        newstitle = []
        newsurl = []
        newsurltoimage = []
        publishedat = []
        source = []
        datadic = []
        for i in range(len(articles)):
            sourcearticles = articles[i]
            author.append(sourcearticles['author'])
            description.append(sourcearticles['description'])
            newstitle.append(sourcearticles['title'])
            newsurl.append(sourcearticles['url'])
            newsurltoimage.append(sourcearticles['urlToImage'])  
            publishedat.append(sourcearticles['publishedAt'])
            source.append(sourcearticles['source'])
        for j in range(len(source)):
            if(source[j]['id'] != None and source[j]['id'].lower()!="null" and source[j]['id']!="" and source[j]['name']!=None and source[j]['name'].lower()!="null" and source[j]['name']!="" and author[j]!=None and author[j].lower()!="null" and author[j]!="" and description[j]!=None and description[j].lower()!="null" and description[j]!="" and newstitle[j]!=None and newstitle[j].lower()!="null" and newstitle[j]!="" and newsurl[j]!=None and newsurl[j].lower()!="null" and newsurl[j]!="" and newsurltoimage[j]!=None and newsurltoimage[j].lower()!="null" and newsurltoimage[j]!="" and publishedat[j] != None and publishedat[j]!="" and publishedat[j].lower()!="null"):
            #if(source[j]['id'] != None and source[j]['id']!="" and source[j]['name']!=None and source[j]['name']!="" and author[j]!=None and author[j]!="" and description[j]!=None and description[j]!="" and newstitle[j]!=None and newstitle[j]!="" and newsurl[j]!=None and newsurl[j]!="" and newsurltoimage[j]!=None and newsurltoimage[j]!="" and publishedat[j] != None and publishedat[j]!=""):
                Dict = dict({'source':source[j], 'author':author[j], 'title': newstitle[j], 'description': description[j], 'url':newsurl[j], 'urlToImage':newsurltoimage[j], 'publishedAt':publishedat[j]}) 
                datadic.append(Dict)
        return jsonify(datadic[0:15])
    except Exception as olddateexception:
        error = {}
        error['message'] = olddateexception.exception['message']
        return jsonify(error), 503



@application.route('/wcloud')
def newsworldcloud():
    f = open('stopwords_en.txt','r')
    lopp = 0
    Stopwordsdict = dict()
    for i in f:
        j = i.rstrip('\n')
        Stopwordsdict[lopp+1] = j
        lopp+=1
    #print(Stopwordsdict)
    newsapi = NewsApiClient(api_key="10f35268a4d94987b67e28acc18319a2")
    top_headlines = newsapi.get_top_headlines(page_size=30)
    articles = top_headlines['articles']
    newstitle = []
    keywordset = []
    keywordcount = []
    keyworddict = OrderedDict()
    kdd = OrderedDict()
    for i in range(len(articles)):
        sourcearticles = articles[i]
        newstitle.append(sourcearticles['title'].split(" "))
    for i in newstitle:
        for j in i:
            if(j not in Stopwordsdict.values()):
                keywordset.append(j)
    for i in keywordset:
        keywordcount.append(keywordset.count(i))
    #print(keywordcount)
    for i in range(len(keywordset)):
        keyworddict[keywordset[i]] = keywordcount[i]
    for w in sorted(keyworddict, key=keyworddict.get, reverse=True):
        kdd[w] = keyworddict[w]
    
    k = min(len(kdd),30)
    ml = []
    j=0
    for x in kdd:

        if(j==k):
            break
        y = {}
        y['word'] = x
        y['size'] =  str(kdd[x]*5)
        ml.append(y)
        j+=1
    return jsonify(ml)



if __name__ == "__main__":
    application.run(debug=True)

