import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { FaHome, FaTable, FaBoxOpen, FaUsers } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import LogoIcon from "@mui/icons-material/Store";
import ListItemButton from "@mui/material/ListItemButton";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  justifyContent: "space-between",
}));

export default function SimpleMenuIcon() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <DrawerHeader>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "rgba(36, 36, 36, 0.8)",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      </DrawerHeader>

      <Drawer
        anchor="left"
        open={open}
        onClose={handleDrawerOpen}
        PaperProps={{
          sx: {
            backgroundColor: "#242424",
            color: "#fff",
          },
        }}
      >
        <DrawerHeader>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={handleDrawerOpen}
              sx={{
                color: "#fff",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                borderRadius: "100px",
                marginRight: theme.spacing(1),
                marginTop: "10px",
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <LogoIcon
              sx={{
                color: "#fff",
                marginRight: theme.spacing(1),
                marginTop: "10px",
              }}
            />
            <Typography variant="h6" sx={{ color: "#fff", marginTop: "10px" }}>
              Warehouse
            </Typography>
          </Box>
        </DrawerHeader>
        <Box
          sx={{
            width: 250,
            padding: theme.spacing(2),
          }}
          role="presentation"
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/"
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                  borderRadius: "5px",
                  backgroundColor:
                    location.pathname === "/"
                      ? "rgba(255, 255, 255, 0.2)"
                      : "transparent",
                  color: location.pathname === "/" ? "#FFD700" : "#fff",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: location.pathname === "/" ? "#FFD700" : "#fff",
                  }}
                >
                  <FaHome />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/tabel"
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                  borderRadius: "5px",
                  backgroundColor:
                    location.pathname === "/tabel"
                      ? "rgba(255, 255, 255, 0.2)"
                      : "transparent",
                  color: location.pathname === "/tabel" ? "#FFD700" : "#fff",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: location.pathname === "/tabel" ? "#FFD700" : "#fff",
                  }}
                >
                  <FaTable />
                </ListItemIcon>
                <ListItemText primary="Tabel Barang" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/semua-barang"
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                  borderRadius: "5px",
                  backgroundColor:
                    location.pathname === "/semua-barang"
                      ? "rgba(255, 255, 255, 0.2)"
                      : "transparent",
                  color:
                    location.pathname === "/semua-barang" ? "#FFD700" : "#fff",
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      location.pathname === "/semua-barang"
                        ? "#FFD700"
                        : "#fff",
                  }}
                >
                  <FaBoxOpen />
                </ListItemIcon>
                <ListItemText primary="Semua Barang" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/supplier"
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                  borderRadius: "5px",
                  backgroundColor:
                    location.pathname === "/supplier"
                      ? "rgba(255, 255, 255, 0.2)"
                      : "transparent",
                  color: location.pathname === "/supplier" ? "#FFD700" : "#fff",
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      location.pathname === "/supplier" ? "#FFD700" : "#fff",
                  }}
                >
                  <FaUsers />
                </ListItemIcon>
                <ListItemText primary="Supplier" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/semua-supplier"
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                  borderRadius: "5px",
                  backgroundColor:
                    location.pathname === "/semua-supplier"
                      ? "rgba(255, 255, 255, 0.2)"
                      : "transparent",
                  color:
                    location.pathname === "/semua-supplier"
                      ? "#FFD700"
                      : "#fff",
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      location.pathname === "/semua-supplier"
                        ? "#FFD700"
                        : "#fff",
                  }}
                >
                  <FaUsers />
                </ListItemIcon>
                <ListItemText primary="Semua Supplier" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
