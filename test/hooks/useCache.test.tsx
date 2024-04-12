import React, { useEffect } from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useCache } from "../../src/";

describe("useCache", () => {
  const Wrapper = ({ fill = false }: { fill?: boolean }) => {
    const cache = useCache<string>("test");
    const value = cache.get("test");
    useEffect(() => {
      if (fill) {
        cache.set("test", "test");
      }
    }, [fill, cache.set]);
    return <div data-testid="cache">{value}</div>;
  };
  it("should return undefined when cache is empty", () => {
    const { getByTestId } = render(<Wrapper />);
    expect(getByTestId("cache")).toHaveTextContent("");
  });
  it("should return value when cache is filled", () => {
    const { getByTestId } = render(<Wrapper fill />);
    expect(getByTestId("cache")).toHaveTextContent("test");
  });
});
