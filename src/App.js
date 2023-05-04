import React, { useState } from "react";
import "./style.css";

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

  const [birthDay, setBirthDay] = useState();
  const [birthMonth, setBirthMonth] = useState();
  const [birthYear, setBirthYear] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = calculateAgeTillToday(birthDay, birthMonth, birthYear);
    console.log(result);
    const { days, months, years } = result;
    setDays(days);
    setMonths(months);
    setYears(years);
  };

  return (
    <section className="card">
      <form name="age_calculator" onSubmit={handleSubmit}>
        <div className="form-group">
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
        </div>

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
