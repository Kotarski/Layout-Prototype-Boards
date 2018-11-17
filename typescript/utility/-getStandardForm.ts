export default function getStandardForm(value: number, unit: string = ""): string {
   let exponentialParts = value.toExponential().split("e");

   let coefficient: number = parseFloat(exponentialParts[0]);
   let exponent: number = parseInt(exponentialParts[1]);

   for (let i = 0; i < 3; i++) {
      if (exponent in prefixes) break;
      coefficient *= 10;
      exponent--;
   }

   const numeric = parseFloat(coefficient.toPrecision(2));
   const prefix = prefixes[exponent] || "";

   return numeric + prefix + unit;
}

const prefixes: { [key: string]: string } = {
   '-24': 'y',
   '-21': 'z',
   '-18': 'a',
   '-15': 'f',
   '-12': 'p',
   '-9': 'n',
   '-6': 'µ',
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
