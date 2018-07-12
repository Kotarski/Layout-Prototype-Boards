
namespace Utility.Vector {
   export function snapToGrid(vector: Global.Types.vector): Global.Types.vector {
      let gridSpacing = Constants.gridSpacing;
      return {
         X: Math.round(vector.X / (gridSpacing / 2)) * (gridSpacing / 2),
         Y: Math.round(vector.Y / (gridSpacing / 2)) * (gridSpacing / 2)
      };
   }
}
