import { clearAuthCookies } from "@/lib/helper";
import {
  UserLogoutApiHandler,
  UserLogoutResponse,
} from "@/services/userService";
import { Divider, Menu, MenuItem } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "react-toastify";

export default function ProfileMenu({ anchorEl, open, handleClose }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleRedirect = (routeName: string) => {
    router.push(routeName);
  };

  const { mutate: handleLogoutApi, isPending } = useMutation({
    mutationFn: async (): Promise<UserLogoutResponse> => {
      return await UserLogoutApiHandler();
    },
    onSuccess: async (response: UserLogoutResponse) => {
      console.log("response", response);
      localStorage.clear();
      await clearAuthCookies();
      router.replace("/signup");
    },
    onError: (error: any) => {
      console.log("error", error);
      if (Array.isArray(error.message)) {
        error.message.map((item: string) => {
          toast.error(item);
        });
      } else {
        toast.error(error.message);
      }
    },
  });

  const handleLogout = () => {
    handleLogoutApi();
    queryClient.clear();
  };

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      sx={{
        mt: "20px",
      }}
    >
      <MenuItem
        onClick={() => handleRedirect("/profile")}
        className="text-sm! py-3! px-6!"
        sx={{
          "&.MuiMenuItem-root:hover": {
            backgroundColor: "#0000000a",
          },
        }}
      >
        My Profile
      </MenuItem>

      <Divider className="m-0!" />

      <MenuItem
        onClick={() => {}}
        className="text-sm! py-3! px-6!"
        sx={{
          "&.MuiMenuItem-root:hover": {
            backgroundColor: "#0000000a",
          },
        }}
      >
        Go to Kma.com
      </MenuItem>

      <Divider className="m-0!" />

      <MenuItem
        onClick={handleLogout}
        className="text-sm! py-3! px-6! text-[#ea4738]! font-medium! flex justify-between items-center"
        sx={{
          "&.MuiMenuItem-root:hover": {
            backgroundColor: "#ea47381a",
          },
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );
}
