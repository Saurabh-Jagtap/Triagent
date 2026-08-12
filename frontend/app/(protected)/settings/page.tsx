"use client";
import { useSession } from "@/utils/auth-client";
import { Check, Pencil, X } from "lucide-react";
import { useEffect, useState } from "react";

const SettingsPage = () => {
  const { data: session, isPending } = useSession();
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(session?.user?.name ?? "");
  const [isSavingName, setIsSavingName] = useState(false);
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session?.user?.name]);

  const handleSaveName = async () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      setNameError("Name cannot be empty.");
      return;
    }

    setIsSavingName(true);
    setNameError("");

    try {
      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: trimmedName,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ?? "Failed to update name"
        );
      }

      setName(data.user.name);
      setIsEditingName(false);
    } catch (error) {
      setNameError(
        error instanceof Error
          ? error.message
          : "Failed to update name"
      );
    } finally {
      setIsSavingName(false);
    }
  };

  const handleCancelNameEdit = () => {
    setName(session?.user?.name ?? "");
    setNameError("");
    setIsEditingName(false);
  };

  if (isPending) {
    return (
      <div className="mx-auto w-full max-w-3xl">
        <div className="animate-pulse">
          <div className="h-7 w-28 rounded bg-[#E7E4DC]" />
          <div className="mt-2 h-4 w-72 rounded bg-[#E7E4DC]" />

          <div className="mt-10 h-48 rounded-xl bg-[#E7E4DC]" />
        </div>
      </div>
    );
  }

  const user = session?.user;

  const initials =
    user?.name
      ?.split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ?? "U";

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-newsreader text-[30px] font-medium tracking-[-0.02em] text-[#1C2333]">
          Settings
        </h1>

        <p className="mt-1.5 text-[13px] leading-5 text-[#7F899C]">
          Manage your account and how Triagent works for you.
        </p>
      </div>

      {/* Profile */}
      <section className="mb-10">
        <SectionHeader
          title="Profile"
          description="Your personal information"
        />

        <div className="rounded-xl border border-[#E1DED5] bg-[#FDFCF8]">
          {/* Profile identity */}
          <div className="flex items-center gap-4 border-b border-[#E8E5DD] px-5 py-5">
            {user?.image ? (
              <img
                src={user.image}
                alt={user.name ?? "Profile"}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2B3450] text-[#F6F1E4]">
                <span className="font-newsreader text-[16px]">
                  {initials}
                </span>
              </div>
            )}

            <div className="min-w-0">
              <p className="truncate text-[14px] font-medium text-[#1C2333]">
                {user?.name ?? "User"}
              </p>

              <p className="mt-0.5 truncate text-[12px] text-[#8B93A3]">
                {user?.email ?? ""}
              </p>
            </div>
          </div>

          {/* Name */}
          <div className="border-b border-[#E8E5DD] px-5 py-4">
            {!isEditingName ? (
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-[140px_1fr_auto] sm:items-center sm:gap-6">
                <div>
                  <p className="text-[12px] font-medium text-[#4A5568]">
                    Name
                  </p>
                </div>

                <p className="text-[13px] text-[#1C2333]">
                  {name || "—"}
                </p>

                <button
                  type="button"
                  onClick={() => setIsEditingName(true)}
                  className="flex w-fit items-center gap-1.5 text-[12px] text-[#7F621F] transition-colors hover:text-[#A9812F]"
                >
                  <Pencil size={13} strokeWidth={1.7} />
                  Edit
                </button>
              </div>
            ) : (
              <div>
                <p className="mb-2 text-[12px] font-medium text-[#4A5568]">
                  Name
                </p>

                <input
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setNameError("");
                  }}
                  autoFocus
                  disabled={isSavingName}
                  className="w-full rounded-lg border border-[#D8D4C9] bg-white px-3 py-2 text-[13px] text-[#1C2333] outline-none transition-colors focus:border-[#A9812F] focus:ring-1 focus:ring-[#A9812F]/20 disabled:opacity-60"
                />

                {nameError && (
                  <p className="mt-2 text-[11.5px] text-[#8B342D]">
                    {nameError}
                  </p>
                )}

                <div className="mt-3 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={handleCancelNameEdit}
                    disabled={isSavingName}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] text-[#6B7280] transition-colors hover:bg-[#F1EFE8] disabled:opacity-50"
                  >
                    <X size={13} strokeWidth={1.7} />
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveName}
                    disabled={isSavingName}
                    className="flex items-center gap-1.5 rounded-lg bg-[#1C2333] px-3 py-1.5 text-[12px] font-medium text-[#F6F1E4] transition-colors hover:bg-[#273247] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Check size={13} strokeWidth={1.7} />
                    {isSavingName ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Email */}
          <div className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[140px_1fr] sm:items-center sm:gap-6">
            <div>
              <p className="text-[12px] font-medium text-[#4A5568]">
                Email
              </p>
            </div>

            <p className="text-[13px] text-[#1C2333]">
              {user?.email ?? "—"}
            </p>
          </div>
        </div>
      </section>

      {/* Connected Accounts */}
      <section className="mb-10">
        <SectionHeader
          title="Connected accounts"
          description="Services Triagent can access"
        />

        <div className="rounded-xl border border-[#E1DED5] bg-[#FDFCF8]">
          <AccountRow
            name="Gmail"
            description="Email and inbox access"
          />

          <AccountRow
            name="Google Calendar"
            description="Calendar and meeting access"
            last
          />
        </div>
      </section>

      {/* Timezone */}
      <section className="mb-10">
        <SectionHeader
          title="Timezone"
          description="Used when interpreting and displaying dates"
        />

        <div className="rounded-xl border border-[#E1DED5] bg-[#FDFCF8] px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[13px] font-medium text-[#1C2333]">
                Your timezone
              </p>

              <p className="mt-1 text-[12px] text-[#8B93A3]">
                This will be used for meetings and date-related tasks.
              </p>
            </div>

            <span className="shrink-0 text-[12px] text-[#4A5568]">
              Loading...
            </span>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section>
        <SectionHeader
          title="Danger zone"
          description="These actions cannot be undone"
        />

        <div className="rounded-xl border border-[#E4CFCB] bg-[#FDF9F8] px-5 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[13px] font-medium text-[#7A302A]">
                Delete account
              </p>

              <p className="mt-1 max-w-lg text-[12px] leading-5 text-[#956C67]">
                Permanently delete your Triagent account and associated data.
              </p>
            </div>

            <button
              type="button"
              className="shrink-0 rounded-lg border border-[#D6AAA5] px-3.5 py-2 text-[12px] font-medium text-[#8B342D] transition-colors hover:bg-[#F7EDEA]"
            >
              Delete account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

