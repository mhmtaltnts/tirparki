import { getUser } from "@/lib/data/user-data";
import React from "react";
import { auth } from "../../api/auth/[...nextauth]/auth";
import UpdateProfileForm from "./update-profile-form";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

export default async function ProfilePage() {
  const session = await auth();
  const me = await getUser(session?.user?.id as string);

  if (!me) {
    // Handle the case when user is not found
    return (
      <main className="mx-auto flex h-full flex-col items-center py-10 md:px-6">
        <PageHeader>
          <PageHeaderHeading>Profil Bulunamadı</PageHeaderHeading>
          <PageHeaderDescription>
            Kullanıcı bilgilerinize erişilemedi.
          </PageHeaderDescription>
        </PageHeader>
      </main>
    );
  }

  return (
    <main className="mx-auto flex h-full flex-col items-center py-10 md:px-6">
      <PageHeader>
        <PageHeaderHeading>Profiliniz</PageHeaderHeading>
        <PageHeaderDescription>
          Bu sayfadan kişisel bilgilerinizi güncelleyebilirsiniz.
        </PageHeaderDescription>
      </PageHeader>
      <UpdateProfileForm user={me} />
    </main>
  );
}
