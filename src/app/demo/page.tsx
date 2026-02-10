"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import * as Sentry from "@sentry/nextjs";
import { useAuth } from "@clerk/nextjs";


export default function DemoPage() {
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const {userId }= useAuth();

  const handleBlocking = async () => {
    setLoading(true);
    await fetch("/api/demo/blocking", { method: "POST" });
    setLoading(false);
  };
  const handleBackground = async () => {
    setLoading1(true);
    await fetch("/api/demo/background", { method: "POST" });
    setLoading1(false);
  };
  const handleClientError = () => {
    Sentry.logger.info("User attempted to click on client function",{userId});
    throw new Error("Client error: Something went wrong in the browser!");
  };
  const handleApiError = async () => {
    await fetch("/api/demo/error", { method: "POST" });
  };
  const handleInngestError = async () => {
    await fetch("/api/demo/inngest-error", { method: "POST" });
  };

  return (
    <div className="p-8 spaxe-x-4">
      <Button disabled={loading} onClick={handleBlocking}>
        {loading ? "Loading.." : "Blocking"}
      </Button>
      <Button disabled={loading1} onClick={handleBackground}>
        {loading ? "Loading.." : "Background"}
      </Button>
      <Button variant={"destructive"} onClick={handleClientError}>
        Cliet Error
      </Button>
      <Button variant={"destructive"} onClick={handleApiError}>
        API ERROR
      </Button>
      <Button variant={"destructive"} onClick={handleInngestError}>
        INGEST ERROR
      </Button>
    </div>
  );
}