type SectionHeaderProps = {
  title: string;
  description: string;
};

function SectionHeader({
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="mb-3">
      <h2 className="text-[13px] font-medium text-[#1C2333]">
        {title}
      </h2>

      <p className="mt-0.5 text-[11.5px] text-[#8B93A3]">
        {description}
      </p>
    </div>
  );
}

type AccountRowProps = {
  name: string;
  description: string;
  last?: boolean;
};

function AccountRow({
  name,
  description,
  last = false,
}: AccountRowProps) {
  return (
    <div
      className={[
        "flex items-center justify-between gap-4 px-5 py-4",
        !last && "border-b border-[#E8E5DD]",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F0EEE7]">
          <span className="text-[11px] font-semibold text-[#4A5568]">
            {name === "Gmail" ? "G" : "GC"}
          </span>
        </div>

        <div className="min-w-0">
          <p className="text-[13px] font-medium text-[#1C2333]">
            {name}
          </p>

          <p className="mt-0.5 truncate text-[11.5px] text-[#8B93A3]">
            {description}
          </p>
        </div>
      </div>

      <span className="flex shrink-0 items-center gap-1.5 text-[11px] font-medium text-[#2A7A4B]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#2A7A4B]" />
        Connected
      </span>
    </div>
  );
}

export default SettingsPage;