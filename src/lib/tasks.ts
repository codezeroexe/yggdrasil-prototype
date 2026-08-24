export type Task = {
  id: string;
  title: string;
  layers: string;
  points: number;
  fragment: string;
  text: string;
  clue: string;
  hint: string;
  tools: string[];
  answer: string;
  artifact: string;
  artifactType: "text" | "image" | "url" | "binary" | "html";
  artifactFilename: string;
  directive: string;
};

export const tasks: Task[] = [
  {
    id: "01",
    title: "The Door in the Source",
    layers: "WEB // SOURCE ANALYSIS",
    points: 100,
    fragment: "MID-7A",
    text: "Find the message the interface was never meant to show.",
    clue: "A developer left the answer in the page, but not in the rendered view. What browser feature exposes the original HTML?",
    hint: "I am the page behind the page. Ask the browser for my source.",
    tools: ["Browser", "View Source"],
    answer: "view-source",
    artifact:
      "<!-- cHJvY2VlZCB3aXRoIHNvdXJjZQ== -->\n<html><body>midgard_gate.html</body></html>",
    artifactType: "html",
    artifactFilename: "midgard_gate.html",
    directive: "The rendered page is a courtesy. What it hides is not.",
  },
  {
    id: "02",
    title: "Bark and Signal",
    layers: "FORENSICS // STEGO",
    points: 125,
    fragment: "MID-2F",
    text: "Inspect the image history, then listen between the pixels.",
    clue: "The file metadata points to a hidden archive. Which command-line tool inspects image metadata?",
    hint: "My name begins with exif and I speak for files.",
    tools: ["ExifTool", "Hex editor"],
    answer: "exiftool",
    artifact:
      "FILE: bark_signal.jpg\nCOMMENT: VGhlIGFyY2hpdmUgaXMgaW4gdGhlIG1ldGFkYXRh\nARTIST: ratatoskr",
    artifactType: "image",
    artifactFilename: "bark_signal.jpg",
    directive: "The picture is only the container. Files remember more than they show.",
  },
  {
    id: "03",
    title: "The Three Masks",
    layers: "CRYPTO // ENCODING",
    points: 150,
    fragment: "MID-91",
    text: "Hex, Base91, and Morse protect one signal. Decode each step.",
    clue: "RATATOSKR asks for the realm where humans first lived in the Norse cosmos.",
    hint: "My roots hold the human world. I start with M and end with GARD.",
    tools: ["CyberChef", "Python"],
    answer: "midgard",
    artifact:
      "4d49 4447 4152 44\n.-- .. -.. --. .- .-. -..\n> decode both layers",
    artifactType: "text",
    artifactFilename: "midgard-03-decoding.txt",
    directive: "Two dialects, one word. Neither is written in a language you speak.",
  },
  {
    id: "04",
    title: "Cold Boot",
    layers: "REVERSE // BINARY",
    points: 200,
    fragment: "MID-C4",
    text: "Trace the decision in the binary that changes everything.",
    clue: "The operation is combining two byte strings. The writeup says AND should become a different bitwise operation. Which one?",
    hint: "Two signals collide and preserve difference. In code, I wear a caret.",
    tools: ["strings", "Ghidra"],
    answer: "xor",
    artifact:
      "check_bytes(a, b):\n    return a AND b\n\n# gate rejects: 0x6d ^ 0x1f = 0x72",
    artifactType: "binary",
    artifactFilename: "midgard-04-binary.bin",
    directive: "The routine runs without complaint. That is exactly what should worry you.",
  },
  {
    id: "05",
    title: "The Root's Canary",
    layers: "WEB // LOGIC",
    points: 250,
    fragment: "MID-0B",
    text: "Break the final assumption and bring the root online.",
    clue: "The gate trusts a value because it assumes the client is honest. What did the author forget to validate?",
    hint: "The request is carrying me. Never trust this source.",
    tools: ["Browser DevTools", "HTTP inspector"],
    answer: "user input",
    artifact:
      "GET /gate HTTP/1.1\nHost: midgard.yggdrasil.local\nX-Claim: admin=true\n\n# 400 :: boundary undefined",
    artifactType: "text",
    artifactFilename: "midgard-05-request.log",
    directive: "The gate answered. Read what it refused to say.",
  },
];

export function getTask(id: string) {
  return tasks.find((task) => task.id === id);
}
