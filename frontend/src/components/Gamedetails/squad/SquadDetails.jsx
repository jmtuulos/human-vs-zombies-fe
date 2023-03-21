import { Avatar, Box, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, styled } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { getSquad } from "../../../api/squad"
import { useUser } from "../../../context/UserContext"

export const SquadDetails = () => {
  const { user } = useUser()
  const gameId = 1

  const { isError, isLoading, data, error} = useQuery(
    { queryKey: ["squad"],
    queryFn: () => getSquad(gameId, user.squadId),
    staleTime: 10000 // the element is refetched every 10 seconds
  })

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))


  return (
  <Paper square sx={{paddingTop: 3}}>
    {data && <>
      <Box sx={{ flexGrow: 1 }}>
        <h5 style={{padding: 10}}>Your squad: {data.name}</h5>
        <Grid sx={{paddingBottom: 4}}container spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 8, md: 12}}>
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

