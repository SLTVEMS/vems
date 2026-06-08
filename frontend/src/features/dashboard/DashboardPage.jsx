import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  Box,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/FactCheck";
import PendingIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import styled from "styled-components";
import { createSocket, isSocketConfigured } from "../../services/socketClient.js";
import { notificationReceived } from "../notifications/notifications.actions.js";
import { requestReceivedFromSocket } from "../requests/requests.actions.js";

dayjs.extend(relativeTime);

const MetricCard = styled(Card)`
  border: 1px solid #e8eef6;
`;

const ActivityCard = styled(Paper)`
  padding: 20px;
`;

function DashboardPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const requests = useSelector((state) => state.requests.items);
  const notifications = useSelector((state) => state.notifications.items);
  const [socketState, setSocketState] = useState(() =>
    isSocketConfigured() ? "connecting" : "disabled",
  );
  const [now, setNow] = useState(() => dayjs());

  useEffect(() => {
    const tick = window.setInterval(() => setNow(dayjs()), 1000);
    return () => window.clearInterval(tick);
  }, []);

  useEffect(() => {
    const socket = createSocket();
    if (!socket) {
      return undefined;
    }

    socket.on("connect", () => setSocketState("connected"));
    socket.on("disconnect", () => setSocketState("disconnected"));
    socket.on("request.created", (payload) => {
      dispatch(requestReceivedFromSocket(payload));
      dispatch(
        notificationReceived({
          title: "Realtime update",
          message: `${payload.referenceNo} arrived from Socket.IO.`,
          type: "info",
        }),
      );
    });
    socket.on("notification", (payload) => dispatch(notificationReceived(payload)));
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  const metrics = useMemo(() => {
    const approved = requests.filter((item) => item.status === "approved").length;
    const pending = requests.filter((item) => item.status === "pending").length;
    const rejected = requests.filter((item) => item.status === "rejected").length;

    return [
      {
        label: "Approved",
        value: approved,
        icon: <CheckCircleIcon color="success" />,
      },
      {
        label: "Pending",
        value: pending,
        icon: <PendingIcon color="warning" />,
      },
      {
        label: "Rejected",
        value: rejected,
        icon: <CancelIcon color="error" />,
      },
      {
        label: "Notifications",
        value: notifications.filter((item) => item.unread).length,
        icon: <BadgeIcon color="info" />,
      },
    ];
  }, [notifications, requests]);

  const recentRequests = useMemo(() => requests.slice(0, 5), [requests]);

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h5" fontWeight={800} gutterBottom>
          Welcome back, {user?.name ?? "Employee"}
        </Typography>
        <Typography color="text.secondary">
          {dayjs().format("dddd, DD MMMM YYYY")} | {now.format("HH:mm:ss")}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
        }}
      >
        {metrics.map((metric) => (
          <MetricCard elevation={0} key={metric.label}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                {metric.icon}
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    {metric.label}
                  </Typography>
                  <Typography variant="h4" fontWeight={800}>
                    {metric.value}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </MetricCard>
        ))}
      </Box>

      <ActivityCard elevation={0}>
        <Stack spacing={1.5}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight={800}>
              Realtime Activity
            </Typography>
            <Chip
              label={socketState}
              color={socketState === "connected" ? "success" : "default"}
              size="small"
            />
          </Stack>
          {socketState === "connecting" && <LinearProgress />}
          <Typography color="text.secondary">
            {socketState === "disabled"
              ? "Socket.IO is optional in this frontend-only build."
              : "Request and notification events will appear here as they arrive."}
          </Typography>
        </Stack>
      </ActivityCard>

      <ActivityCard elevation={0}>
        <Typography variant="h6" fontWeight={800} gutterBottom>
          Recent Requests
        </Typography>
        <Stack spacing={1.5}>
          {recentRequests.map((item) => (
            <Stack
              key={item.id}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ py: 1, borderBottom: "1px solid #eef2f7" }}
            >
              <Box>
                <Typography fontWeight={700}>{item.referenceNo}</Typography>
                <Typography color="text.secondary" variant="body2">
                  {item.visitorName} | {item.department}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {dayjs(item.updatedAt ?? item.createdAt).fromNow()}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </ActivityCard>
    </Stack>
  );
}

export default DashboardPage;
