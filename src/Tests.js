import { render, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("initial state", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("timerRunning")).toHaveTextContent("false");
    expect(getByTestId("minutes")).toHaveTextContent("25");
    expect(getByTestId("seconds")).toHaveTextContent("0");
    // Add more assertions for the rest of your state variables
  });

  test("playAudio function", () => {
    const { getByTestId } = render(<App />);
    fireEvent.click(getByTestId("playAudioButton"));
    // Replace 'playing' with the actual text that indicates the audio is playing
    expect(getByTestId("audioStatus")).toHaveTextContent("playing");
  });

  test("playAudio2 function", () => {
    const { getByTestId } = render(<App />);
    fireEvent.click(getByTestId("playAudio2Button"));
    // Replace 'playing' with the actual text that indicates the audio is playing
    expect(getByTestId("audioStatus")).toHaveTextContent("playing");
  });

  test("stopAudio function", () => {
    const { getByTestId } = render(<App />);
    fireEvent.click(getByTestId("stopAudioButton"));
    // Replace 'stopped' with the actual text that indicates the audio is stopped
    expect(getByTestId("audioStatus")).toHaveTextContent("stopped");
  });
});
