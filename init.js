plugin.loadLang();

if (theWebUI.theme && theWebUI.theme == 'Oblivion')
    plugin.loadCSS("linkcakeboxoblivion");
else
    plugin.loadCSS("linkcakebox");

if(plugin.canChangeMenu()) 
{
    theWebUI.urlTabcakebox = function(dID,fno)
    {
        var base_path = this.torrents[dID].base_path;
        if (this.files[dID][fno].name != this.torrents[dID].name)
            base_path = base_path + "/" + this.files[dID][fno].name;

        base_path = base_path.replace(plugin.dirpath, "");
        var cakeboxUrl = "'" + plugin.url + base_path + "'";
        return cakeboxUrl;
    };
  
    plugin.createFileMenu = theWebUI.createFileMenu;
    theWebUI.createFileMenu = function( e, id )
    {
        if(plugin.createFileMenu.call(this, e, id))
        {
            if(plugin.enabled)
            {
                var fno = null;
                var table = this.getTable("fls");
                if((table.selCount == 1) && (theWebUI.dID.length==40))
                {
                    var fid = table.getFirstSelected();
                    if(this.settings["webui.fls.view"])
                    {
                        var arr = fid.split('_f_');
                        fno = arr[1];
                    }
                    else
                    {
                        if(!this.dirs[this.dID].isDirectory(fid))
                            fno = fid.substr(3);
                    }
                }
                theContextMenu.add( [theUILang.linkcakeboxmenu, (fno === null) ? null : plugin.optionlink + "(" + theWebUI.urlTabcakebox(theWebUI.dID, fno) + ")"] );
            }
            return(true);
        }
        return(false);
    };
}

if(plugin.canChangeMenu()) {

    plugin.createMenu = theWebUI.createMenu;
    theWebUI.createMenu = function(e, id)
    {
        plugin.createMenu.call(this, e, id);
        if(plugin.enabled)
        {
        	var base_path = this.torrents[id].base_path;
//      	if (this.files[id][fno].name != this.torrents[id].name)
//          base_path = base_path + "/" + this.files[id][fno].name;
        	base_path = base_path.replace(plugin.dirpath, "");
        	var cakeboxUrl = "'" + plugin.url + base_path + "'";
//          var cakeboxUrl = "'" + plugin.url + bugurl(encodeURIComponent(theWebUI.torrents[id].base_path)) + "'";
            theContextMenu.add( [theUILang.linkcakeboxmenu, (theWebUI.torrents[id].multi_file !== 0 ) ? null : plugin.optionlink + "(" + cakeboxUrl + ")"] );
        }
    };
}

plugin.onLangLoaded = function()
{
    this.addButtonToToolbar("linkcakebox", theUILang.linkcakebox, plugin.optionlink+"('" + plugin.url + "')", "help");
    this.addSeparatorToToolbar("help");
};

plugin.onRemove = function()
{
    this.removeSeparatorFromToolbar("linkcakebox");
    this.removeButtonFromToolbar("linkcakebox");
};