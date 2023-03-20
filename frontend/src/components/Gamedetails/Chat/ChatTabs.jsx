import { useState } from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FactionChat from './FactionChat'
import GlobalChat from './GlobalChat'
import SquadChat from './SquadChat'
import { SquadForm } from './SquadForm'
import { FactionForm } from './FactionForm'
import { GlobalForm } from './GlobalForm'
import { Container, maxHeight } from '@mui/system'

function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function ChatTabs() {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    // event.preventDefault()
    setValue(newValue)
  }
  
  return (
      <Box sx={{ width: '100%'}}>
        <Box  sx={{ borderBottom: 1, borderColor: 'divider'}}>
          <Tabs value={value} onChange={handleChange} aria-label="chat-tabs">
            <Tab label="Global" {...a11yProps(0)} />
            <Tab label="Faction" {...a11yProps(1)} />
            <Tab label="Squad" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Container sx={{maxHeight: '50vh', overflow: 'auto'}}>
            <GlobalChat/>
          </Container>
          <GlobalForm/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Container sx={{maxHeight: '50vh', overflow: 'auto'}}>
            <FactionChat/>
            <FactionForm/>
          </Container>
        </TabPanel>
        <TabPanel value={value} index={2}>
        <Container sx={{maxHeight: '50vh', overflow: 'auto'}}>
          <SquadChat/>
        </Container>
          <SquadForm/>
        </TabPanel>
      </Box>
  )
}
