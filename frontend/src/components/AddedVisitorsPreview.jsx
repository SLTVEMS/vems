import {
  Box,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const getValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  return value;
};

const getEntryDateText = (visitor) => {
  if (visitor.passType === "More Than One Day") {
    return `${getValue(visitor.entryStartDate)} to ${getValue(
      visitor.entryEndDate
    )}`;
  }

  return getValue(visitor.entryStartDate);
};

const truncateText = (value, maxLength = 38) => {
  if (!value) return "-";

  if (value.length <= maxLength) return value;

  return `${value.slice(0, maxLength)}...`;
};

function AddedVisitorsPreview({ visitors = [], onViewMore }) {
  if (!visitors.length) {
    return null;
  }

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 4,
        borderRadius: "24px",
        border: "1px solid #E2E8F0",
        background: "#FFFFFF",
        overflow: "hidden",
        boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 2.5,
          background:
            "linear-gradient(135deg, #F8FAFC 0%, #EEF4FF 100%)",
          borderBottom: "1px solid #E2E8F0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 800,
              color: "#071B52",
            }}
          >
            Added Visitors Preview
          </Typography>

          <Typography
            sx={{
              fontSize: "13px",
              color: "#64748B",
              mt: 0.4,
            }}
          >
            Preview of confirmed visitor entries. Use View More to edit full
            details.
          </Typography>
        </Box>

        <Chip
          label={`${visitors.length} Added`}
          sx={{
            fontWeight: 800,
            color: "#166534",
            background: "#DCFCE7",
            border: "1px solid #86EFAC",
          }}
        />
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                background: "#F8FAFC",
              }}
            >
              <TableCell sx={{ fontWeight: 800, color: "#334155" }}>
                #
              </TableCell>
              <TableCell sx={{ fontWeight: 800, color: "#334155" }}>
                Visitor Name
              </TableCell>
              <TableCell sx={{ fontWeight: 800, color: "#334155" }}>
                Visitor Email
              </TableCell>
              <TableCell sx={{ fontWeight: 800, color: "#334155" }}>
                Pass Type
              </TableCell>
              <TableCell sx={{ fontWeight: 800, color: "#334155" }}>
                Entry Date
              </TableCell>
              <TableCell sx={{ fontWeight: 800, color: "#334155" }}>
                Reason
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: 800, color: "#334155" }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visitors.map((visitor, index) => (
              <TableRow
                key={`added-visitor-${index}`}
                sx={{
                  transition: "all 0.2s ease",

                  "&:hover": {
                    background: "#F8FAFC",
                  },

                  "& td": {
                    borderBottom: "1px solid #EEF2F7",
                  },
                }}
              >
                <TableCell>
                  <Chip
                    label={`V${index + 1}`}
                    size="small"
                    sx={{
                      fontWeight: 800,
                      color: "#0A2F88",
                      background: "#E8F0FF",
                    }}
                  />
                </TableCell>

                <TableCell sx={{ fontWeight: 700, color: "#0F172A" }}>
                  {getValue(visitor.visitorName)}
                </TableCell>

                <TableCell sx={{ color: "#475569" }}>
                  {getValue(visitor.visitorEmail)}
                </TableCell>

                <TableCell sx={{ color: "#475569" }}>
                  {getValue(visitor.passType)}
                </TableCell>

                <TableCell sx={{ color: "#475569" }}>
                  {getEntryDateText(visitor)}
                </TableCell>

                <TableCell sx={{ color: "#475569" }}>
                  {truncateText(visitor.reason)}
                </TableCell>

                <TableCell align="right">
                  <Button
                    type="button"
                    size="small"
                    variant="contained"
                    onClick={() => onViewMore(index)}
                    sx={{
                      borderRadius: "12px",
                      textTransform: "none",
                      fontWeight: 800,
                      fontSize: "12px",
                      px: 2,
                      background:
                        "linear-gradient(135deg,#021C54,#0A2F88)",

                      "&:hover": {
                        background:
                          "linear-gradient(135deg,#021C54,#0A2F88)",
                      },
                    }}
                  >
                    View More
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default AddedVisitorsPreview;