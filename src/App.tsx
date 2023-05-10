import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Tiptap } from "./Tiptap";
import { Lexical } from "./Lexical";
import { Top } from "./Top";

const router = createBrowserRouter([
  { path: "/", element: <Top /> },
  { path: "/tiptap", element: <Tiptap /> },
  { path: "/lexical", element: <Lexical /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
