"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { useAuthStore } from "@/store/auth-store";
import { ArrowUpRight, Calendar, Download, Flame, Link2, MapPin, PenSquare, Share2, Sparkles } from "lucide-react";

interface EditLink {
  label: string;
  url: string;
}

export default function ProfilePage() {
  const { user, updateUserProfile } = useAuthStore();
  const profile = user;
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editName, setEditName] = useState(profile?.name ?? "");
  const [editHeadline, setEditHeadline] = useState(profile?.headline ?? "");
  const [editLocation, setEditLocation] = useState(profile?.location ?? "");
  const [editBio, setEditBio] = useState(profile?.bio ?? "");
  const [editLinks, setEditLinks] = useState<EditLink[]>(profile?.links ?? []);
  const quickStats = useMemo(
    () =>
      profile
        ? [
            { label: "Weekly streak", value: `${profile.streak} days`, icon: Flame },
            { label: "Location", value: profile.location, icon: MapPin },
            { label: "Focus areas", value: `${profile.focusAreas.length} streams`, icon: Sparkles },
          ]
        : [],
    [profile],
  );

  if (!profile) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-sm text-skilltree-muted">
        <p>You are currently signed out. Sign in to view and edit your profile.</p>
        <Button variant="secondary" size="sm">
          Sign in
        </Button>
      </div>
    );
  }

  const openEditor = () => {
    setEditName(profile.name);
    setEditHeadline(profile.headline);
    setEditLocation(profile.location);
    setEditBio(profile.bio);
    setEditLinks(profile.links.length ? profile.links : [{ label: "Portfolio", url: "" }]);
    setIsEditOpen(true);
  };

  const handleLinkChange = (index: number, field: keyof EditLink, value: string) => {
    setEditLinks((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const addEmptyLink = () => {
    setEditLinks((prev) => [...prev, { label: "", url: "" }]);
  };

  const removeLink = (index: number) => {
    setEditLinks((prev) => prev.filter((_, linkIndex) => linkIndex !== index));
  };

  const handleSave = () => {
    const sanitizedLinks = editLinks
      .map((link) => ({ label: link.label.trim(), url: link.url.trim() }))
      .filter((link) => link.label && link.url);

    updateUserProfile({
      name: editName.trim(),
      headline: editHeadline.trim(),
      location: editLocation.trim(),
      bio: editBio.trim(),
      links: sanitizedLinks,
    });

    setIsEditOpen(false);
  };

  return (
    <div className="space-y-8 pb-12">
      <header className="relative overflow-hidden rounded-[36px] border border-white/15 bg-[radial-gradient(circle_at_top_left,rgba(148,115,255,0.35),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(82,229,255,0.28),transparent_60%)] p-8 shadow-[0_30px_80px_rgba(8,0,40,0.5)]">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/6 via-transparent to-white/4" />
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-6">
            <div className="relative h-24 w-24 overflow-hidden rounded-[28px] border border-white/20 bg-white/10">
              <Image
                src={profile.avatarUrl}
                alt={profile.name}
                fill
                className="object-cover"
                sizes="96px"
                priority
              />
            </div>
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-3xl font-semibold text-white">{profile.name}</h2>
                <Badge variant="outline" className="border-white/20 bg-white/10 text-[11px] uppercase tracking-[0.32em] text-white">
                  {profile.headline}
                </Badge>
              </div>
              <p className="max-w-2xl text-sm text-skilltree-muted">{profile.bio}</p>
              <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.32em] text-skilltree-muted/80">
                <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  <MapPin className="h-3.5 w-3.5 text-skilltree-accent" />
                  {profile.location}
                </span>
                <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  <Flame className="h-3.5 w-3.5 text-[#ffb347]" />
                  {profile.streak} day streak
                </span>
                <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  <Calendar className="h-3.5 w-3.5 text-[#80a2ff]" />
                  Journey since 2024
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="ghost" leftIcon={<Share2 className="h-4 w-4" />}
              className="bg-white/5">
              Share profile
            </Button>
            <Button variant="ghost" leftIcon={<Download className="h-4 w-4" />} className="bg-white/5">
              Download CV
            </Button>
            <Button variant="secondary" leftIcon={<PenSquare className="h-4 w-4" />} onClick={openEditor}>
              Edit profile
            </Button>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <GlassCard
                key={stat.label}
                className="group flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 transition-transform hover:-translate-y-1"
              >
                <div>
                  <span className="text-xs uppercase tracking-[0.36em] text-skilltree-muted">{stat.label}</span>
                  <p className="mt-2 text-xl font-semibold text-white">{stat.value}</p>
                </div>
                <span className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-transparent to-white/5 p-3 text-white/80">
                  <Icon className="h-5 w-5" />
                </span>
              </GlassCard>
            );
          })}
          <GlassCard className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.36em] text-skilltree-muted">
              <span>Links</span>
              <Sparkles className="h-4 w-4 text-skilltree-accent" />
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.links.map((link) => (
                <Button
                  key={link.label}
                  size="sm"
                  variant="ghost"
                  asChild
                  className="border border-white/12 bg-white/8 text-xs text-white hover:border-white/30"
                >
                  <Link href={link.url} target="_blank" rel="noopener noreferrer">
                    <span className="flex items-center gap-1">
                      <Link2 className="h-3.5 w-3.5" />
                      {link.label}
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </Link>
                </Button>
              ))}
            </div>
          </GlassCard>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_1fr]">
        <GlassCard className="space-y-6 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Focus areas</h3>
              <p className="text-sm text-skilltree-muted">Where you’re investing your creative energy.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {profile.focusAreas.map((area) => (
              <div key={area.title} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="text-2xl">{area.emoji}</span>
                <h4 className="mt-2 text-sm font-semibold text-white">{area.title}</h4>
                <p className="mt-1 text-xs text-skilltree-muted">{area.description}</p>
                <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="space-y-4 rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white">Preferences</h3>
            <div className="flex flex-col gap-3 text-sm text-skilltree-muted">
              <span>Theme: Futuristic Dark</span>
              <span>AI Suggestions: Enabled</span>
              <span>Google Sheets Sync: Coming soon</span>
            </div>
          </GlassCard>

          <GlassCard className="space-y-4 rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white">Integrations</h3>
            <p className="text-sm text-skilltree-muted">
              Connect your SkillTree with Google Sheets and GitHub to auto-import projects and keep your progress in sync.
            </p>
            <Button size="sm" variant="secondary" className="self-start">
              Configure integrations
            </Button>
          </GlassCard>
        </div>
      </div>

      <Modal open={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit profile">
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.4em] text-skilltree-muted">
            refresh your public card — changes reflect across the app instantly
          </p>
          <label className="flex flex-col gap-2 text-sm">
            <span className="text-xs uppercase tracking-[0.4em] text-skilltree-muted">Name</span>
            <input
              value={editName}
              onChange={(event) => setEditName(event.target.value)}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-skilltree-muted focus:border-skilltree-accent/60 focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            <span className="text-xs uppercase tracking-[0.4em] text-skilltree-muted">Headline</span>
            <input
              value={editHeadline}
              onChange={(event) => setEditHeadline(event.target.value)}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-skilltree-accent/60 focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            <span className="text-xs uppercase tracking-[0.4em] text-skilltree-muted">Location</span>
            <input
              value={editLocation}
              onChange={(event) => setEditLocation(event.target.value)}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-skilltree-accent/60 focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            <span className="text-xs uppercase tracking-[0.4em] text-skilltree-muted">Bio</span>
            <textarea
              value={editBio}
              onChange={(event) => setEditBio(event.target.value)}
              rows={4}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-skilltree-accent/60 focus:outline-none"
            />
          </label>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-skilltree-muted">
              <span>Links</span>
              <button type="button" onClick={addEmptyLink} className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase text-white/80">
                Add link
              </button>
            </div>
            <div className="space-y-3">
              {editLinks.map((link, index) => (
                <div key={index} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-3">
                    <input
                      value={link.label}
                      onChange={(event) => handleLinkChange(index, "label", event.target.value)}
                      placeholder="Label (e.g. Portfolio)"
                      className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white focus:border-skilltree-accent/60 focus:outline-none"
                    />
                    <input
                      value={link.url}
                      onChange={(event) => handleLinkChange(index, "url", event.target.value)}
                      placeholder="https://"
                      className="flex-[1.6] rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white focus:border-skilltree-accent/60 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeLink(index)}
                      className="rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase text-skilltree-muted"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <Button variant="ghost" size="sm" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              Save changes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
