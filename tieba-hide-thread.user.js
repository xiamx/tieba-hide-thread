// ==UserScript==
// @name       Tieba Hide Thread
// @namespace  http://cgi.cs.mcgill.ca/~mxia3/
// @version    0.1
// @description  Hide posts from users that you don't want to see. 
// @match      http://tieba.baidu.com/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @copyright  2013, You
// ==/UserScript==

var hideUser = new Array();

var addUserHide = function(user){
    hideUser.push(user);
    GM_setValue('hideuser', hideUser.join(","));
};

var loadUserHide = function(){
    var hu;
    hu = GM_getValue('hideuser').split(",");
        hideUser = hu;
};

var addResetButton = function (){
    var resetButton;
    resetButton = $("<a class='hidingresetbtn' href='javascript:'>Reset Hide</a>");
    resetButton.appendTo($(".dir_rank"));
    $(".hidingresetbtn").click(function (e){hideUser = new Array(); GM_setValue('hideuser', '');});
};

var addHideButton = function(i){
    var deletebutton;
    var authorname;
    deletebutton = $("<a href=\"javascript:\">[x]</a>");
    deletebutton.appendTo($(this));
    deletebutton.click(function(e){
        authorname = $(e.target).siblings().eq(0).text();
        console.debug(authorname);
        addUserHide(authorname);
        $(e.target).parents().eq(4).remove();
    });
};

var deleteUserThread = function(e){
    
    if ($.inArray($(this).text(), hideUser)!=-1){
        $(this).parents().eq(3).remove();
        console.debug($(this).text());
    }
};

loadUserHide();
addResetButton();
console.debug("GMVALUE: "+ hideUser);
$(".tb_icon_author").each(deleteUserThread);
$(".tb_icon_author").each(addHideButton);
