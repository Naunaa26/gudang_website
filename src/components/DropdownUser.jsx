import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";

export default function DropdownUser() {
  return (
    <div className="flex items-center gap-2 md:gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              className: "w-8 h-8 md:w-10 md:h-10",
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
              color: "primary",
            }}
            className="transition-transform  "
          >
            <div className="hidden md:blocks">
              {" "}
              <p className="font-semibold">M.Naufal T</p>
              <p className="text-xs text-gray-400">@Bluenaufal7@gmail.com</p>
            </div>
          </User>
        </DropdownTrigger>

        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold text-sm md:text-base">Signed in as</p>
            <p className="font-bold text-sm md:text-base">@M.Naufal.T</p>
          </DropdownItem>
          <DropdownItem key="settings" className="text-sm md:text-base">
            My Settings
          </DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            className="text-sm md:text-base"
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
