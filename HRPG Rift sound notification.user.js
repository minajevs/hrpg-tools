// ==UserScript==
// @name         HRPG sound notification
// @namespace    http://heroesrpg.com/
// @version      1.3
// @description  Little HRPG helper with features approved by Carl
// @author       Code
// @match        http://www.heroesrpg.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var _savedSettings = localStorage.getItem('_savedSettings');
    var _savedSettings_PM = localStorage.getItem('_savedSettings_PM');
    if(!_savedSettings || _savedSettings_PM === "undefined"){
        _reset();
    }
    $('#header').prepend('<a id="_notifierSettings">Notifier by Code v1.3</a> | ');
    $('#_notifierSettings').on('click', function(){
        showPopup();
        $('#popup-title').html('Sound notifier settings');
        $('#popup-content').html('<p>What text (only Global) triggers sound alarm. Separate with ";":</p><br/><textarea id="_triggers" cols="50"></textarea><br/><input id="_pmTrigger" type="checkbox"><label for="_pmTrigger">Play sound on PM</label><br/><input type="button" id="_save" value="Save"/> | <input type="button" id="_reset" value="Reset"/><br/><div style="position:absolute;bottom:0;right:0;">Made by Code. Special thanks to euphone.</div>');
        $('#_triggers').val(localStorage.getItem('_savedSettings'));
        $('#_pmTrigger').prop('checked'localStorage.getItem('_savedSettings_PM'));  
        $('#_save').on('click', function(){
            localStorage.setItem('_savedSettings', $('#_triggers').val());
            localStorage.setItem('_savedSettings_PM', $('#_pmTrigger').prop('checked'));
        });
        $('#_reset').on('click', _reset);
    });

    function _reset(){
        localStorage.setItem('_savedSettings', 'A Rift will open in 5 minutes;Rift has opened!;');
        localStorage.setItem('_savedSettings_PM', false);
        $('#_triggers').val(localStorage.getItem('_savedSettings'));
        $('#_pmTrigger').prop('checked', localStorage.getItem('_savedSettings_PM'));
    }

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
                        var _triggers = localStorage.getItem('_savedSettings').split(";");
                        for(var j = 0; j < _triggers.length; j++){
                            var _trigger = _triggers[j];
                            if(_trigger && _trigger !== ''){
                                if(data.c[i].message.indexOf(_trigger) !== -1){
                                    _play();
                                }
                            }
                        }
                    }
                }
                if(localStorage.getItem('_savedSettings_PM') && $.inArray(data.c[i].uid, ignored) < 0) {
                    if(data.c[i].type == 50) {
                        _play();
                    }
                 }
            });
        }
    }

    function _play(){
        if(!_audio){
            _audio = new Audio('https://github.com/minajevs/hrpg-tools/raw/master/bell.mp3');
        }
        _audio.play();
    }
})();
