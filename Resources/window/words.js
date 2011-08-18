var win = Titanium.UI.currentWindow;
var createView = function (){
    var wordList;

    if ( Ti.App.Properties.hasProperty('wordList') ) {
        wordList = Ti.App.Properties.getList('wordList');
    }
    else {
        wordList = [];
    }
    
    var rows = [];
    for (var i = 0; i < wordList.length; i++)
    {
        rows[i] = {title:wordList[i]};
    }
    
    var tableView = Titanium.UI.createTableView({
        data: rows
    });
    
    win.add(tableView);
};
win.addEventListener('focus', createView);

var plusButton = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.ADD
});
plusButton.addEventListener('click', function(){
    var add_word = Titanium.UI.createWindow({  
        title:'ワード登録',
        backgroundColor:'#fff',
        barColor:'#76A2D4',
        url:'add_word.js'
    });
    win.tab.open(add_word);
});
win.setRightNavButton(plusButton);

var removeButton = Titanium.UI.createButton({
    systemButton:Titanium.UI.iPhone.SystemButton.TRASH
});
removeButton.addEventListener('click', function(){
    var remove_word = Titanium.UI.createWindow({  
        title:'全ワード削除',
        backgroundColor:'#fff',
        barColor:'#76A2D4',
        url:'remove_word.js'
    });
    win.tab.open(remove_word);
});
win.setLeftNavButton(removeButton);
