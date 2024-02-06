import { useState } from "react";

export default function unstable_useStatefulComphrensive() {
  const [unstable_dropdownButtonText, unstable_setDropdownButtonText] =
    useState<string>("US");

  return {
    unstable_dropdownButtonText,
    unstable_setDropdownButtonText,
  };
}
