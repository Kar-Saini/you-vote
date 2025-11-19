import "./index.css";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import ContentPage from "./content/contentPage";
const root = document.createElement("div");
root.id = "__you_vote_whisper_container";
document.body.append(root);

createRoot(root).render(
  <StrictMode>
    <ContentPage />
  </StrictMode>
);
