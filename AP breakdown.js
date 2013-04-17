// ==UserScript==
// @name       Total AP Gain
// @namespace  http://github/
// @version    0.1
// @description    Calculate AP gain for a single player
// @include        http://www.ingress.com/intel*
// @include        https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @copyright  2013, languan
// ==/UserScript==

function apGain() {
    // ensure plugin framework is there, even if iitc is not yet loaded
    if(typeof window.plugin !== 'function') 
        window.plugin = function() {};
    
    // PLUGIN START ////////////////////////////////////////////////////////
    
    // use own namespace for plugin
    window.plugin.apgain = function() {};
       
    window.plugin.apgain.display = function(playername){
        
            
    var total = 0;
    var resos_destroyed = 0;
    var links_destroyed = 0;
    var fields_destroyed = 0;
    var resos_deployed = 0;
    var captured = 0;
    var completed = 0;
    var links = 0;
    var fields = 0;
        
        $.each(chat._public.data, 
               function(guid, hello)
               { 
                   var line = hello[2];
                   if(line.indexOf(playername) != -1)
                   {
                       if(line.indexOf("destroyed an")!= -1) { total+=DESTROY_RESONATOR; resos_destroyed++; }
                       if(line.indexOf("destroyed the")!= -1) { total+=DESTROY_LINK; links_destroyed++; }
                       if(line.indexOf("destroyed a Control Field")!= -1) { total+=DESTROY_FIELD; fields_destroyed++; }
                       if(line.indexOf("deployed an")!= -1) { total+=DEPLOY_RESONATOR; resos_deployed++; }
                       if(line.indexOf("captured")!= -1) { total+=CAPTURE_PORTAL; captured++;completed++; }
                       if(line.indexOf("linked")!= -1) { total+=313; links++; }
                       if(line.indexOf("created a")!= -1) { total+=1250; fields++; }
                   }
               });
        
        var tblResult = $('<table style="margin-left:auto;margin-right:auto;width:500px;"/>');
        tblResult.append($('<tr style="font-size:20px;color:#20A8B1"><th colspan="3"><center><b>Total AP Gained</b></center></th></tr>'));
        tblResult.append($('<tr style="text-align:center;font-weight:bold;color:#FFCE00;"><td style="border-color:#FFCE00;border-style:solid;border-width:0px 1px 1px 0px">Action</td><td style="border-color:#FFCE00;border-style:solid;border-width:0px 1px 1px 1px"># of Actions</td><td style="border-color:#FFCE00;border-style:solid;border-width:0px 0px 1px 1px">AP Gained</td></tr>'));
        tblResult.append($('<tr style="text-align:center;color: ' +COLORS[2]+ ';"><td style="border-color:#FFCE00;border-style:solid;border-width:0px 1px 1px 0px"><b>Destruction AP</b></td><td style="border-color:#FFCE00;border-style:solid;border-width:0px 1px 1px 1px"></td><td style="border-color:#FFCE00;border-style:solid;border-width:0px 0px 1px 1px"></td></tr>'));
        tblResult.append($('<tr style="text-align:center;color:#FFCE00"><td style="border-color:#FFCE00;border-style:solid;border-width:0px 1px 1px 0px">Destroy a Resonator</td><td style="border-color:#FFCE00;border-style:solid;border-width:0px 1px 1px 1px">' + resos_destroyed + '</td><td style="border-color:#FFCE00;border-style:solid;border-width:0px 0px 1px 1px">' + resos_destroyed*DESTROY_RESONATOR + '</td></tr>'));
        tblResult.append($('<tr style="text-align:center;color:#FFCE00"><td style="border-color:#FFCE00;border-style:solid;border-width:0px 1px 1px 0px">Destroy a Link</td><td style="border-color:#FFCE00;border-style:solid;border-width:0px 1px 1px 1px">' + links_destroyed + '</td><td style="border-color:#FFCE00;border-style:solid;border-width:0px 0px 1px 1px">' + links_destroyed*DESTROY_LINK + '</td></tr>'));	
        tblResult.append($('<tr style="text-align:center;color:#FFCE00"><td style="border-color:#FFCE00;border-style:solid;border-width:0px 1px 1px 0px">Destroy a Control Field</td><td style="border-color:#FFCE00;border-style:solid;border-width:0px 1px 1px 1px">' + fields_destroyed + '</td><td style="border-color:#FFCE00;border-style:solid;border-width:0px 0px 1px 1px">' + fields_destroyed*DESTROY_FIELD + '</td></tr>'));
        
        tblResult.append($('<tr style="text-align:center;color: ' +COLORS[1]+ ';"><td style="border-color:#FFCE00;border-style:solid;border-width:0px 1px 1px 0px"><b>Creation AP</b></td><td style="border-color:#FFCE00;border-style:solid;border-width:0px 1px 1px 1px"></td><td style="border-color:#FFCE00;border-style:solid;border-width:0px 0px 1px 1px"></td></tr>'));
        tblResult.append($('<tr style="text-align:center;color:#FFCE00;"><td style="border-color:#FFCE00;border-style:solid;border-width:0px 1px 1px 0px">Deploy a Resonator</td><td style="border-color:#FFCE00;border-style:solid;border-width:0px 1px 1px 1px">' + resos_deployed + '</td><td style="border-color:#FFCE00;border-style:solid;border-width:0px 0px 1px 1px">' + resos_deployed*DEPLOY_RESONATOR + '</td></tr>'));
        tblResult.append($('<tr style="text-align:center;color:#FFCE00;"><td style="border-color:#FFCE00;border-style:solid;border-width:0px 1px 1px 0px">Captured a Portal</td><td style="border-color:#FFCE00;border-style:solid;border-width:0px 1px 1px 1px">' + captured + '</td><td style="border-color:#FFCE00;border-style:solid;border-width:0px 0px 1px 1px">' + captured*500 + '</td></tr>'));
        tblResult.append($('<tr style="text-align:center;color:#FFCE00;"><td style="border-color:#FFCE00;border-style:solid;border-width:0px 1px 1px 0px">Created a Link</td><td style="border-color:#FFCE00;border-style:solid;border-width:0px 1px 1px 1px">' + links + '</td><td style="border-color:#FFCE00;border-style:solid;border-width:0px 0px 1px 1px">' + links*187 + '</td></tr>'));
        tblResult.append($('<tr style="text-align:center;color:#FFCE00;"><td style="border-color:#FFCE00;border-style:solid;border-width:0px 1px 0px 0px">Created a Control Field</td><td style="border-color:#FFCE00;border-style:solid;border-width:0px 1px 0px 1px">' + fields + '</td><td style="border-color:#FFCE00;border-style:solid;border-width:0px 0px 0px 1px">' + fields*1250 + '</td></tr>'));
        
        tblResult.append($('<tr style="font-size:20px; color:#20A8B1;"><th colspan="3">Total: ' + total + '</td></tr>'));
        $(".ui-draggable").css({'position':'absolute','top':'100px','left':'400px','min-width':'600px'});
        $('#dialog').css({'min-width':'550px'});
        
        alert(tblResult, true);
        
    }
    
    var setup =  function() {
        $('#sidebar').append('<input id="showAP" placeholder="Player\'s name" type="text"/>');
        $("#showAP").keypress(function(e) {
            if((e.keyCode ? e.keyCode : e.which) != 13) return;
            window.plugin.apgain.display($(this).val());
        });
    }
    
    // PLUGIN END //////////////////////////////////////////////////////////
    if(window.iitcLoaded && typeof setup === 'function') {
        setup();
    } else {
        if(window.bootPlugins)
            window.bootPlugins.push(setup);
        else
            window.bootPlugins = [setup];
    }
    
} // wrapper end

// inject code into site context
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ apGain +')();'));
(document.body || document.head || document.documentElement).appendChild(script);