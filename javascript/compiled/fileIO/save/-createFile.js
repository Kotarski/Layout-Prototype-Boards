function createFile() {
    let componentStrings = [];
    Circuit.manifest.layout.concat(Circuit.manifest.schematic).forEach(component => {
        try {
            const componentMap = Circuit.mappings.getComponentMap(component);
            if (componentMap === undefined) {
                console.error("No component map found!", component);
                throw new Error("Could not save component");
            }
            let componentObject = Object.assign({ func: Circuit.mappings.getComponentMapSafe(component).savename }, component.getProperties(), component.getState());
            if (componentObject.disabled === false) {
                delete componentObject.disabled;
                componentStrings.push(JSON.stringify(componentObject));
            }
        }
        catch (e) {
            console.error("Item %o cannot be saved (check mappings) with error %o", component, e);
        }
    });
    return JSON.stringify(componentStrings, undefined, 2);
}
export default createFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLWNyZWF0ZUZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90eXBlc2NyaXB0L2ZpbGVJTy9zYXZlLy1jcmVhdGVGaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVMsVUFBVTtJQUNoQixJQUFJLGdCQUFnQixHQUFhLEVBQUUsQ0FBQztJQUNwQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDNUUsSUFBSTtZQUNELE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2pFLElBQUksWUFBWSxLQUFLLFNBQVMsRUFBRTtnQkFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLHlCQUF5QixFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUNuRSxNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUE7YUFDN0M7WUFFRCxJQUFJLGVBQWUsbUJBQ2hCLElBQUksRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsSUFDM0QsU0FBUyxDQUFDLGFBQWEsRUFBRSxFQUN6QixTQUFTLENBQUMsUUFBUSxFQUFFLENBQ3pCLENBQUE7WUFFRCxJQUFJLGVBQWUsQ0FBQyxRQUFRLEtBQUssS0FBSyxFQUFFO2dCQUVyQyxPQUFPLGVBQWUsQ0FBQyxRQUFRLENBQUM7Z0JBQ2hDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7YUFDekQ7U0FDSDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ00sT0FBTyxDQUFDLEtBQUssQ0FBQyx3REFBd0QsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDdkc7SUFFSixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDekQsQ0FBQztBQUNELGVBQWUsVUFBVSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gY3JlYXRlRmlsZSgpOiBzdHJpbmcge1xyXG4gICBsZXQgY29tcG9uZW50U3RyaW5nczogc3RyaW5nW10gPSBbXTtcclxuICAgQ2lyY3VpdC5tYW5pZmVzdC5sYXlvdXQuY29uY2F0KENpcmN1aXQubWFuaWZlc3Quc2NoZW1hdGljKS5mb3JFYWNoKGNvbXBvbmVudCA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgIGNvbnN0IGNvbXBvbmVudE1hcCA9IENpcmN1aXQubWFwcGluZ3MuZ2V0Q29tcG9uZW50TWFwKGNvbXBvbmVudCk7XHJcbiAgICAgICAgIGlmIChjb21wb25lbnRNYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAvKkxPR1NUQVJUKi9jb25zb2xlLmVycm9yKFwiTm8gY29tcG9uZW50IG1hcCBmb3VuZCFcIiwgY29tcG9uZW50KTsvKkxPR0VORCovXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBzYXZlIGNvbXBvbmVudFwiKVxyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICBsZXQgY29tcG9uZW50T2JqZWN0ID0ge1xyXG4gICAgICAgICAgICBmdW5jOiBDaXJjdWl0Lm1hcHBpbmdzLmdldENvbXBvbmVudE1hcFNhZmUoY29tcG9uZW50KS5zYXZlbmFtZSxcclxuICAgICAgICAgICAgLi4uY29tcG9uZW50LmdldFByb3BlcnRpZXMoKSxcclxuICAgICAgICAgICAgLi4uY29tcG9uZW50LmdldFN0YXRlKClcclxuICAgICAgICAgfVxyXG4gICAgICAgICAvLyBEb24ndCBzYXZlIGRpc2FibGVkIG9iamVjdHNcclxuICAgICAgICAgaWYgKGNvbXBvbmVudE9iamVjdC5kaXNhYmxlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgLy8gUmVtb3ZlIGRpc2FibGVkIGZpZWxkIChubyBuZWVkIHRvIHNhdmUgaXQpXHJcbiAgICAgICAgICAgIGRlbGV0ZSBjb21wb25lbnRPYmplY3QuZGlzYWJsZWQ7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudFN0cmluZ3MucHVzaChKU09OLnN0cmluZ2lmeShjb21wb25lbnRPYmplY3QpKTtcclxuICAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIC8qTE9HU1RBUlQqL2NvbnNvbGUuZXJyb3IoXCJJdGVtICVvIGNhbm5vdCBiZSBzYXZlZCAoY2hlY2sgbWFwcGluZ3MpIHdpdGggZXJyb3IgJW9cIiwgY29tcG9uZW50LCBlKTsvKkxPR0VORCovXHJcbiAgICAgIH1cclxuXHJcbiAgIH0pO1xyXG5cclxuICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGNvbXBvbmVudFN0cmluZ3MsIHVuZGVmaW5lZCwgMik7XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRmlsZTsiXX0=