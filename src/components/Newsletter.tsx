"use client";

import { useState } from "react";
import { ArrowIcon } from "./Icons";

type Status = "idle" | "sending" | "done" | "error";

/**
 * "Join the rhythm circle" signup. Posts to /api/subscribe, which forwards
 * to whichever newsletter service is configured (see that route).
 */
export default function Newsletter() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="newsletter-form-block w-form">
      {status !== "done" && (
        <form className="newsletter-form" onSubmit={onSubmit}>
          <div className="newsletter-form-top">
            <label htmlFor="email" className="label">
              join the rhythm circle
            </label>
            <div className="newsletter-field-master">
              <input
                className="text-field w-input"
                maxLength={256}
                name="email"
                placeholder="Email address"
                type="email"
                id="email"
                autoComplete="email"
                required
              />
              <div className="submit-button-wrap">
                <input
                  type="submit"
                  className="submit-button w-button"
                  value={status === "sending" ? "Please wait..." : ""}
                  aria-label="Subscribe"
                  disabled={status === "sending"}
                />
                <div className="cta-arrow">
                  <ArrowIcon />
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
      {status === "done" && (
        <div className="success-message w-form-done" style={{ display: "block" }} role="status">
          <div>Thank you! Your submission has been received!</div>
        </div>
      )}
      {status === "error" && (
        <div className="error-message w-form-fail" style={{ display: "block" }} role="alert">
          <div>Oops! Something went wrong while submitting the form.</div>
        </div>
      )}
    </div>
  );
}
