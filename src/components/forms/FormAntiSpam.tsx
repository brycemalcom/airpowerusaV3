"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import {
  FORM_LOADED_AT_FIELD,
  HONEYPOT_FIELD,
  TURNSTILE_TOKEN_FIELD,
} from "@/lib/form-submission-guard-constants";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export type AntiSpamFieldBag = Record<string, string | number>;

export type FormAntiSpamHandle = {
  getFields: () => AntiSpamFieldBag;
  /** True when Turnstile must be shown and token is still empty. */
  needsTurnstileInteraction: () => boolean;
};

type Props = {
  variant?: "dark" | "light";
};

export const FormAntiSpam = forwardRef<FormAntiSpamHandle, Props>(
  function FormAntiSpam({ variant = "light" }, ref) {
    const loadedAtRef = useRef<number | null>(null);
    if (loadedAtRef.current === null) {
      loadedAtRef.current = Date.now();
    }
    const [honeypot, setHoneypot] = useState("");
    const [token, setToken] = useState("");

    useImperativeHandle(ref, () => ({
      getFields: () => ({
        [TURNSTILE_TOKEN_FIELD]: token,
        [HONEYPOT_FIELD]: honeypot,
        [FORM_LOADED_AT_FIELD]: loadedAtRef.current!,
      }),
      needsTurnstileInteraction: () =>
        Boolean(SITE_KEY) && !token.trim(),
    }));

    const boxClass =
      variant === "dark"
        ? "border-white/10 bg-black/20"
        : "border-slate-200 bg-slate-50";

    return (
      <>
        <div
          className="pointer-events-none absolute left-0 top-0 -z-10 h-0 w-0 overflow-hidden opacity-0"
          aria-hidden="true"
        >
          <label htmlFor={HONEYPOT_FIELD}>Company website</label>
          <input
            id={HONEYPOT_FIELD}
            name={HONEYPOT_FIELD}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>
        {SITE_KEY ? (
          <div
            className={`flex justify-center rounded-md border py-2 ${boxClass}`}
          >
            <Turnstile
              siteKey={SITE_KEY}
              onSuccess={setToken}
              onExpire={() => setToken("")}
              onError={() => setToken("")}
            />
          </div>
        ) : null}
      </>
    );
  }
);
