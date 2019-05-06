
export type ComponentForms = "schematic" | "layout";


// Base data is data inherent to the component (e.g. not added by addins)


/** Procedure 
   1. Get the ident from the saved data
   2. Get the  component builder from the ident using a case statement
      The component builder for a particular component requires:
         For loading: A function to extract properties/state from the saved data
         A function to default properties not found/provided when loading/making
            (Addins need to handle defaulting themselves) -> 
               I.e. The function to add properties needs to be conditional and check existing ones
         A function to apply all the addins 
         These should be done as chains:
         
         Load(data) {
            ident = getIdent(data)
            case Resistor:
               return LoadResistor(data)
            case Capacitor:
               return LoadCapacitor(data)
            ...
         }

         LoadResistor(data) {
            return chain(
               getBaseComponent,
               applyResistor,
               applyDraggable,
               apply...

            )
         }


*/





export type ComponentBaseData = {
   // Idents are SAVED identifiers of the component
   idents: {
      form: ComponentForms,
      type: string
   }
   // Properties are SAVED and used to to compare the component with others of the same type
   properties: {

   },
   // States are SAVED and define non comparative attributes such as position
   states: {

   },
   // Flags are NOT SAVED and define anything else
   // Flags which are defined in the base data are added at creation (or load)
   flags: {
      order: "fore" | "mid" | "back",
      disabled?: boolean // Remove?
   }
}

export interface ComponentQuery<
   BaseData extends ComponentBaseData,
   Data extends ComponentBaseData
   > {
   // Basic
   baseData: BaseData
   data: Data
   // Parts
   idents: Data["idents"],
   properties: Data["properties"],
   states: Data["states"],
   flags:  Data["flags"],
   // Derived
   savedData: {
      idents: Data["idents"],
      properties: Data["properties"],
      states: Data["states"]
   },
   comparedData: {
      idents: Data["idents"],
      properties: Data["properties"]
   },

   
}


