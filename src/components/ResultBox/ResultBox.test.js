import ResultBox from "./ResultBox";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const testCases = [
  { amountPLN: "100", amountUSD: "28.57", toPLN: "100.00" },
  { amountPLN: "20", amountUSD: "5.71", toPLN: "19.99" },
  { amountPLN: "200", amountUSD: "57.14", toPLN: "199.99" },
  { amountPLN: "345", amountUSD: "98.57", toPLN: "345.00" },
];

for (const testObj of testCases) {
  // for start
  describe("Component ResultBox", () => {
    it("should render without crashing " + testObj.amount, () => {
      render(<ResultBox from="PLN" to="USD" amount={100} />);
    });
    it(
      "should render proper info about conversion when PLN -> USD " +
        testObj.amount,
      () => {
        render(
          <ResultBox from="PLN" to="USD" amount={Number(testObj.amountPLN)} />
        );
        const output = screen.getByTestId("output");
        expect(output).toHaveTextContent(
          `PLN ${testObj.amountPLN}.00 = $${testObj.amountUSD}`
        );
      }
    );

    it(
      "should render proper info about conversion when USD -> PLN " +
        testObj.amount,
      () => {
        render(
          <ResultBox from="USD" to="PLN" amount={Number(testObj.amountUSD)} />
        );
        const output = screen.getByTestId("output");
        expect(output).toHaveTextContent(
          `$${testObj.amountUSD} = PLN ${testObj.toPLN}`
        );
      }
    );
  });

  it(
    "should render proper info about conversion when PLN 123.00 -> PLN 123.00" +
      testObj.amount,
    () => {
      render(<ResultBox from="PLN" to="PLN" amount={123.0} />);
      const output = screen.getByTestId("output");
      expect(output).toHaveTextContent("PLN 123.00 = PLN 123.00");
    }
  );

  it(
    "should render 'Wrong value...' when amount is less then 0. Negative amount test" +
      testObj.amount,
    () => {
      render(<ResultBox from="PLN" to="USD" amount={-1} />);
      const output = screen.getByTestId("output");
      expect(output).toHaveTextContent("Wrong value…");
    }
  );

} // for end
