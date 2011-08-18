var win = Titanium.UI.currentWindow;

var l = Titanium.UI.createLabel({
	text:'全てのワードを削除してもいいですか？',
	font:{fontSize:14},
	left:10,
	top:10,
	width:300,
	height:'auto'
});
win.add(l);

var yes_button = Titanium.UI.createButton({
    title:'はい',
    font:{fontSize:14},
	left:40,
	top:30,
	width:80,
    height:40
});
yes_button.addEventListener('click', function(e){
    wordList = [];
    Ti.App.Properties.setList('wordList', wordList);
    win.close();
});
win.add(yes_button);

var no_button = Titanium.UI.createButton({
    title:'いいえ',
    font:{fontSize:14},
	left:140,
	top:30,
	width:80,
	height:40
});
no_button.addEventListener('click', function(e){
    win.close();
});
win.add(no_button);
