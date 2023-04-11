import React, { useRef } from "react";
import ReactDOM from "react-dom/client";

import Editor from "@monaco-editor/react";

function App() {
  const editorRef = useRef<any>();

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;

    monaco.languages.register({ id: "gherkin" });
    monaco.languages.setMonarchTokensProvider("gherkin", {
      tokenizer: {
        root: [
          [/#.*$/, "comment"],
          [/\b(Feature|Scenario|Given|When|Then|And)\b/, "keyword"],
        ],
      },
    });

    // Register completion provider for the `gherkin` language
    monaco.languages.registerCompletionItemProvider("gherkin", {
      triggerCharacters: ["G", "W", "T", "A"], // Trigger completion only when the user types a new step keyword

      provideCompletionItems: function (model: any, position: any) {
        var textUntilPosition = model.getValueInRange({
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });

        var match = textUntilPosition.match(
          /(?:^|\n)(?:Given|When|Then|And)\s+(.*)$/
        );

        if (match == null) {
          // Recalculate the array of rows based on the current content of the editor
          let content = model.getValue();
          let arrayOfRows = content.split("\n");
          let keywords: any[] = [];
          arrayOfRows.forEach((element: any) => {
            if(!keywords.includes(element)) {
              keywords.push(element)
            }
        });
      
          var suggestions = keywords.map(function (keyword: any) {
            return {
              label: keyword,
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: keyword,
            };
          });

          console.log(suggestions);
          return { suggestions };
        }
      },
    },);
  }

  function showValue() {
    console.log(editorRef.current.getValue());
  }

  return (
    <>
      <div>
        <button onClick={showValue}>Show value</button>
        <Editor
          language="gherkin"
          theme="vs-dark"
          height="500px"
  //         defaultValue={`Feature: Test feature
  // Scenario: Test scenario`}
          onMount={handleEditorDidMount}
          options={{
            wordWrap: "on",
            minimap: { enabled: false },
            showUnused: false,
            folding: false,
            lineNumbersMinChars: 3,
            fontSize: 18,
            automaticLayout: true,
          }}
        />
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
