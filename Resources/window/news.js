var win = Titanium.UI.currentWindow;
var data = [];
var wordList;

var createWordView = function (){
    if ( Ti.App.Properties.hasProperty('wordList') ) {
        wordList = Ti.App.Properties.getList('wordList');
    }
    else {
        wordList = [];
    }
   
    if (wordList.length > 0) {
        var rows = [];
        for (var i = 0; i < wordList.length; i++)
        {
            rows[i] = {title:wordList[i]};
        }
        
        var tableView = Titanium.UI.createTableView({
            data: rows
        });
        tableView.addEventListener('click', function(e){
            Ti.App.Properties.setString('lastWord', e.rowData.title);
            var w = Ti.UI.createWindow({
                title:e.rowData.title,
                backgroundColor:'#fff',
                barColor:'#76A2D4',
                url:'news_detail.js'
            });
            win.tab.open(w);    
        });
        win.add(tableView);
    }
    else {
        var notice = Titanium.UI.createWebView({
            backgroundColor: '#fff',
        });
        notice.html = '<html><body><h1>使い方</h1><h2>ワード登録</h2><p>画面下部の登録ワード一覧を選択し、ワードを登録する。</p><h2>ニュース閲覧</h2><p>画面下部のニュース一覧を選択し、見たいニュースのワードを選択する。</p><hr /><h2>ニュース提供</h2>Yahoo! Japan</body></html>';
        win.add(notice);
    }
};

win.addEventListener('focus', createWordView);
