import React from "react";
import { Footer as SharedFooter } from "@r-cz/ui";

export function Footer() {
  return (
    <SharedFooter 
      showGithubLink={true}
      showMainSiteLink={true}
    />
  );
}