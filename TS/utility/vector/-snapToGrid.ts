
namespace Utility.Vector {
   export function snapToGrid(vector: Global.Types.vector): Global.Types.vector {
      let gridSpacing = Constants.gridSpacing;
      return {
         x: Math.round(vector.x / (gridSpacing / 2)) * (gridSpacing / 2),
         y: Math.round(vector.y / (gridSpacing / 2)) * (gridSpacing / 2)
      };
   }
}
