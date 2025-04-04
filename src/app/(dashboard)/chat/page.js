"use client"

import dynamic from "next/dynamic";

const ChatWithCourse = dynamic(() => import("@/components/ChatWithCourse"), {
  ssr: false,
});

export default function Page() {
  return <ChatWithCourse />;
}
