import { useMemo, useState } from "react";
import { Container, Button, TextField } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import {
  DateValidationError,
  TimeValidationError,
} from "@mui/x-date-pickers/models";

import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ru";

import { Dropdown } from "./components/Dropdown/Dropdown";

const today = dayjs();
const todayStartOfTheDay = today.startOf("hour");

function App() {
  const [tower, setTower] = useState("");
  const [floor, setFloor] = useState("");
  const [mettingRoom, setMettingRoom] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [comment, setComment] = useState("");

  const [dateError, setDateError] = useState<DateValidationError | null>(null);
  const [timeError, setTimeError] = useState<TimeValidationError | null>(null);

  const handleSubmit = () => {

    if (dateError || timeError) {
      return;
    }

    if (tower && floor && mettingRoom && date && startTime && endTime) {
      console.log(
        JSON.stringify({
          tower,
          floor,
          mettingRoom,
          date: date.toDate(),
          startTime: `${startTime.hour()}:${startTime.minute()}`,
          endTime: `${endTime.hour()}:${endTime.minute()}`,
          comment,
        })
      );
    }
  };

  const isEqualDate = () => {
    return (
      date?.date() === today.date() &&
      date?.month() === today.month() &&
      date?.year() === today.year()
    );
  };

  const handleReset = () => {
    setTower("");
    setFloor("");
    setMettingRoom("");
    setDate(null);
    setStartTime(null);
    setEndTime(null);
    setComment("");
  };

  const errorTimeMessage = useMemo(() => {
    switch (timeError) {
      case "disablePast": {
        return "Время уже прошло";
      }

      case "invalidDate": {
        return "Неверные данные";
      }

      case "minTime": {
        return "Мин. интервал 5 мин.";
      }

      default: {
        return "";
      }
    }
  }, [timeError]);

  const errorDataMessage = useMemo(() => {
    switch (dateError) {
      case "disablePast": {
        return "Время уже прошло";
      }

      case "invalidDate": {
        return "Неверные данные";
      }

      default: {
        return "";
      }
    }
  }, [dateError]);

  return (
    <Container>
      <Dropdown
        title="Башня"
        dataKey="tower"
        state={tower}
        setState={setTower}
      />
      {tower && (
        <Dropdown
          title="Этаж"
          dataKey="floor"
          state={floor}
          setState={setFloor}
        />
      )}

      {floor && (
        <Dropdown
          title="Переговорная"
          dataKey="room"
          state={mettingRoom}
          setState={setMettingRoom}
        />
      )}

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        {mettingRoom && (
          <DatePicker
            sx={{ m: 1 }}
            value={date}
            onChange={(newValue) => setDate(newValue)}
            views={["day"]}
            defaultValue={today}
            disablePast
            onError={(newError) => setDateError(newError)}
            slotProps={{
              textField: {
                helperText: errorDataMessage,
              },
            }}
          />
        )}
        {date &&
          (isEqualDate() ? (
            <TimePicker
              sx={{ m: 1 }}
              value={startTime}
              onChange={(newValue) => setStartTime(newValue)}
              defaultValue={todayStartOfTheDay}
              disablePast
              onError={(newError) => setTimeError(newError)}
              slotProps={{
                textField: {
                  helperText: errorTimeMessage,
                },
              }}
            />
          ) : (
            <TimePicker
              sx={{ m: 1 }}
              value={startTime}
              onChange={(newValue) => setStartTime(newValue)}
            />
          ))}

        {startTime && (
          <TimePicker
            sx={{ m: 1 }}
            value={endTime}
            onChange={(newValue) => setEndTime(newValue)}
            defaultValue={startTime.add(5, "minute")}
            minTime={startTime.add(5, "minute")}
            onError={(newError) => setTimeError(newError)}
            slotProps={{
              textField: {
                helperText: errorTimeMessage,
              },
            }}
          />
        )}
      </LocalizationProvider>
      {endTime && (
        <>
          <TextField
            sx={{ m: 1 }}
            multiline
            minRows={3}
            maxRows={10}
            id="comment"
            label="Комментарий"
            value={comment}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setComment(event.target.value);
            }}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Отправить
          </Button>
          <Button variant="outlined" color="error" onClick={handleReset}>
            Очистить
          </Button>
        </>
      )}
    </Container>
  );
}

export default App;
