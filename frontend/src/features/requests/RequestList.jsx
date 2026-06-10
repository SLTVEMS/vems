import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import styled from "styled-components";
import { loadRequestsRequested, decideRequestRequested } from "./requests.actions.js";
import RequestDecisionDialog from "./RequestDecisionDialog.jsx";
import RequestForm from "./RequestForm.jsx";

const Panel = styled(Paper)`
  overflow: hidden;
`;

const TableWrap = styled.div`
  overflow-x: auto;
`;

dayjs.extend(relativeTime);

function statusColor(status) {
  if (status === "approved") return "success";
  if (status === "rejected") return "error";
  return "warning";
}

function RequestList({ scope, searchQuery }) {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector((state) => state.requests);
  const user = useSelector((state) => state.auth.user);
  const [editTarget, setEditTarget] = useState(null);
  const [decisionTarget, setDecisionTarget] = useState(null);

  const canApprove = useMemo(
    () => Boolean(user?.roles?.some((role) => ["approver", "admin"].includes(role))),
    [user],
  );

  useEffect(() => {
    dispatch(loadRequestsRequested(scope));
  }, [dispatch, scope]);

  const filteredItems = useMemo(() => {
    const term = searchQuery.trim().toLowerCase();
    if (!term) {
      return items;
    }

    return items.filter(
      (item) =>
        item.visitorName.toLowerCase().includes(term) ||
        item.referenceNo.toLowerCase().includes(term) ||
        item.department.toLowerCase().includes(term) ||
        item.status.toLowerCase().includes(term),
    );
  }, [items, searchQuery]);

  return (
    <>
      <Panel elevation={0}>
        <Box sx={{ p: 3, pb: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
            <Box>
              <Typography variant="h5" fontWeight={800} gutterBottom>
                {scope === "dashboard" ? "Recent Requests" : `${scope.replace("-", " ")} requests`}
              </Typography>
              <Typography color="text.secondary">
                Review, approve, edit, and track visitor requests.
              </Typography>
            </Box>
            <Chip label={`${filteredItems.length} items`} color="primary" variant="outlined" />
          </Stack>
        </Box>

        {isLoading && <LinearProgress />}
        {error && (
          <Alert severity="error" sx={{ mx: 3, mb: 2 }}>
            {error}
          </Alert>
        )}

        <TableWrap>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Reference</TableCell>
                <TableCell>Visitor</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Visit Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Updated</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map((item) => {
                const canEdit = item.requestedBy === user?.name || canApprove;
                const needsDecision = item.status === "pending" && canApprove;

                return (
                  <TableRow key={item.id} hover>
                    <TableCell>{item.referenceNo}</TableCell>
                    <TableCell>
                      <Stack spacing={0.25}>
                        <Typography fontWeight={700}>{item.visitorName}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.purpose}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{item.department}</TableCell>
                    <TableCell>
                      {dayjs(item.visitDate).format("ddd, DD MMM YYYY")}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={item.status}
                        color={statusColor(item.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{dayjs(item.updatedAt).fromNow()}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        {canEdit && (
                          <IconButton
                            size="small"
                            onClick={() => setEditTarget(item)}
                            aria-label="Edit request"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        )}
                        {needsDecision && (
                          <>
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<ThumbDownAltIcon />}
                              onClick={() => setDecisionTarget({ ...item, decision: "rejected" })}
                            >
                              Reject
                            </Button>
                            <Button
                              size="small"
                              variant="contained"
                              startIcon={<ThumbUpAltIcon />}
                              onClick={() => setDecisionTarget({ ...item, decision: "approved" })}
                            >
                              Approve
                            </Button>
                          </>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
              {!filteredItems.length && !isLoading && (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Stack alignItems="center" spacing={1.5} sx={{ py: 4 }}>
                      <SearchOffIcon color="disabled" />
                      <Typography color="text.secondary">
                        No requests matched the current search.
                      </Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableWrap>
      </Panel>

      <RequestForm
        open={Boolean(editTarget)}
        mode="edit"
        request={editTarget}
        onClose={() => setEditTarget(null)}
      />

      <RequestDecisionDialog
        open={Boolean(decisionTarget)}
        request={decisionTarget}
        onClose={() => setDecisionTarget(null)}
        onSubmit={(values) =>
          dispatch(
            decideRequestRequested(decisionTarget.id, {
              status: values.decision,
              notes: values.comment,
              updatedAt: new Date().toISOString(),
            }),
          )
        }
      />
    </>
  );
}

export default RequestList;
