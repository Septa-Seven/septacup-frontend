import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AuthWaiting,
  CreateTeam,
  Home,
  Leagues,
  News,
  Register,
  Team,
} from "./pages";
import { WithHeader } from "./layouts";
import { routes } from "./shared/routes";
import { apiUrls } from "./shared/apiUrls";

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={routes.home}
          exact
          element={<WithHeader component={<Home />} />}
        />

        <Route
          path={routes.login}
          element={<WithHeader component={<Register />} />}
        />

        <Route
          path={routes.leagues}
          element={<WithHeader component={<Leagues />} />}
        />

        <Route
          path={routes.news}
          element={<WithHeader component={<News />} />}
        />

        <Route
          path={routes.team}
          element={<WithHeader component={<Team />} />}
        />

        <Route
          path={routes.createTeam}
          element={<WithHeader component={<CreateTeam />} />}
        />

        <Route
          path={routes.google}
          element={
            <WithHeader
              component={<AuthWaiting endpoint={apiUrls.googleAuth} />}
            />
          }
        />

        <Route
          path={routes.github}
          element={
            <WithHeader
              component={<AuthWaiting endpoint={apiUrls.githubAuth} />}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
