import React from "react"
import ReactDOM from "react-dom"
import Box from "@mui/material/Box"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import StepContent from "@mui/material/StepContent"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Alert from "@mui/material/Alert"
import Stack from "@mui/material/Stack"
import gif from "./gif.gif"
import logo from "./logo.jpg"

function App() {
  const defaultState = {
    goal: "",
    time: "",
    date: "",
    payment: "",
    supervisior: "",
    email: "",
    completed: false,
  }
  const [activeStep, setActiveStep] = React.useState(0)
  const [state, setState] = React.useState(defaultState)

  const goalHandle = event => setState({ ...state, goal: event.target.value })

  const deadlineHandle = event => {
    let currentDate = new Date()
    let selectedDate = new Date(event.target.value)
    const diffTime = Math.abs(selectedDate - currentDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    setState({ ...state, time: diffDays, date: event.target.value })

    //https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
  }

  const paymentHandle = event => setState({ ...state, payment: event.target.value })

  const emailHandle = event => setState({ ...state, email: event.target.value })

  const supervisiorHandle = event => setState({ ...state, supervisior: event.target.value })

  const checkDisabled = () => {
    switch (activeStep) {
      case 0:
        return !state.goal ? true : false
      case 1:
        return !state.time ? true : false
      case 2:
        return !state.payment ? true : false
      case 3:
        return !state.email ? true : false
      case 4:
        return !state.supervisior ? true : false
      default:
        break
    }
  }

  const steps = [
    {
      label: <b>Write your goal</b>,
      description: <TextField id="outlined-basic" variant="outlined" onChange={goalHandle} placeholder="Please enter goal" value={state.goal} />,
    },
    {
      label: <b>Set deadline</b>,
      description: <input type="date" onChange={deadlineHandle} value={state.date} />,
    },
    {
      label: <b>Set price</b>,
      description: (
        <div>
          <select name="prices" onClick={paymentHandle} defaultValue={state.payment}>
            <option value="25">25TL</option>
            <option value="50">50TL</option>
            <option value="100">100TL</option>
            <option value="250">250TL</option>
            <option value="1000">1000TL</option>
          </select>
        </div>
      ),
    },
    {
      label: <b>Set email</b>,
      description: <TextField type="email" id="outlined-basic" variant="outlined" placeholder="Please enter email" onChange={emailHandle} value={state.email} />,
    },
    {
      label: <b>Set supervisior</b>,
      description: <TextField id="outlined-basic" variant="outlined" placeholder="Please enter supervisior" onChange={supervisiorHandle} value={state.supervisior} />,
    },
    {
      label: <b>Aggrement</b>,
      description: (
        <>
          <p>
            <b>Your Goal: </b>
            {state.goal}
          </p>
          <p>
            <b>Remaining Day: </b>
            {state.time}
          </p>
          <p>
            <b>Payment: </b>
            {state.payment}TL
          </p>
          <p>
            <b>Your email: </b>
            {state.email}
          </p>
          <p>
            <b>Your supervisior: </b>
            {state.supervisior}
          </p>

          {activeStep === 5 && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="info">If you continue, you will aggre to do your goal!</Alert>
            </Stack>
          )}
        </>
      ),
    },
    {
      label: <b>Finish</b>,
      description: "",
    },
  ]

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
    setState(defaultState)
  }
  const myStyle = {
    position: "relative",
    height: "100vh",
    backgroundImage: `url(${logo})`,
    backgroundSize: "cover",
  }

  return (
    <div style={myStyle}>
      <Box sx={{ maxWidth: 400 }} margin="auto">
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel optional={index === 2 ? <Typography variant="caption"></Typography> : null}>{step.label}</StepLabel>
              <StepContent>
                <div>{step.description}</div>

                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }} disabled={checkDisabled()}>
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                    <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }} style={{ color: "black" }}>
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }} style={({ padding: "0" }, { backgroundColor: "transparent" })}>
            <>
              <Stack sx={{ width: "100%" }} spacing={2}>
                <>
                  <Alert severity="success" color="info">
                    DONE! I saved your goal. Time to get cracking!
                  </Alert>
                  <img src={gif} alt="loading..." style={{ height: "150px" }} />
                </>
              </Stack>
            </>
            <Button variant="contained" onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Box>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
