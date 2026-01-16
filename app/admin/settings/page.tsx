"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    // Basic Info
    siteName: "Kacchi Dine",
    contactEmail: "info@kacchidine.com",
    contactPhone: "+8801711-123456",
    address: "Dhaka, Bangladesh",

    // Restaurant-specific
    openingTime: "11:00 AM",
    closingTime: "11:00 PM",
    deliveryEnabled: true,
    takeoutEnabled: true,
    featuredBranches: ["Sadar", "Barishal"],

    // Promotions & SEO
    defaultPromo: "KACCHI20",
    seoMetaTitle: "Kacchi Dine - Authentic Bangladeshi Kacchi Biryani",
    seoMetaDescription:
      "Order authentic Dhakai Kacchi Biryani from Kacchi Dine. Fresh ingredients, slow-cooked perfection, delivered to your doorstep.",

    // Social Media
    facebookUrl: "",
    instagramUrl: "",
    tiktokUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSwitchChange = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleSave = () => {
    console.log("Settings saved", settings);
    alert("Settings saved successfully!");
    // Connect to API for backend save
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Admin Settings</h1>

      {/* General Info */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">General Info</h2>
        <div className="grid gap-4">
          <Input
            label="Site Name"
            name="siteName"
            value={settings.siteName}
            onChange={handleChange}
          />
          <Input
            label="Contact Email"
            name="contactEmail"
            type="email"
            value={settings.contactEmail}
            onChange={handleChange}
          />
          <Input
            label="Contact Phone"
            name="contactPhone"
            value={settings.contactPhone}
            onChange={handleChange}
          />
          <Textarea
            label="Address"
            name="address"
            value={settings.address}
            onChange={handleChange}
          />
        </div>
      </section>

      {/* Operating Hours */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Operating Hours</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Opening Time"
            name="openingTime"
            type="time"
            value={settings.openingTime}
            onChange={handleChange}
          />
          <Input
            label="Closing Time"
            name="closingTime"
            type="time"
            value={settings.closingTime}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-4 mt-4">
          <div className="flex items-center gap-2">
            <Switch
              checked={settings.deliveryEnabled}
              onCheckedChange={() => handleSwitchChange("deliveryEnabled")}
            />
            <span>Delivery Enabled</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={settings.takeoutEnabled}
              onCheckedChange={() => handleSwitchChange("takeoutEnabled")}
            />
            <span>Takeout Enabled</span>
          </div>
        </div>
      </section>

      {/* Promotions & SEO */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Promotions & SEO</h2>
        <div className="grid gap-4">
          <Input
            label="Default Promo Code"
            name="defaultPromo"
            value={settings.defaultPromo}
            onChange={handleChange}
          />
          <Input
            label="SEO Meta Title"
            name="seoMetaTitle"
            value={settings.seoMetaTitle}
            onChange={handleChange}
          />
          <Textarea
            label="SEO Meta Description"
            name="seoMetaDescription"
            value={settings.seoMetaDescription}
            onChange={handleChange}
          />
        </div>
      </section>

      {/* Social Media */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Social Media Links</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Input
            label="Facebook URL"
            name="facebookUrl"
            value={settings.facebookUrl}
            onChange={handleChange}
          />
          <Input
            label="Instagram URL"
            name="instagramUrl"
            value={settings.instagramUrl}
            onChange={handleChange}
          />
          <Input
            label="TikTok URL"
            name="tiktokUrl"
            value={settings.tiktokUrl}
            onChange={handleChange}
          />
        </div>
      </section>

      <Button
        onClick={handleSave}
        className="bg-yellow-400 hover:bg-yellow-500 mt-6"
      >
        Save Settings
      </Button>
    </div>
  );
}
