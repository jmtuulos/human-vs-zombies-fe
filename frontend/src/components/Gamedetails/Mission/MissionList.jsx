import { useQuery } from "@tanstack/react-query"
import { getFactionMissions } from "../../../api/mission"
import { useUser } from "../../../context/UserContext"
import { storageRead } from "../../../utils/storage"
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//Should only show to players that have joined the game
export const MissionList = (gameId) => {
  const { user } = useUser()

  const { isError, isLoading, data, error } = useQuery(
    { queryKey: ['missions'],
    queryFn: () => getFactionMissions(user.isHuman),
    staleTime: 1000,
  })

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Mission</StyledTableCell>
            <StyledTableCell align="right">Description</StyledTableCell>
            <StyledTableCell align="right">Start time&nbsp;</StyledTableCell>
            <StyledTableCell align="right">End time&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Coordinates&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.description}</StyledTableCell>
              <StyledTableCell align="right">{new Date(row.startTime).toString().slice(0, 21)}</StyledTableCell>
              <StyledTableCell align="right">{new Date(row.endTime).toString().slice(0, 21)}</StyledTableCell>
              <StyledTableCell align="right"> {row.latitude}, {row.longitude}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

}
