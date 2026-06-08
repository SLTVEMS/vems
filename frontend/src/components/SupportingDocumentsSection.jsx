import styled from "styled-components";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";

const SectionWrapper = styled(Box)`
  margin-top: 30px;
`;

const SectionHeader = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const GreenBar = styled(Box)`
  width: 5px;
  height: 30px;
  background: #32d74b;
  border-radius: 3px;
`;

const HeaderText = styled(Typography)`
  font-size: 18px !important;
  font-weight: 700 !important;
  color: #071b52 !important;
  margin-left: 12px !important;
  text-transform: uppercase;
`;

const Divider = styled(Box)`
  flex: 1;
  height: 1px;
  background: #d9dde3;
  margin-left: 16px;
`;

const UploadContainer = styled(Box)`
  border: 2px dashed #d6dbe4;
  border-radius: 20px;
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    #f8fafc 100%
  );
  padding: 50px 30px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: #071b52;
    background: #ffffff;
    box-shadow: 0 10px 30px rgba(7, 27, 82, 0.08);
  }
`;

const FileItem = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px 15px;
  margin-bottom: 10px;
`;

function SupportingDocumentsSection({
  values,
  setFieldValue,
}) {
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setFieldValue("attachments", files);
  };

  return (
    <SectionWrapper>
      <SectionHeader>
        <GreenBar />
        <HeaderText>
          Supporting Documents
        </HeaderText>
        <Divider />
      </SectionHeader>

      <UploadContainer>
        <Box
          sx={{
            width: 90,
            height: 90,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg,#071B52,#0A2F88)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          <CloudUploadOutlinedIcon
            sx={{
              fontSize: 42,
              color: "#fff",
            }}
          />
        </Box>

        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#071B52",
            mb: 1,
          }}
        >
          Upload Supporting Documents
        </Typography>

        <Typography
          sx={{
            fontSize: "13px",
            color: "#64748b",
            mb: 3,
          }}
        >
          Drag & Drop files here or click below to
          browse your computer.
          <br />
          Supported formats: PDF, JPG, PNG, DOC,
          DOCX
        </Typography>

        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadOutlinedIcon />}
          sx={{
            borderRadius: "14px",
            textTransform: "none",
            padding: "12px 24px",
            fontWeight: 600,
            fontSize: "14px",
            background:
              "linear-gradient(135deg,#071B52,#0A2F88)",
            boxShadow:
              "0px 8px 20px rgba(7,27,82,0.25)",

            "&:hover": {
              background:
                "linear-gradient(135deg,#05143d,#082569)",
            },
          }}
        >
          Choose Files

          <input
            hidden
            multiple
            type="file"
            onChange={handleFileChange}
          />
        </Button>

        {values.attachments?.length > 0 && (
          <Box
            sx={{
              mt: 4,
              maxWidth: "700px",
              mx: "auto",
              textAlign: "left",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                mb: 2,
                color: "#071B52",
              }}
            >
              Uploaded Files (
              {values.attachments.length})
            </Typography>

            {values.attachments.map(
              (file, index) => (
                <FileItem key={index}>
                  <InsertDriveFileOutlinedIcon
                    sx={{
                      color: "#071B52",
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "#374151",
                      fontWeight: 500,
                    }}
                  >
                    {file.name}
                  </Typography>
                </FileItem>
              )
            )}
          </Box>
        )}
      </UploadContainer>
    </SectionWrapper>
  );
}

export default SupportingDocumentsSection;