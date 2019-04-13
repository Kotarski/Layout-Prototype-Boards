import Component from "../../+component";

export type Addin<C extends Component, O extends {} = any> = {
   init: (component: C, options?: O) => void,
   draw? : (component: C) => void
}