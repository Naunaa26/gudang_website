import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import { useAuth } from "../auth/AuthProvider";
import { Link } from "react-router-dom";

export default function DropdownUser() {
  const { user, username, avatar } = useAuth();
  const [formData, setFormData] = useState({
    email: user?.email || "",
    username: username || "User 404",
    avatar: avatar || "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  });

  useEffect(() => {
    setFormData({
      email: user?.email || "",
      username: username || "User 404",
      avatar: avatar || "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    });
  }, [user, username, avatar]);

  return (
    <div className="flex items-center gap-2 md:gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              className: "w-8 h-8 md:w-10 md:h-10",
              src: formData.avatar,
              color: "primary",
            }}
            className="transition-transform"
          >
            <div className="hidden md:block">
              <p className="font-semibold">{formData.email || "Admin"}</p>
            </div>
          </User>
        </DropdownTrigger>

        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem
            key="profile"
            className="h-14 gap-2 text-black dark:text-white"
          >
            <p className="font-bold text-sm md:text-base">Signed in as</p>
            <p className="font-bold text-sm md:text-base">
              @{formData.username}
            </p>
          </DropdownItem>

          <DropdownItem
            key="profile-link"
            as={Link}
            to="/profile"
            className="flex items-center gap-2 text-black dark:text-white"
          >
            <span className="text-sm md:text-base">My Profile</span>
          </DropdownItem>

          <DropdownItem
            key="settings"
            className="text-sm md:text-base text-black dark:text-white"
          >
            Settings
          </DropdownItem>
          <DropdownItem
            key="help"
            className="text-sm md:text-base text-black dark:text-white"
          >
            Help & Support
          </DropdownItem>
          <DropdownItem
            key="feedback"
            className="text-sm md:text-base text-black dark:text-white"
          >
            Give Feedback
          </DropdownItem>
          <DropdownItem
            key="contact"
            className="text-sm md:text-base text-black dark:text-white"
          >
            Contact Us
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
