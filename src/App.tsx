import React from "react";
import "./App.css";
import { observer } from "mobx-react";
import { CoursesCompletionListing } from "./CurrentCoursesListing/CoursesCompletionListing";
import { PendingCoursesListing } from "./PendingCoursesListing/PendingCoursesListing";
import { CoursesTimetable } from "./CoursesTimetable/CoursesTimetable";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MuiPaper from "@mui/material/Paper";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const mdTheme = createTheme();

const Paper = styled(MuiPaper)(() => ({
  padding: 8,
}));
const App: React.FC = observer(() => {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3} lg={4}>
                <Paper>
                  <Typography variant="h4">Pending courses</Typography>
                  <Typography variant="h5">Not yet accepted</Typography>
                  <PendingCoursesListing />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={9} lg={8}>
                <Paper>
                  <Typography variant="h4">
                    Courses requiring completion
                  </Typography>
                  <Typography variant="h5">
                    Once prerequisites are complete, we can complete course
                  </Typography>
                  <CoursesCompletionListing />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper>
                  <Typography variant="h4">Courses timetable</Typography>
                  <Typography variant="h5">
                    Itinerary of accepted courses
                  </Typography>
                  <CoursesTimetable />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
});

export default App;
