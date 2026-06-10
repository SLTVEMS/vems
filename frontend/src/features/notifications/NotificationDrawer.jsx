import { Drawer, List, ListItem, ListItemButton, ListItemText, Stack, Typography, Chip } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function NotificationDrawer({ open, onClose, notifications, onMarkRead }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Stack sx={{ width: 360, p: 2 }} spacing={2}>
        <Typography variant="h6" fontWeight={800}>
          Notifications
        </Typography>
        <List disablePadding>
          {notifications.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => onMarkRead(item.id)}
                sx={{
                  borderRadius: 2,
                  alignItems: "flex-start",
                  bgcolor: item.unread ? "rgba(95, 211, 111, 0.08)" : "transparent",
                }}
              >
                <ListItemText
                  slotProps={{
                    primary: { component: "div" },
                    secondary: { component: "div" },
                  }}
                  primary={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="subtitle2" fontWeight={800}>
                        {item.title}
                      </Typography>
                      {item.unread && <Chip label="New" size="small" color="primary" />}
                    </Stack>
                  }
                  secondary={
                    <Stack spacing={0.5}>
                      <Typography variant="body2" color="text.secondary">
                        {item.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {dayjs(item.createdAt).fromNow()}
                      </Typography>
                    </Stack>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Drawer>
  );
}

export default NotificationDrawer;
