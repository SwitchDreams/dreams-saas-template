import React from "react";

import { AlertProvider } from "@/contexts/Alert";

const DefaultLayout = ({ children }) => {
  return <AlertProvider>{children}</AlertProvider>;
};

export default DefaultLayout;
