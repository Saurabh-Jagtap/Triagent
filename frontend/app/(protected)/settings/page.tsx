"use client";
import { ConnectionRow } from "@/components/settings/ConnectionRow";
import { SectionHeader } from "@/components/settings/SectionHeader";
import { useConnections } from "@/hooks/useConnections";
import { signOut, useSession } from "@/utils/auth-client";
import { Check, Pencil, X } from "lucide-react";
import { useEffect, useState } from "react";

const TIMEZONES =
  typeof Intl.supportedValuesOf === "function"
    ? Intl.supportedValuesOf("timeZone")
    : [];

const SettingsPage = () => {
  const { data: session, isPending } = useSession();
  const { connections, isLoading, disconnecting, disconnect } = useConnections();

  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(session?.user?.name ?? "");
  const [isSavingName, setIsSavingName] = useState(false);
  const [nameError, setNameError] = useState("");

  const [timezone, setTimezone] = useState("");
  const [isSavingTimezone, setIsSavingTimezone] = useState(false);
  const [timezoneError, setTimezoneError] = useState("");

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session?.user?.name]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user/me", {
          credentials: "include",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message ?? "Failed to fetch user");
        }

        setTimezone(data.user.timezone);
      } catch (error) {
        console.error("Failed to fetch timezone:", error);
        setTimezoneError(
          error instanceof Error
            ? error.message
            : "Failed to fetch timezone"
        );
      }
    };

    fetchUser();
  }, []);

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

  const handleConnect = (provider: "gmail" | "googlecalendar") => {
    window.location.href =
      provider === "gmail"
        ? "/api/connect/gmail"
        : "/api/connect/googlecalendar";
  };

  const handleSaveTimezone = async (newTimezone: string) => {
    try {
      setIsSavingTimezone(true);
      setTimezoneError("");

      const response = await fetch("/api/user/timezone", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          timezone: newTimezone,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message ?? "Failed to update timezone");
      }

      setTimezone(data.timezone);
    } catch (error) {
      console.error("Failed to update timezone:", error);

      setTimezoneError(
        error instanceof Error
          ? error.message
          : "Failed to update timezone"
      );
    } finally {
      setIsSavingTimezone(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== "DELETE") {
      return;
    }

    try {
      setIsDeletingAccount(true);
      setDeleteError("");

      const response = await fetch("/api/user/account", {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ?? "Failed to delete account"
        );
      }

      // Account no longer exists, so end the Better Auth session.
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/signin";
          },
        },
      });
    } catch (error) {
      console.error("Account deletion failed:", error);

      setDeleteError(
        error instanceof Error
          ? error.message
          : "Failed to delete account"
      );

      setIsDeletingAccount(false);
    }
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
      <div className="mb-8">
        <div className="text-[12px] font-medium text-[#1A2B35] mb-3">
          Connected accounts
        </div>

        <ConnectionRow
          name="Gmail"
          connected={connections?.gmail.connected ?? false}
          isLoading={isLoading}
          isDisconnecting={disconnecting === "gmail"}
          onConnect={() => handleConnect("gmail")}
          onDisconnect={() => disconnect("gmail")}
        />

        <ConnectionRow
          name="Google Calendar"
          connected={connections?.googleCalendar.connected ?? false}
          isLoading={isLoading}
          isDisconnecting={disconnecting === "googlecalendar"}
          onConnect={() => handleConnect("googlecalendar")}
          onDisconnect={() => disconnect("googlecalendar")}
        />
      </div>

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

            <select
              value={timezone}
              onChange={(event) =>
                handleSaveTimezone(event.target.value)
              }
              disabled={!timezone || isSavingTimezone}
              className="w-full max-w-[220px] rounded-lg border border-[#D8D4C9] bg-white px-3 py-2 text-[12px] text-[#1C2333] outline-none transition-colors focus:border-[#A9812F] focus:ring-1 focus:ring-[#A9812F]/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {!timezone && (
                <option value="">
                  Loading...
                </option>
              )}

              {TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>

            {timezoneError && (
              <p className="mt-2 text-[11.5px] text-[#8B342D]">
                {timezoneError}
              </p>
            )}
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
  onClick={() => {
    setDeleteConfirmation("");
    setDeleteError("");
    setShowDeleteDialog(true);
  }}
  className="rounded-lg border border-[#D8C6C2] px-4 py-2 text-[12px] text-[#8B342D] hover:bg-[#FBF5F4] transition-colors"
>
  Delete Account
</button>
          </div>
        </div>
      </section>

      {showDeleteDialog && (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    {/* Backdrop */}
    <button
      type="button"
      aria-label="Close dialog"
      onClick={() => {
        if (!isDeletingAccount) {
          setShowDeleteDialog(false);
        }
      }}
      className="absolute inset-0 bg-[#1C2333]/40 backdrop-blur-[2px]"
    />

    {/* Dialog */}
    <div className="relative w-full max-w-md rounded-xl border border-[#DDD8CB] bg-[#FDFCFA] p-6 shadow-xl">
      <div className="mb-5">
        <h2 className="font-newsreader text-[22px] font-medium text-[#1C2333]">
          Delete your account?
        </h2>

        <p className="mt-2 text-[12.5px] leading-5 text-[#687181]">
          This permanently deletes your Triagent account,
          connected integrations, conversations, and
          associated data. This action cannot be undone.
        </p>
      </div>

      <div className="mb-5">
        <label
          htmlFor="delete-confirmation"
          className="block text-[11.5px] font-medium text-[#4A5568] mb-2"
        >
          Type <span className="font-semibold">DELETE</span>{" "}
          to confirm
        </label>

        <input
          id="delete-confirmation"
          type="text"
          value={deleteConfirmation}
          onChange={(event) =>
            setDeleteConfirmation(event.target.value)
          }
          disabled={isDeletingAccount}
          autoComplete="off"
          placeholder="DELETE"
          className="w-full rounded-lg border border-[#D8D4C9] bg-white px-3 py-2.5 text-[13px] text-[#1C2333] outline-none transition-colors placeholder:text-[#B0B3B8] focus:border-[#A9812F] focus:ring-1 focus:ring-[#A9812F]/20 disabled:opacity-60"
        />

        {deleteError && (
          <p className="mt-2 text-[11.5px] text-[#8B342D]">
            {deleteError}
          </p>
        )}
      </div>

      <div className="flex items-center justify-end gap-2.5">
        <button
          type="button"
          disabled={isDeletingAccount}
          onClick={() => setShowDeleteDialog(false)}
          className="rounded-lg px-4 py-2 text-[12px] text-[#687181] hover:bg-[#F2F0EA] transition-colors disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="button"
          disabled={
            deleteConfirmation !== "DELETE" ||
            isDeletingAccount
          }
          onClick={handleDeleteAccount}
          className="rounded-lg bg-[#8B342D] px-4 py-2 text-[12px] text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isDeletingAccount
            ? "Deleting..."
            : "Delete account"}
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default SettingsPage;