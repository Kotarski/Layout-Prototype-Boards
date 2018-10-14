// This should be the only place document.ready is seen (There should be only a single entry point)
import NodeElements from "./~nodeElements";
import Active from "./~active";
import Ui from "./ui/-init";

$(document).ready(() => {
   //TODO NodeElements must go before UI, remove dependancy
   NodeElements.init();
   Active.init();
   Ui.init();
   Circuit.Mappings.init();
});
