import MonacoEditor, { OnMount } from "@monaco-editor/react";

/*
interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const onEditorOnMount: OnMount = (getValue: () => string, monacoEditor: any) => { //error here
    monacoEditor.onDidChangeModelContent(() => {
        onChange(getValue());
    });
  };

  return (
    <MonacoEditor
      onMount={onEditorOnMount}
      value={initialValue}
      language="javascript"
      theme="vs-dark"
      height="500px"
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
  );
};

export default CodeEditor;
*/
