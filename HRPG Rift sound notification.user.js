// ==UserScript==
// @name         HRPG Rift sound notification
// @namespace    http://heroesrpg.com/
// @version      0.2
// @description  Little HRPG helper with features approved by Carl
// @author       Code
// @match        http://www.heroesrpg.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $('#header').prepend('<a>Rift notifier by Code v03</a> | ');

    var _audio;
    $( document ).ajaxSuccess(function( event, xhr, settings ) {
        if ( settings.url == "chatupdate2.php" ) {
            var response = JSON.parse(xhr.responseText);
            _work(response);
        }
    });

    function _work(data){
        if(data.c){
            $.each(data.c, function(i, item) {
                if($.inArray(data.c[i].uid, ignored) < 0) {
                    if(data.c[i].type == 10) {
                        console.log(data.c[i].message.indexOf('A Rift will open in 5 minutes') !== -1);
                        if(data.c[i].message.indexOf('A Rift will open in 5 minutes') !== -1){
                            _play();
                        }
                    }
                }
            });
        }
    }

    function _play(){
        if(!_audio){
            _audio = new Audio('https://github.com/minajevs/about_me/raw/master/bell.mp3');
        }
        _audio.play();
    }
})();
