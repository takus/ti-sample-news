var win = Titanium.UI.currentWindow;
var data = [];
var query;

if ( Ti.App.Properties.hasProperty('lastWord') ) {
    query = Ti.App.Properties.getString('lastWord');
}

function make_query_url () {
    base_url = 'http://news.yahooapis.jp/NewsWebService/V1/heading?';
    appid = 'YOUR_API_KEY';
    start_date = '201001010000';
    results = 20;

    url = base_url + 'appid=' + appid + '&startdate=' + start_date + '&results=' + results;
    if(query != null) {
        url += '&query=' + query;
        return url;
    }
    else {
        return url;
    }
}

function createView() {
    var tableView = Titanium.UI.createTableView({
        data:data,
        filterAttribute:'filter',
        backgroundColor:'white'
    });
    tableView.addEventListener('click', function(e) {
        var w = Ti.UI.createWindow({
            title:e.rowData.title_text,
            backgroundColor:'#fff',
            barColor:'#76A2D4'
        });
        w.orientationModes = [
           Titanium.UI.PORTRAIT,
           Titanium.UI.LANDSCAPE_LEFT,
           Titanium.UI.LANDSCAPE_RIGHT
        ];

        var webview = null;
        webview = Ti.UI.createWebView();
        webview.url = e.rowData.url;
        w.add(webview);

        win.tab.open(w);
    });
    win.add(tableView);

    var r = Titanium.UI.createButton({
	    systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
    });
    r.addEventListener('click',function(){
        xhr.open("GET", url);
        xhr.send();
    });
    win.setRightNavButton(r);
}

var url = make_query_url();
var xhr = Titanium.Network.createHTTPClient();
Ti.API.debug(url);

xhr.onload = function() {
    var doc = this.responseXML.documentElement;
	var results = doc.getElementsByTagName("Result");

	for (var i = 0; i < results.length; i++) {
        var item = results.item(i);
        
        var row = Ti.UI.createTableViewRow();
        row.selectedBackgroundColor = '#fff';
        row.height = 45;
        row.className = 'datarow';
        row.clickName = 'row';
        row.title_text = item.getElementsByTagName("Title").item(0).text;
        row.url = item.getElementsByTagName("SmartphoneUrl").item(0).text;

        var date = Ti.UI.createLabel({
            color:'#AAAAAA',
   	        font:{fontSize:10, fontWeight:'bold', fontFamily:'Arial'},
   	        left:5,
   	        top:2,
   	        height:20,
   	        width:250,
            text:item.getElementsByTagName("StartDate").item(0).text
        });

        var title = Ti.UI.createLabel({
   	       color:'#576996',
   	       font:{fontSize:12, fontWeight:'bold', fontFamily:'Arial'},
   	       left:5,
   	       top:22,
   	       height:20,
   	       width:250,
   	       text:item.getElementsByTagName("Title").item(0).text
        });

        var pv = Ti.UI.createLabel({
   	       color:'#576996',
   	       font:{fontSize:14, fontFamily:'Arial'},
   	       textAlign:'right',
           left:250,
   	       top:0,
   	       height:45,
   	       width:70,
   	       text:item.getElementsByTagName("PvTotal").item(0).text + ' PV'
        });

        row.add(date);
        row.add(title);
        row.add(pv);

        data.push(row);
    }
    createView();
};

xhr.open("GET", url);
xhr.send();
