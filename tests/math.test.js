const {
  calculateTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
} = require("../src/math");

test("hello world!", () => {});

// test("this should fail", () => {
//     throw new Error("Error")
// })

test("Should calculate tip", () => {
  const total = calculateTip(10, 0.3);
  expect(total).toBe(13);
  // if (total !== 13) {
  //     throw new Error("Total amount should be 13. It is " + total)
  // }
});

test("Should calculate total with default tip", () => {
  const total = calculateTip(10);
  expect(total).toBe(12);
  // if (total !== 13) {
  //     throw new Error("Total amount should be 13. It is " + total)
  // }
});

test("farenheit to celsius", () => {
  const total = fahrenheitToCelsius(32);
  expect(total).toBe(0);
  // if (total !== 13) {
  //     throw new Error("Total amount should be 13. It is " + total)
  // }
});

test("Celsius to fahrenheit", () => {
  const total = celsiusToFahrenheit(10);
  expect(total).toBe(50);
  // if (total !== 13) {
  //     throw new Error("Total amount should be 13. It is " + total)
  // }
});
