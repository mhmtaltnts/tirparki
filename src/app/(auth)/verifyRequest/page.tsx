import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function VerifyRequestPage() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>E-postanızı kontrol ediniz.</CardTitle>
        </CardHeader>
        <CardContent>E-posta adresinize giriş linki gönderildi</CardContent>
      </Card>
    </main>
  );
}
