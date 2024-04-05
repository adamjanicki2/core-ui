import React, { useEffect } from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useScrollToHash } from "../../src/";

type WrapperProps = {
  id: string;
  hash: string;
};

describe("useScrollToHash", () => {
  const Wrapper = ({ id, hash }: WrapperProps) => {
    window.location.hash = hash;
    useScrollToHash();
    return <div id={id}>hi</div>;
  };
  it("should work for hash in document", () => {
    render(<Wrapper id="id1" hash="id1" />);
  });
  it("should work for hash not in document", () => {
    render(<Wrapper id="id2" hash="thing" />);
  });
  it("should work for hash being not query selectable", () => {
    render(<Wrapper id="id3" hash="~:~text=id" />);
  });
});
