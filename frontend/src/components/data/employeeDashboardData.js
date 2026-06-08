import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

export const headerData = {
  date: "Tuesday, 12 May 2026",
  title: "Dashboard",
  user: "Mr. C.M. Kulathunga",
  description: "here’s what’s happening across SLTMobitel today.",
};

export const statsData = [
  {
    title: "Today’s Visitors",
    value: "248",
    badge: "+12.4%",
    buttonText: "Create Request",
    color: "green",
    icon: GroupsOutlinedIcon,
  },
  {
    title: "Pending Approvals",
    value: "36",
    badge: "+4 today",
    buttonText: "View Pending Approvals",
    color: "blue",
    icon: HourglassTopOutlinedIcon,
  },
  {
    title: "Active on Premises",
    value: "87",
    badge: "Live now",
    buttonText: "View Reception Panel",
    color: "red",
    icon: CorporateFareOutlinedIcon,
  },
  {
    title: "Track Details",
    value: "1,240",
    badge: "This month",
    buttonText: "View Track Details",
    color: "purple",
    icon: LocationOnOutlinedIcon,
  },
];

export const chartData = [
  { day: "Mon", approved: 67, pending: 25, rejected: 7 },
  { day: "Tue", approved: 82, pending: 31, rejected: 5 },
  { day: "Wed", approved: 55, pending: 21, rejected: 12 },
  { day: "Thu", approved: 92, pending: 38, rejected: 5 },
  { day: "Fri", approved: 101, pending: 44, rejected: 10 },
  { day: "Sat", approved: 38, pending: 14, rejected: 5 },
  { day: "Sun", approved: 24, pending: 8, rejected: 3 },
];

export const notificationsData = [
  {
    title: "Request rejected by Duty Officer",
    desc: "Visitor #VR-2041 — contractor entry denied due to missing NIC copy.",
    time: "2 min ago",
    icon: ErrorOutlineOutlinedIcon,
    color: "red",
  },
  {
    title: "Daily report ready to download",
    desc: "Visitor activity summary for 12 May 2026 has been generated.",
    time: "18 min ago",
    icon: DownloadOutlinedIcon,
    color: "blue",
  },
  {
    title: "Approved by Supervisor",
    desc: "Request #VR-2039 approved — N. Fernando, Network Operations.",
    time: "42 min ago",
    icon: CheckOutlinedIcon,
    color: "green",
  },
  {
    title: "New visitor pre-registered",
    desc: "Guest A. Wijesinghe scheduled for tomorrow, 09:30 AM at HQ.",
    time: "1 hr ago",
    icon: PersonAddAltOutlinedIcon,
    color: "purple",
  },
  {
    title: "Pass expiring soon",
    desc: "Temporary visitor pass expires soon.",
    time: "2 hrs ago",
    icon: WarningAmberOutlinedIcon,
    color: "red",
  },
];