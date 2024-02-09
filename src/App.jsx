import Editor from "@monaco-editor/react";
import React, { useRef } from 'react';
import { MonacoBinding } from "y-monaco";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";

function App() {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    // Initialize YJS
    const doc = new Y.Doc();
    // Connect to peers (or start connection) with WebRTC
    const provider = new WebrtcProvider("test-room", doc);
    const type = doc.getText("monaco");
    // Bind YJS to Monaco 
    const binding = new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness);
  }

  function handleSaveCode() {
    const currentCode = editorRef.current.getValue();

    // Create a Blob with the code content
    const blob = new Blob([currentCode], { type: 'text/plain' });

    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);

    // Set the file name (you can customize this)
    downloadLink.download = 'saved_code.txt';

    // Append the link to the body
    document.body.appendChild(downloadLink);

    // Trigger a click on the link to start the download
    downloadLink.click();

    // Remove the link from the DOM
    document.body.removeChild(downloadLink);
  }

  return (
    <div>
      <Editor
        height="80vh"
        width="100vw"
        theme="vs-dark"
        onMount={handleEditorDidMount}
      />
      <button onClick={handleSaveCode}>Save Code</button>
    </div>
  );
}

export default App;
