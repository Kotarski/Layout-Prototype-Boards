import NodeElements from "../../~nodeElements";
import Events from "../../ui/~events";
import buildComponents from "./dasim/-buildComponents";
import filterInvalidComponents from "./dasim/-filterInvalidComponents";
import getRawComponentsFromString from "./dasim/-getRawComponentsFromString";
import getStringFromFileInput from "./dasim/-getStringFromFileInput";
let lastFilename;
function handleFileInputEvent(event) {
    let fileInput = event.target;
    if (fileInput.value.length == 0) {
    }
    else {
        console.groupCollapsed("File Load Data");
        $.Deferred().resolve(fileInput)
            .then(() => getStringFromFileInput(fileInput))
            .then((file, fileString) => {
            let filename = file.name;
            let fileExtension = filename.split('.').pop();
            lastFilename = filename;
            if (fileExtension === "dasim" || fileExtension === "layout") {
                $.Deferred().resolve(fileString)
                    .then((string) => getRawComponentsFromString(string))
                    .then((circuitObjects) => filterInvalidComponents(circuitObjects))
                    .then((rawComponents) => buildComponents(rawComponents))
                    .then((savedManifest) => {
                    NodeElements.fileStatusText.innerText = "File:\r\n\"" + filename + "\"\r\nLoaded Successfully";
                    if (savedManifest) {
                        Circuit.manifest.constructFrom(savedManifest);
                        Circuit.history.reInit(...Circuit.manifest.layout);
                    }
                    else {
                        console.error("savedManifest is undefined");
                    }
                    console.groupEnd();
                    Events.schematicPaneResize();
                    Events.layoutPaneResize();
                })
                    .fail((failText) => {
                    console.warn("Failed to load circuit: ", failText);
                    NodeElements.fileStatusText.innerText = "Failed to load file:\r\n\""
                        + "" + filename + "\"\r\n"
                        + "Error:\r\n\"" +
                        failText + "\"";
                    console.groupEnd();
                });
            }
            else {
                console.error("Failed to load circuit: Incorrect file extenstion %o", fileExtension);
                NodeElements.fileStatusText.innerText = "Failed to load file:\r\n\""
                    + "" + filename + "\"\r\n"
                    + "Error:\r\n\"" +
                    "Incorrect file extenstion: \"." + fileExtension + "\"\"";
                console.groupEnd();
            }
            $(fileInput).val("");
        });
    }
}
export { lastFilename, handleFileInputEvent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLWhhbmRsZUZpbGVJbnB1dEV2ZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdHlwZXNjcmlwdC9maWxlSU8vbG9hZC8taGFuZGxlRmlsZUlucHV0RXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0scUJBQXFCLENBQUM7QUFDL0MsT0FBTyxNQUFNLE1BQU0sa0JBQWtCLENBQUM7QUFDdEMsT0FBTyxlQUFlLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyx1QkFBdUIsTUFBTSxrQ0FBa0MsQ0FBQztBQUN2RSxPQUFPLDBCQUEwQixNQUFNLHFDQUFxQyxDQUFDO0FBQzdFLE9BQU8sc0JBQXNCLE1BQU0saUNBQWlDLENBQUM7QUFHckUsSUFBSSxZQUFnQyxDQUFDO0FBQ3JDLFNBQVMsb0JBQW9CLENBQUMsS0FBWTtJQUN2QyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBMEIsQ0FBQztJQUNqRCxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtLQUVoQztTQUFNO1FBU1csT0FBTyxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXhELENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO2FBRzNCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUc3QyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUU7WUFDeEIsSUFBSSxRQUFRLEdBQUksSUFBYSxDQUFDLElBQUksQ0FBQztZQUNuQyxJQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzlDLFlBQVksR0FBRyxRQUFRLENBQUM7WUFFeEIsSUFBSSxhQUFhLEtBQUssT0FBTyxJQUFJLGFBQWEsS0FBSyxRQUFRLEVBQUU7Z0JBQzFELENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBb0IsQ0FBQztxQkFFdEMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQyxNQUFnQixDQUFDLENBQUM7cUJBRTlELElBQUksQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsdUJBQXVCLENBQUMsY0FBdUIsQ0FBQyxDQUFDO3FCQUUxRSxJQUFJLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxhQUFzQixDQUFDLENBQUM7cUJBRWhFLElBQUksQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFO29CQUNyQixZQUFZLENBQUMsY0FBYyxDQUFDLFNBQVMsR0FBRyxhQUFhLEdBQUcsUUFBUSxHQUFHLDJCQUEyQixDQUFDO29CQUMvRixJQUFJLGFBQWEsRUFBRTt3QkFDaEIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7d0JBQzlDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDckQ7eUJBQU07d0JBQ1csT0FBTyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO3FCQUM3RDtvQkFDYyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ2xDLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO29CQUM3QixNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDN0IsQ0FBQyxDQUFDO3FCQUVELElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO29CQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ2xFLFlBQVksQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLDRCQUE0QjswQkFDL0QsRUFBRSxHQUFHLFFBQVEsR0FBRyxRQUFROzBCQUN4QixjQUFjO3dCQUNoQixRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUNKLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDckMsQ0FBQyxDQUFDLENBQUE7YUFDUDtpQkFBTTtnQkFDVyxPQUFPLENBQUMsS0FBSyxDQUFDLHNEQUFzRCxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUNwRyxZQUFZLENBQUMsY0FBYyxDQUFDLFNBQVMsR0FBRyw0QkFBNEI7c0JBQy9ELEVBQUUsR0FBRyxRQUFRLEdBQUcsUUFBUTtzQkFDeEIsY0FBYztvQkFDaEIsZ0NBQWdDLEdBQUcsYUFBYSxHQUFHLE1BQU0sQ0FBQztnQkFDOUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ3BDO1lBR0QsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQTtLQUVQO0FBQ0osQ0FBQztBQUVELE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOb2RlRWxlbWVudHMgZnJvbSBcIi4uLy4uL35ub2RlRWxlbWVudHNcIjtcclxuaW1wb3J0IEV2ZW50cyBmcm9tIFwiLi4vLi4vdWkvfmV2ZW50c1wiO1xyXG5pbXBvcnQgYnVpbGRDb21wb25lbnRzIGZyb20gXCIuL2Rhc2ltLy1idWlsZENvbXBvbmVudHNcIjtcclxuaW1wb3J0IGZpbHRlckludmFsaWRDb21wb25lbnRzIGZyb20gXCIuL2Rhc2ltLy1maWx0ZXJJbnZhbGlkQ29tcG9uZW50c1wiO1xyXG5pbXBvcnQgZ2V0UmF3Q29tcG9uZW50c0Zyb21TdHJpbmcgZnJvbSBcIi4vZGFzaW0vLWdldFJhd0NvbXBvbmVudHNGcm9tU3RyaW5nXCI7XHJcbmltcG9ydCBnZXRTdHJpbmdGcm9tRmlsZUlucHV0IGZyb20gXCIuL2Rhc2ltLy1nZXRTdHJpbmdGcm9tRmlsZUlucHV0XCI7XHJcblxyXG4vL1RPRE8gbGFzdEZpbGVuYW1lIHNob3VsZG4ndCBiZSBleHBvcnRlZCBoZXJlLi4uISBNYXliZSBtb3ZlXHJcbmxldCBsYXN0RmlsZW5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcclxuZnVuY3Rpb24gaGFuZGxlRmlsZUlucHV0RXZlbnQoZXZlbnQ6IEV2ZW50KSB7XHJcbiAgIGxldCBmaWxlSW5wdXQgPSBldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgaWYgKGZpbGVJbnB1dC52YWx1ZS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAvLyBVc2VyIHNlbGVjdGVkIHRvIGNhbmNlbCwgbm8gYWN0aW9uIHJlcXVpcmVkXHJcbiAgIH0gZWxzZSB7XHJcbiAgICAgICAgIC8vIENyZWF0ZXMgYSBxdWV1ZSBmb3JjZWluZyB0aGUgZm9sbG93aW5nIGZ1bmN0aW9ucyB0byBvY2N1ciBpbiBvcmRlcixcclxuICAgICAgICAgLy8gYW5kIHBhc3MgdGhlaXIgb3V0cHV0IHRvIHRoZSBuZXh0IGZ1bmN0aW9uLiBUaGlzIGlzIG5lY2Vzc2FyeSBhcyBzb21lXHJcbiAgICAgICAgIC8vIGFyZSBhc3luY2hyb25vdXMgYnV0IGFsbCByZXF1aXJlIHRoZSBwcmV2b3VzIGZ1bmN0aW9uIHRvIGNvbXBsZXRlZC5cclxuICAgICAgICAgLy8gUHJldmVudHMgY2FsbGJhY2sgaGVsbC5cclxuXHJcbiAgICAgICAgIC8vIE5vdGUgdGhhdCBlYWNoIHRpbWUgJy50aGVuKGZuKScgaXMgd3JpdHRlbiBpdCBjb3VsZCBiZSByZXBsYWNlZCB3aXRoXHJcbiAgICAgICAgIC8vICcudGhlbigoYXJncykgPT4gZm4oYXJncyknIHdoaWNoIGlzIG1vcmUgZXhwbGljaXQgYnV0IG1vcmUgdmVyYm9zZVxyXG5cclxuICAgICAgICAgLypMT0dTVEFSVCovY29uc29sZS5ncm91cENvbGxhcHNlZChcIkZpbGUgTG9hZCBEYXRhXCIpOy8qTE9HRU5EKi9cclxuXHJcbiAgICAgICQuRGVmZXJyZWQoKS5yZXNvbHZlKGZpbGVJbnB1dClcclxuICAgICAgICAgLy8gR2V0IHRoZSBmaWxlIGFzIGEgc3RyaW5nIGZyb20gdGhlIGZpbGVpbnB1dFxyXG4gICAgICAgICAvLyAoZWZmZWN0aXZlbHkgdGhlIG91dHB1dCBvZiAkLkRlZmVycmVkKCkucmVzb2x2ZShmaWxlSW5wdXQpKVxyXG4gICAgICAgICAudGhlbigoKSA9PiBnZXRTdHJpbmdGcm9tRmlsZUlucHV0KGZpbGVJbnB1dCkpXHJcblxyXG4gICAgICAgICAvLyBBY3Rpb24gY2hhbmdlcyBkZXBlbmRpbmcgb24gZmlsZSB0eXBlXHJcbiAgICAgICAgIC50aGVuKChmaWxlLCBmaWxlU3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBmaWxlbmFtZSA9IChmaWxlIGFzIEZpbGUpLm5hbWU7XHJcbiAgICAgICAgICAgIGxldCBmaWxlRXh0ZW5zaW9uID0gZmlsZW5hbWUuc3BsaXQoJy4nKS5wb3AoKTtcclxuICAgICAgICAgICAgbGFzdEZpbGVuYW1lID0gZmlsZW5hbWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmlsZUV4dGVuc2lvbiA9PT0gXCJkYXNpbVwiIHx8IGZpbGVFeHRlbnNpb24gPT09IFwibGF5b3V0XCIpIHtcclxuICAgICAgICAgICAgICAgJC5EZWZlcnJlZCgpLnJlc29sdmUoZmlsZVN0cmluZyBhcyBzdHJpbmcpXHJcbiAgICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgY2lyY3VpdCBmcm9tIHRoZSBzdHJpbmcgKG91dHB1dCBvZiBhYm92ZSlcclxuICAgICAgICAgICAgICAgICAgLnRoZW4oKHN0cmluZykgPT4gZ2V0UmF3Q29tcG9uZW50c0Zyb21TdHJpbmcoc3RyaW5nIGFzIHN0cmluZykpXHJcbiAgICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgZHJhd2FibGUgY29tcG9uZW50cyBvbmx5IGZyb20gdGhlIGNpcmN1aXQgKG91dHB1dCBvZiBhYm92ZSlcclxuICAgICAgICAgICAgICAgICAgLnRoZW4oKGNpcmN1aXRPYmplY3RzKSA9PiBmaWx0ZXJJbnZhbGlkQ29tcG9uZW50cyhjaXJjdWl0T2JqZWN0cyBhcyBhbnlbXSkpXHJcbiAgICAgICAgICAgICAgICAgIC8vIEJ1aWxkIGNvbXBvbmVudHNcclxuICAgICAgICAgICAgICAgICAgLnRoZW4oKHJhd0NvbXBvbmVudHMpID0+IGJ1aWxkQ29tcG9uZW50cyhyYXdDb21wb25lbnRzIGFzIGFueVtdKSlcclxuICAgICAgICAgICAgICAgICAgLy8gQ2FsbGVkIGlmIGFueSBvZiB0aGUgZnVuY3Rpb25zIGZhaWwgdXNpbmcgZGV0YWlsIGZyb20gdGhlaXIgY29udGV4dFxyXG4gICAgICAgICAgICAgICAgICAudGhlbigoc2F2ZWRNYW5pZmVzdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICBOb2RlRWxlbWVudHMuZmlsZVN0YXR1c1RleHQuaW5uZXJUZXh0ID0gXCJGaWxlOlxcclxcblxcXCJcIiArIGZpbGVuYW1lICsgXCJcXFwiXFxyXFxuTG9hZGVkIFN1Y2Nlc3NmdWxseVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICBpZiAoc2F2ZWRNYW5pZmVzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDaXJjdWl0Lm1hbmlmZXN0LmNvbnN0cnVjdEZyb20oc2F2ZWRNYW5pZmVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENpcmN1aXQuaGlzdG9yeS5yZUluaXQoLi4uQ2lyY3VpdC5tYW5pZmVzdC5sYXlvdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAvKkxPR1NUQVJUKi9jb25zb2xlLmVycm9yKFwic2F2ZWRNYW5pZmVzdCBpcyB1bmRlZmluZWRcIik7LypMT0dFTkQqL1xyXG4gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qTE9HU1RBUlQqL2NvbnNvbGUuZ3JvdXBFbmQoKTsvKkxPR0VORCovXHJcbiAgICAgICAgICAgICAgICAgICAgIEV2ZW50cy5zY2hlbWF0aWNQYW5lUmVzaXplKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgIEV2ZW50cy5sYXlvdXRQYW5lUmVzaXplKCk7XHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIC8vIENvbnN0cnVjdCBjaXJjdWl0XHJcbiAgICAgICAgICAgICAgICAgIC5mYWlsKChmYWlsVGV4dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvKkxPR1NUQVJUKi9jb25zb2xlLndhcm4oXCJGYWlsZWQgdG8gbG9hZCBjaXJjdWl0OiBcIiwgZmFpbFRleHQpOy8qTE9HRU5EKi9cclxuICAgICAgICAgICAgICAgICAgICAgTm9kZUVsZW1lbnRzLmZpbGVTdGF0dXNUZXh0LmlubmVyVGV4dCA9IFwiRmFpbGVkIHRvIGxvYWQgZmlsZTpcXHJcXG5cXFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIlwiICsgZmlsZW5hbWUgKyBcIlxcXCJcXHJcXG5cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiRXJyb3I6XFxyXFxuXFxcIlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmFpbFRleHQgKyBcIlxcXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLypMT0dTVEFSVCovY29uc29sZS5ncm91cEVuZCgpOy8qTE9HRU5EKi9cclxuICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgLypMT0dTVEFSVCovY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBsb2FkIGNpcmN1aXQ6IEluY29ycmVjdCBmaWxlIGV4dGVuc3Rpb24gJW9cIiwgZmlsZUV4dGVuc2lvbik7LypMT0dFTkQqL1xyXG4gICAgICAgICAgICAgICBOb2RlRWxlbWVudHMuZmlsZVN0YXR1c1RleHQuaW5uZXJUZXh0ID0gXCJGYWlsZWQgdG8gbG9hZCBmaWxlOlxcclxcblxcXCJcIlxyXG4gICAgICAgICAgICAgICAgICArIFwiXCIgKyBmaWxlbmFtZSArIFwiXFxcIlxcclxcblwiXHJcbiAgICAgICAgICAgICAgICAgICsgXCJFcnJvcjpcXHJcXG5cXFwiXCIgK1xyXG4gICAgICAgICAgICAgICAgICBcIkluY29ycmVjdCBmaWxlIGV4dGVuc3Rpb246IFxcXCIuXCIgKyBmaWxlRXh0ZW5zaW9uICsgXCJcXFwiXFxcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAvKkxPR1NUQVJUKi9jb25zb2xlLmdyb3VwRW5kKCk7LypMT0dFTkQqL1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL0NsZWFyIGZpbGUgaW5wdXRcclxuICAgICAgICAgICAgJChmaWxlSW5wdXQpLnZhbChcIlwiKTtcclxuICAgICAgICAgfSlcclxuXHJcbiAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgbGFzdEZpbGVuYW1lLCBoYW5kbGVGaWxlSW5wdXRFdmVudCB9OyJdfQ==