import { useEffect, useState } from "react";
import { useStores } from "../../StoreProvider";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { CircularProgress, Tooltip, Typography } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as s from "./styles";
import {
  CenteredVH,
  CopyText,
  LinkContainer,
  ProgressBar,
} from "../../components";
import { getLeagueProgressBarPercent } from "../../utils/getLeagueProgressBarPercent";
import { getDateString } from "../../utils/getDateString";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import PersonIcon from "@mui/icons-material/Person";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Link } from "react-router-dom";
import { routes } from "../../shared/routes";

const LeagueDetailView = () => {
  const { leaguesStore } = useStores();
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getInfo = async () => {
      await leaguesStore.getLeague(id);
      await leaguesStore.getGames(id);
      await leaguesStore.getPlayers(id);
      setIsLoaded(true);
    };

    getInfo();
    return () => {
      setIsLoaded(false);
    };
  }, [id, leaguesStore]);

  return (
    <>
      {isLoaded && (
        <s.Container>
          <div>
            <s.HeaderContainer>
              <Typography variant="h4" fontWeight="bold">
                {leaguesStore.league?.name}
              </Typography>
              <s.IconsContainer>
                <s.IconContainer>
                  <Tooltip title="Игр сыграно">
                    <PlayArrowRoundedIcon fontSize="large" />
                  </Tooltip>
                  <Typography fontWeight="bold">
                    {leaguesStore.league?.gamesCount}
                  </Typography>
                </s.IconContainer>

                <s.IconContainer>
                  <Tooltip title="Команд в лиге">
                    <PersonIcon fontSize="large" />
                  </Tooltip>
                  <Typography fontWeight="bold">
                    {leaguesStore.players.length}
                  </Typography>
                </s.IconContainer>
              </s.IconsContainer>
            </s.HeaderContainer>
            <ProgressBar
              percent={getLeagueProgressBarPercent(
                leaguesStore.league?.start,
                leaguesStore.league?.end
              )}
            />

            <s.DateContainer>
              <Typography fontWeight="bold">
                {leaguesStore.league?.start &&
                  getDateString(new Date(leaguesStore.league?.start))}
              </Typography>
              <Typography fontWeight="bold">
                {leaguesStore.league?.end ? (
                  getDateString(new Date(leaguesStore.league?.end))
                ) : (
                  <AllInclusiveIcon />
                )}
              </Typography>
            </s.DateContainer>

            <Typography marginBottom="30px">
              {leaguesStore.league?.description}
            </Typography>

            <s.ConnectToLeague>
              <Typography fontWeight="bold">Подключиться к лиге:</Typography>
              <CopyText>{leaguesStore.league?.connectUrl}</CopyText>
            </s.ConnectToLeague>

            <Typography variant="h4" fontWeight="bold" marginBottom="20px">
              Рейтинг команд
            </Typography>

            {leaguesStore.players.length === 0 && (
              <Typography variant="h5" fontWeight="bold" marginBottom="20px">
                Нет данных
              </Typography>
            )}

            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  {leaguesStore.players.map(({ id, name, rating }, count) => (
                    <s.Row isEven={!(count % 2)} key={id}>
                      <TableCell align="left">
                        <Typography fontWeight="bold">{count + 1}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography fontWeight="bold">
                          <LinkContainer>
                            <Link to={routes.team.replace(":id", id)}>
                              {name}
                            </Link>
                          </LinkContainer>
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography fontWeight="bold">
                          {rating.toFixed(2)}
                        </Typography>
                      </TableCell>
                    </s.Row>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </s.Container>
      )}

      {!isLoaded && (
        <CenteredVH>
          <CircularProgress />
        </CenteredVH>
      )}
    </>
  );
};

export const LeagueDetail = observer(LeagueDetailView);
