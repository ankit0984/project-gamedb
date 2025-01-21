"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(160).optional(),
});

const UserAccountSection = () => {
  const [avatar, setAvatar] = useState("/placeholder.svg?height=100&width=100");
  const [formData, setFormData] = useState({
    username: "johndoe",
    fullName: "John Doe",
    email: "john.doe@example.com",
    bio: "I'm a software developer passionate about creating intuitive user experiences.",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      formSchema.parse(formData);
      toast.success("Account updated successfully!");
      console.log(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-muted rounded px-8 pt-6 pb-8 mb-4">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
      <p className="mb-6 text-gray-600">
        Manage your account information and preferences.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={avatar || "/placeholder.svg"}
            alt="User avatar"
            className="w-20 h-20 rounded-full"
          />
          <div>
            <Label
              htmlFor="avatar-upload"
              className="cursor-pointer text-blue-500 hover:underline"
            >
              Change avatar
            </Label>
            <Input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
        </div>

        <div>
          <Label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Username
          </Label>
          <Input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="johndoe"
          />
          <p className="text-gray-600 text-xs italic mt-1">
            This is your public display name.
          </p>
        </div>

        <div>
          <Label
            htmlFor="fullName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Full Name
          </Label>
          <Input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="John Doe"
          />
        </div>

        <div>
          <Label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className=" w-full py-2 px-3 "
            placeholder="john.doe@example.com"
          />
        </div>

        <div>
          <Label
            htmlFor="bio"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Bio
          </Label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24 resize-none"
            placeholder="Tell us a little about yourself"
          />
          <p className="text-gray-600 text-xs italic mt-1">
            You can @mention other users and organizations to link to them.
          </p>
        </div>

        <div>
          <Button type="submit" className="bg-primary py-2 px-4">
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserAccountSection;
