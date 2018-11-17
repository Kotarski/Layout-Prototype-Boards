import NodeElements from "./~nodeElements";
import Active from "./~active";
import Ui from "./ui/-init";

$(document).ready(() => {
   //TODO NodeElements must go before UI, remove dependancy
   NodeElements.init();
   Active.init();
   Ui.init();
});
