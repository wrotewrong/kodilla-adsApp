// const winston = require('winston');
// const { logNotProvidedInputs } = require('../utils/logNotProvidedInputs');

// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.json()
//   ),
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({ filename: 'error.log', level: 'error' }),
//     new winston.transports.File({ filename: 'combined.log' }),
//   ],
// });

// exports.logNotProvidedInputs = (expectedInputs, providedInputs) => {
//   const missingInputs = [];
//   for (let i = 0; i < expectedInputs.length; i++) {
//     if (
//       !JSON.parse(JSON.stringify(providedInputs)).hasOwnProperty(
//         expectedInputs[i]
//       ) ||
//       JSON.parse(JSON.stringify(providedInputs))[expectedInputs[i]] === ''
//     ) {
//       missingInputs.push(` ${expectedInputs[i]}`);
//     }
//   }
//   if (missingInputs.length !== 0) {
//     logger.error(`Missing inputs: ${missingInputs}`);
//   }
// };
