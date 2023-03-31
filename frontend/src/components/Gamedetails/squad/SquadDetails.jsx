import { Box, Button, ButtonGroup, Grid, Paper, styled } from "@mui/material"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getSquad, leaveSquad } from "../../../api/squad"
import { useUser } from "../../../context/UserContext"
import { storageRead } from "../../../utils/storage"
import { SquadCheckIn } from "./SquadCheckIn"

export const SquadDetails = () => {
  const { user, setUser } = useUser()
  const gameId = storageRead('gameId')

  const { isError, isLoading, data, error} = useQuery(
    { queryKey: ["squad"],
    queryFn: () => getSquad(gameId, user.squadId),
    onSuccess: () => {
      },
    staleTime: 1000
  })

  const mutation = useMutation(
    { mutationFn: () => leaveSquad(storageRead('userId')),
    onSuccess: () => {
      setUser({...user, squadId: null})
    }
  })

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#e9e3d6f7' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))

  return (
  <Paper sx={{paddingBlock: 3, maxWidth: 1, backgroundColor: '#e9e3d6f7'}}>
    {data && <>
      <Box sx={{ padding: 1, flexGrow: 1}}>
        <h5 style={{padding: 10}}>Your squad: {data.name}</h5>
        <ButtonGroup variant="text">
          <Button onClick={() => mutation.mutate()}>Leave squad</Button>
          <SquadCheckIn gameId={gameId}/>
        </ButtonGroup>
        <Grid sx={{paddingBottom: 2, paddingTop: 2}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 8, md: 12}}>
          {data.squadMembers.map((member, index) => (
            <Grid item={true} xs={2} sm={4} md={4} key={index}>
              <Item >{member.fullName}</Item>
            </Grid>
          ))}
        </Grid>
      </Box>
      </>
    }
  </Paper>
  )
}

