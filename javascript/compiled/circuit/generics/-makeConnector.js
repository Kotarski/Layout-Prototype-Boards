"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var Generics;
        (function (Generics) {
            function makeConnector(component, name, type, position, symbol) {
                let connector = {
                    name: name,
                    symbol: symbol,
                    type: type,
                    component: component,
                    point: position,
                };
                return connector;
            }
            Generics.makeConnector = makeConnector;
        })(Generics = Component.Generics || (Component.Generics = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLW1ha2VDb25uZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvZ2VuZXJpY3MvLW1ha2VDb25uZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsT0FBTyxDQW1CaEI7QUFuQkQsV0FBVSxPQUFPO0lBQUMsSUFBQSxTQUFTLENBbUIxQjtJQW5CaUIsV0FBQSxTQUFTO1FBQUMsSUFBQSxRQUFRLENBbUJuQztRQW5CMkIsV0FBQSxRQUFRO1lBQ2pDLFNBQWdCLGFBQWEsQ0FDMUIsU0FBbUIsRUFDbkIsSUFBWSxFQUNaLElBQU8sRUFDUCxRQUFnQixFQUNoQixNQUFlO2dCQUdmLElBQUksU0FBUyxHQUFHO29CQUNiLElBQUksRUFBRSxJQUFJO29CQUNWLE1BQU0sRUFBRSxNQUFNO29CQUNkLElBQUksRUFBRSxJQUFJO29CQUNWLFNBQVMsRUFBRSxTQUFTO29CQUNwQixLQUFLLEVBQUUsUUFBUTtpQkFDakIsQ0FBQTtnQkFFRCxPQUFPLFNBQVMsQ0FBQztZQUNwQixDQUFDO1lBakJlLHNCQUFhLGdCQWlCNUIsQ0FBQTtRQUNKLENBQUMsRUFuQjJCLFFBQVEsR0FBUixrQkFBUSxLQUFSLGtCQUFRLFFBbUJuQztJQUFELENBQUMsRUFuQmlCLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBbUIxQjtBQUFELENBQUMsRUFuQlMsT0FBTyxLQUFQLE9BQU8sUUFtQmhCIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIENpcmN1aXQuQ29tcG9uZW50LkdlbmVyaWNzIHtcclxuICAgZXhwb3J0IGZ1bmN0aW9uIG1ha2VDb25uZWN0b3I8VCBleHRlbmRzIFR5cGVzLmNvbm5lY3RvclR5cGVzPihcclxuICAgICAgY29tcG9uZW50OiBJbnN0YW5jZSxcclxuICAgICAgbmFtZTogc3RyaW5nLFxyXG4gICAgICB0eXBlOiBULFxyXG4gICAgICBwb3NpdGlvbjogVmVjdG9yLFxyXG4gICAgICBzeW1ib2w/OiBzdHJpbmdcclxuICAgKTogVHlwZXMuY29ubmVjdG9yICYgeyB0eXBlOiBUIH0ge1xyXG5cclxuICAgICAgbGV0IGNvbm5lY3RvciA9IHtcclxuICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgc3ltYm9sOiBzeW1ib2wsXHJcbiAgICAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgICAgIGNvbXBvbmVudDogY29tcG9uZW50LFxyXG4gICAgICAgICBwb2ludDogcG9zaXRpb24sXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBjb25uZWN0b3I7XHJcbiAgIH1cclxufVxyXG4iXX0=