import vector from "../-vector";
export function snapToGridS(inVector) {
    return (grid = { x: 10, y: 10 }) => {
        return vector({
            x: Math.round(inVector.x / (grid.x)) * (grid.x),
            y: Math.round(inVector.y / (grid.y)) * (grid.y)
        });
    };
}
export function snapToGridM(inVectors) {
    return (grid = { x: 10, y: 10 }) => {
        return vector(inVectors.map(inVector => ({
            x: Math.round(inVector.x / (grid.x)) * (grid.x),
            y: Math.round(inVector.y / (grid.y)) * (grid.y)
        })));
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLXNuYXBUb0dyaWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90eXBlc2NyaXB0L192ZWN0b3IvLXNuYXBUb0dyaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFrQixNQUFNLFlBQVksQ0FBQztBQUM1QyxNQUFNLFVBQVUsV0FBVyxDQUFtQixRQUFXO0lBQ3RELE9BQU8sQ0FBQyxPQUFlLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtRQUN4QyxPQUFPLE1BQU0sQ0FBQztZQUNYLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDL0MsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNqRCxDQUFDLENBQUE7SUFDTCxDQUFDLENBQUE7QUFDSixDQUFDO0FBRUQsTUFBTSxVQUFVLFdBQVcsQ0FBbUIsU0FBYztJQUN6RCxPQUFPLENBQUMsT0FBZSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7UUFDeEMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMvQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2pELENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHZlY3RvciwgeyBWZWN0b3IgfSBmcm9tIFwiLi4vLXZlY3RvclwiO1xyXG5leHBvcnQgZnVuY3Rpb24gc25hcFRvR3JpZFM8VCBleHRlbmRzIFZlY3Rvcj4oaW5WZWN0b3I6IFQpIHtcclxuICAgcmV0dXJuIChncmlkOiBWZWN0b3IgPSB7IHg6IDEwLCB5OiAxMCB9KSA9PiB7XHJcbiAgICAgIHJldHVybiB2ZWN0b3Ioe1xyXG4gICAgICAgICB4OiBNYXRoLnJvdW5kKGluVmVjdG9yLnggLyAoZ3JpZC54KSkgKiAoZ3JpZC54KSxcclxuICAgICAgICAgeTogTWF0aC5yb3VuZChpblZlY3Rvci55IC8gKGdyaWQueSkpICogKGdyaWQueSlcclxuICAgICAgfSlcclxuICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc25hcFRvR3JpZE08VCBleHRlbmRzIFZlY3Rvcj4oaW5WZWN0b3JzOiBUW10pIHtcclxuICAgcmV0dXJuIChncmlkOiBWZWN0b3IgPSB7IHg6IDEwLCB5OiAxMCB9KSA9PiB7XHJcbiAgICAgIHJldHVybiB2ZWN0b3IoaW5WZWN0b3JzLm1hcChpblZlY3RvciA9PiAoe1xyXG4gICAgICAgICB4OiBNYXRoLnJvdW5kKGluVmVjdG9yLnggLyAoZ3JpZC54KSkgKiAoZ3JpZC54KSxcclxuICAgICAgICAgeTogTWF0aC5yb3VuZChpblZlY3Rvci55IC8gKGdyaWQueSkpICogKGdyaWQueSlcclxuICAgICAgfSkpKTtcclxuICAgfTtcclxufVxyXG5cclxuXHJcbiJdfQ==