// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

// define tab
var tab_names = {
    news:   "ニュース一覧",
    words:  "登録ワード一覧"
};

// register tab
for (var tab_name in tab_names) {

    var win = Titanium.UI.createWindow({  
        title:tab_names[tab_name],
        backgroundColor:'#fff',
        barColor:'#76A2D4',
        url:'window/' + tab_name + '.js'
    });
    
    var tab = Titanium.UI.createTab({  
        icon:'KS_nav_views.png',
        title:tab_names[tab_name],
        window:win
    });

    tabGroup.addTab(tab);  
}

// open tab group
tabGroup.open();
