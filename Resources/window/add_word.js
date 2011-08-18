var win = Titanium.UI.currentWindow;

// Load Word List
var wordList;
if ( Ti.App.Properties.hasProperty('wordList') ) {
    wordList = Ti.App.Properties.getList('wordList');
}
else {
    wordList = [];
}

// Create Label
var label = Titanium.UI.createLabel({
	text:'単語を入力してください',
	font:{fontSize:14},
	left:10,
	top:10,
	width:300,
	height:'auto'
});
win.add(label);

// Crete Text Field
var textField = Titanium.UI.createTextField({
	color:'#336699',
	height:35,
	top:30,
	left:10,
	width:250,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
win.add(textField);

// Event Listener
textField.addEventListener('return', function(e) {
	wordList.push(e.value);
    Ti.App.Properties.setList('wordList', wordList);
    win.close();
});

