"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "Kacchi Dine",
    contactEmail: "info@kacchidine.com",
    contactPhone: "+8801711-123456",
    address: "Dhaka, Bangladesh",

    openingTime: "11:00",
    closingTime: "23:00",
    deliveryEnabled: true,
    takeoutEnabled: true,

    defaultPromo: "KACCHI20",
    seoMetaTitle: "Kacchi Dine - Authentic Bangladeshi Kacchi",
    seoMetaDescription:
      "Order authentic Dhakai Kacchi Biryani with fast delivery.",

    facebookUrl: "",
    instagramUrl: "",
    tiktokUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSwitch = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    console.log("Saved Settings:", settings);
    alert("Settings saved successfully");
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Settings</h1>

      {/* GENERAL INFO */}
      <Section title="General Information">
        <Field label="Site Name">
          <Input
            name="siteName"
            value={settings.siteName}
            onChange={handleChange}
          />
        </Field>

        <Field label="Contact Email">
          <Input
            name="contactEmail"
            type="email"
            value={settings.contactEmail}
            onChange={handleChange}
          />
        </Field>

        <Field label="Contact Phone">
          <Input
            name="contactPhone"
            value={settings.contactPhone}
            onChange={handleChange}
          />
        </Field>

        <Field label="Address">
          <Textarea
            name="address"
            value={settings.address}
            onChange={handleChange}
          />
        </Field>
      </Section>

      {/* OPERATING HOURS */}
      <Section title="Operating Hours">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Opening Time">
            <Input
              type="time"
              name="openingTime"
              value={settings.openingTime}
              onChange={handleChange}
            />
          </Field>

          <Field label="Closing Time">
            <Input
              type="time"
              name="closingTime"
              value={settings.closingTime}
              onChange={handleChange}
            />
          </Field>
        </div>

        <div className="flex gap-6 mt-4">
          <Toggle
            label="Delivery Enabled"
            checked={settings.deliveryEnabled}
            onChange={() => handleSwitch("deliveryEnabled")}
          />
          <Toggle
            label="Takeaway Enabled"
            checked={settings.takeoutEnabled}
            onChange={() => handleSwitch("takeoutEnabled")}
          />
        </div>
      </Section>

      {/* SEO */}
      <Section title="SEO & Promotion">
        <Field label="Promo Code">
          <Input
            name="defaultPromo"
            value={settings.defaultPromo}
            onChange={handleChange}
          />
        </Field>

        <Field label="Meta Title">
          <Input
            name="seoMetaTitle"
            value={settings.seoMetaTitle}
            onChange={handleChange}
          />
        </Field>

        <Field label="Meta Description">
          <Textarea
            name="seoMetaDescription"
            value={settings.seoMetaDescription}
            onChange={handleChange}
          />
        </Field>
      </Section>

      {/* SOCIAL */}
      <Section title="Social Media">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Facebook URL"
            name="facebookUrl"
            value={settings.facebookUrl}
            onChange={handleChange}
          />
          <Input
            placeholder="Instagram URL"
            name="instagramUrl"
            value={settings.instagramUrl}
            onChange={handleChange}
          />
          <Input
            placeholder="TikTok URL"
            name="tiktokUrl"
            value={settings.tiktokUrl}
            onChange={handleChange}
          />
        </div>
      </Section>

      <Button
        onClick={handleSave}
        className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-black"
      >
        Save Settings
      </Button>
    </div>
  );
}

/* ---------- Reusable UI Blocks ---------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10 bg-white rounded-lg p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <Switch checked={checked} onCheckedChange={onChange} />
      <span className="text-sm">{label}</span>
    </div>
  );
}
