import React, { useState } from "react";
import "./style.css";
import Input from "./Input";

const getDaysInMonth = (year, month) => {
  console.log(new Date(year, month, 0).getDate());
  return new Date(year, month, 0).getDate();
};

const calculateAgeTillToday = (birthDay, birthMonth, birthYear) => {
  const today = new Date();
  let currDay = today.getDate();
  let currMonth = today.getMonth() + 1;
  let currYear = today.getFullYear();

  // console.log(currDay, currMonth, currYear)

  // If current date is less than birth date, add the days of this month in previous month days because this month hasn't yet completed

  if (currDay < birthDay) {
    currMonth -= 1;
    currDay += getDaysInMonth(currYear, currMonth);
  }

  // If current month is less than birth month, add 12 months to this previous year and subtract year by 1 as it is not complete yet

  if (currMonth < birthMonth) {
    currMonth += 12;
    currYear -= 1;
  }

  return {
    days: currDay - birthDay,
    months: currMonth - birthMonth,
    years: currYear - birthYear,
  };
};

const App = () => {
  const [years, setYears] = useState("--");
  const [months, setMonths] = useState("--");
  const [days, setDays] = useState("--");

  const [birthDay, setBirthDay] = useState({
    text: "",
    valid: true,
    errorMessage: "",
  });
  const [birthMonth, setBirthMonth] = useState({
    text: "",
    valid: true,
    errorMessage: "",
  });
  const [birthYear, setBirthYear] = useState({
    text: "",
    valid: true,
    errorMessage: "",
  });

  const isEmpty = (input) => (input === "" || input === null ? true : false);
  const checkDay = (day) => (day >= 1 && day <= 31 ? true : false);
  const checkMonth = (month) => (month >= 1 && month <= 12 ? true : false);
  const checkYear = (year) => (year <= new Date().getFullYear() ? true : false);
  const checkFutureDate = (day, month, year) => {
    const inputDate = new Date(year, month, day);
    return inputDate < new Date() ? true : false;
  };

  const validate = () => {
    let valid = true;
    if (isEmpty(birthDay.text)) {
      setBirthDay({
        ...birthDay,
        valid: false,
        errorMessage: "This field is required",
      });
      valid = false;
    }
    if (isEmpty(birthMonth.text)) {
      console.log("month valid", birthMonth);
      setBirthMonth({
        ...birthMonth,
        valid: false,
        errorMessage: "This field is required",
      });
      console.log("month valid", birthMonth);
      valid = false;
    }
    if (isEmpty(birthMonth.text)) {
      setBirthYear({
        ...birthYear,
        valid: false,
        errorMessage: "This field is required",
      });
      valid = false;
    }
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    const result = calculateAgeTillToday(birthDay, birthMonth, birthYear);
    console.log(result);

      const { days, months, years } = result;
      // if(days === NaN || months === NaN || years === NaN){
      //   alert("There's a problem in program, results are NaN")
      //   return;
      // }
      setDays(days);
      setMonths(months);
      setYears(years);
  
  };

  return (
    <section className="card">
      <form name="age_calculator" onSubmit={handleSubmit}>
        {/* <div className="form-group">
          <label>Day</label>
          <input
            type="text"
            name="day"
            id="day"
            placeholder="DD"
            required
            value={birthDay}
            onChange={(e) => setBirthDay(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Month</label>
          <input
            type="text"
            name="day"
            id="day"
            placeholder="MM"
            required
            value={birthMonth}
            onChange={(e) => setBirthMonth(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Year</label>
          <input
            type="text"
            name="day"
            id="day"
            placeholder="YYYY"
            required
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
          />
        </div> */}
        <Input
          label="Day"
          id="day"
          name="day"
          placeholder="DD"
          value={birthDay.text}
          onChange={(e) =>
            setBirthDay({ text: e.target.value, valid: true, errorMessage: "" })
          }
          valid={birthDay.valid}
          errorMessage={birthDay.errorMessage}
        />
        <Input
          label="Month"
          id="month"
          name="month"
          placeholder="MM"
          value={birthMonth.text}
          onChange={(e) =>
            setBirthMonth({
              text: e.target.value,
              valid: true,
              errorMessage: "",
            })
          }
          valid={birthMonth.valid}
          errorMessage={birthMonth.errorMessage}
        />
        <Input
          label="Year"
          id="year"
          name="year"
          placeholder="YYYY"
          value={birthYear.text}
          onChange={(e) =>
            setBirthYear({
              text: e.target.value,
              valid: true,
              errorMessage: "",
            })
          }
          valid={birthYear.valid}
          errorMessage={birthYear.errorMessage}
        />

        <button name="name" type="submit" value="submit">
          <span className="arrow">
            <div className="arc-1"></div>
            <div className="center-line"></div>
            <div className="arc-2"></div>
          </span>
        </button>
      </form>

      <div className="result">
        <h1 className="big-text">
          <span className="highlight">{years}</span> years
        </h1>
        <h1 className="big-text">
          <span className="highlight">{months}</span> months
        </h1>
        <h1 className="big-text">
          <span className="highlight">{days}</span> days
        </h1>
      </div>
    </section>
  );
};

export default App;
