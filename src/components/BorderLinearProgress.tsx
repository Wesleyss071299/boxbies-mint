import { LinearProgress } from "@mui/material";
import styled from "styled-components";

export default styled(LinearProgress)`
  margin: 20px;
  height: 10px !important;
  border-radius: 30px;
  border: 2px solid white;
  background-color:white !important;
  
  > div.MuiLinearProgress-barColorPrimary{
    background-color:white !important;
  }

  > div.MuiLinearProgress-bar1Determinate {
    border-radius: 30px !important;
    background-image: white;
  }
`;
