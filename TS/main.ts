// This should be the only place document.ready is seen (There should be only a single entry point)
var SOFTWARE_VERSION = "v25";
$(document).ready(() => {
   //TODO NodeElements must go before UI, remove dependancy
   NodeElements.init();
   Active.init();
   Ui.init();
   Circuit.Mappings.init();
   Circuit.History.init();
});
