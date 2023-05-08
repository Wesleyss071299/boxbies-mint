import Countdown from "react-countdown";
import Card from "./Card";

type CountDownProps = {
  onMount: (props: { completed: boolean }) => void;
  onComplete: () => void;
  title: string;
  date: Date;
}

const renderer = ({ days, hours, minutes, seconds }: any) => {
  return (
      <div>
        <Card elevation={1}>
          <h3>{days}</h3>Days
        </Card>
        <Card elevation={1}>
          <h3>{hours}</h3>Hours
        </Card>
        <Card elevation={1}>
          <h3>{minutes}</h3>Mins
        </Card>
        <Card elevation={1}>
          <h3>{seconds}</h3>Secs
        </Card>
      </div>
  );
};

const StyledCountdown = ({ onMount, date, onComplete, title }: CountDownProps) => {
  return (
    <>
      <h4 style={{ color: 'white' }}>{title}</h4>
      <Countdown
        date={date}
        onMount={onMount}
        onComplete={onComplete}
        renderer={renderer}
      />
    </>
  );
}

export default StyledCountdown;
