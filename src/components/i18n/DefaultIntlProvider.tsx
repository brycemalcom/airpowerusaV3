"use client";

import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages } from "next-intl";
import enMessages from "../../../messages/en.json";
import type { PropsWithChildren } from "react";

export default function DefaultIntlProvider({ children }: PropsWithChildren) {
  return (
    <NextIntlClientProvider locale="en" messages={enMessages as AbstractIntlMessages}>
      {children}
    </NextIntlClientProvider>
  );
}


