namespace Utility {
   export function convertToSI(value: number): string {
      let exponent = value.toExponential();

      let decimal: number = parseFloat(exponent.substr(0, exponent.indexOf('e')));
      let power: number = parseInt(exponent.substr(exponent.indexOf('e') + 1));

      let prefixes: { [key: string]: string } = {
         '-24': 'y',
         '-21': 'z',
         '-18': 'a',
         '-15': 'f',
         '-12': 'p',
         '-9': 'n',
         '-6': '\u03BC'/*µ*/,
         '-3': 'm',
         '0': '',
         '3': 'k',
         '6': 'M',
         '9': 'G',
         '12': 'T',
         '15': 'P',
         '18': 'E',
         '21': 'Z',
         '24': 'Y'
      };

      for (let i = 0; i < 3; i++) {
         if (power in prefixes) {
            return parseFloat(decimal.toPrecision(2)) + prefixes[power];
         }
         decimal *= 10;
         power--;
      }
      return value.toString();
   }
}
