import React, { useRef } from "react";
import ReactDOM from "react-dom/client";

import Editor from "@monaco-editor/react";
import prettier from "prettier";
import babelParser from "prettier/parser-babel";



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
    monaco.languages.registerCompletionItemProvider("gherkin", {
      provideCompletionItems: function (model: any, position: any) {
        var textUntilPosition = model.getValueInRange({
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });
        var match = textUntilPosition.match(/(?:^|\n)(?:Given|When|Then)\s+(.*)$/);
        if (match) {
          var keywords = ["I am on the homepage", "I click the button", "I see the success message"];
          var suggestions = keywords.map(function (keyword) {
            return {
              label: keyword,
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: keyword,
            };
          });
          return {
            suggestions: suggestions,
          };
        }
        return { suggestions: [] };
      },
    });
  }

  function showValue() {
    console.log(editorRef.current.getValue());
  }

  const onFormatClick = () => {
    // get current value from editor
    const unformatted = editorRef.current.getModel().getValue();

    //format the value
    const formatted = prettier.format(unformatted, {
      parser: "babel",
      plugins: [babelParser],
      useTabs: false,
      semi: true,
    });

    // set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  };

  return (
    <>
      <div>
        <button onClick={onFormatClick}>Format</button>
        <button onClick={showValue}>Show value</button>
        <Editor
          language="gherkin"
          theme="vs-dark"
          height="500px"
          defaultValue={`Feature: Test feature
  Scenario: Test scenario
    Given I am on the homepage
    When I click the button
    Then I see the success message`}
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
